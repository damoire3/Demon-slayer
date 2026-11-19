import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import MusicPlayer from "./MusicPlayer.jsx";

gsap.registerPlugin(ScrollToPlugin);

// One source of truth: the video's time.
// - Play: the video plays normally, and the page follows it.
// - Scrolling: the video moves to the matching position.
// Chapter texts appear over the video at fixed points of its timeline.
export default function ScrollVideo({ video, chapters }) {
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const shadeRef = useRef(null); // dark layer over the video, grows as the second screen covers it
  const ownY = useRef(null); // scroll position we set ourselves, to ignore its scroll event
  const pendingP = useRef(null); // latest scroll position (0 to 1) waiting to be applied to the video
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll distance of the hero zone, where the video runs.
  const span = () => {
    const h = heroRef.current ? heroRef.current.offsetHeight : window.innerHeight;
    return Math.max(1, h - window.innerHeight);
  };

  // Video -> page: move the page to the video's time.
  const syncScroll = () => {
    const el = videoRef.current;
    if (!el || !el.duration) return;
    const y = Math.min(1, el.currentTime / el.duration) * span();
    if (Math.abs(window.scrollY - y) > 0.5) {
      ownY.current = y;
      window.scrollTo(0, y);
    }
  };

  // Page -> video: move the video to the page position.
  const onScroll = () => {
    setScrolled(window.scrollY > span() + 40);

    // Darken the video progressively as the second screen covers it.
    // Sections top in viewport = H - scrollY; covered fraction = (scrollY - H + innerHeight) / innerHeight.
    if (shadeRef.current && heroRef.current) {
      const H = heroRef.current.offsetHeight;
      const covered = (window.scrollY - H + window.innerHeight) / window.innerHeight;
      shadeRef.current.style.opacity = String(Math.min(1, Math.max(0, covered)) * 0.9);
    }

    // Ignore the scroll event caused by our own scrollTo.
    if (ownY.current !== null && Math.abs(window.scrollY - ownY.current) < 2) {
      ownY.current = null;
      return;
    }

    const el = videoRef.current;
    if (!el || !el.duration) return;
    // A manual scroll during playback pauses the video at that exact position,
    // so the page and the video never fight over the same clock.
    if (!el.paused) el.pause();
    const p0 = Math.min(1, Math.max(0, window.scrollY / span()));
    pendingP.current = p0;
    if (p0 < 1) setEnded(false);
  };

  // Video element events.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onMeta = () => setDuration(el.duration || 0);
    const onTime = () => setTime(el.currentTime);
    const onPlay = () => {
      setPlaying(true);
      setEnded(false);
    };
    const onPause = () => setPlaying(false);
    const onEnd = () => {
      setPlaying(false);
      setEnded(true);
      // The second screen rises and covers the video: scroll the page to the end of the hero zone.
      const h = heroRef.current ? heroRef.current.offsetHeight : 0;
      gsap.to(window, {
        duration: 1.2,
        ease: "power2.inOut",
        scrollTo: { y: h, autoKill: true },
      });
    };

    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnd);
    if (el.readyState >= 1) onMeta();

    return () => {
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnd);
    };
  }, [video]);

  // Page scroll events.
  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Apply scroll-driven seeks at most once per frame, and never while the video is already seeking.
  useEffect(() => {
    let raf = 0;
    const apply = () => {
      const el = videoRef.current;
      const p = pendingP.current;
      if (el && p !== null && el.duration && !el.seeking) {
        const target = p * el.duration;
        if (Math.abs(el.currentTime - target) > 0.03) el.currentTime = target;
        pendingP.current = null;
      }
      raf = requestAnimationFrame(apply);
    };
    raf = requestAnimationFrame(apply);
    return () => cancelAnimationFrame(raf);
  }, []);

  // While the video plays, the page follows it, frame by frame.
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      syncScroll();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const started = playing || ended || time > 0;
  const progress = duration ? time / duration : 0;
  // Once the video reaches its end, the second screen (night clouds) takes over.
  const night = ended || (duration > 0 && progress >= 0.995);

  const isOn = (c, i) => {
    if (ended) return Boolean(c.cta);
    if (!started) return i === 0;
    return progress >= c.start && progress < c.end;
  };

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (ended) {
      el.currentTime = 0;
      setEnded(false);
    }
    if (el.paused) {
      el.muted = false;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const label = playing ? "Pause" : ended ? "Replay" : "▶ Play";

  return (
    <>
      <div className="bg-video" aria-hidden="true">
        <video ref={videoRef} muted playsInline preload="auto" src={video} />
        <div ref={shadeRef} className="bg-shade" />
        <div className="vignette" />
        <div className="grain" />
      </div>

      {/* The second screen rises from the bottom, see Sections */}

      <div className={`chapter-layer ${scrolled ? "is-hidden" : ""}`}>
        {chapters.map((c, i) => (
          <div
            key={c.title}
            className={`chapter align-${c.align} ${isOn(c, i) ? "is-on" : ""}`}
          >
            <p className="kicker">{c.kicker}</p>
            <h2>{c.title}</h2>
            <p>{c.text}</p>
            {c.cta && <button className="cta">Start the adventure</button>}
          </div>
        ))}
      </div>

      <MusicPlayer active={playing || ended} />

      <button className={`play-btn ${scrolled ? "is-hidden" : ""}`} onClick={toggle}>
        {label}
      </button>

      <div ref={heroRef} className="hero-spacer" aria-hidden="true" />
    </>
  );
}
