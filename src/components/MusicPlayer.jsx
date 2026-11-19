import { useEffect, useRef, useState } from "react";

// Background music: loops, plays while the video plays, and can be muted by the visitor.
export default function MusicPlayer({ active }) {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.35;
    if (active && !muted) {
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  }, [active, muted]);

  return (
    <>
      <audio ref={audioRef} src="/audio/theme.mp3" loop preload="auto" />
      <button className="music-btn" onClick={() => setMuted((m) => !m)}>
        {muted ? "♪ Off" : "♪ On"}
      </button>
    </>
  );
}
