import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { quotes, characters, places, timeline } from "../data/content.js";
import ThreeBackground from "./ThreeBackground.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Plain text only: quotes, character names, places and the story line.
export default function Sections() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      gsap.utils.toArray(".reveal", rootRef.current).forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 30,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="sections">
      <div className="sections-bg" aria-hidden="true">
        <ThreeBackground fixed={false} />
        <div className="sections-shade" />
      </div>

      <section className="panel quote-panel">
        <blockquote className="quote reveal">“{quotes[0]}”</blockquote>
      </section>

      <section className="panel">
        <p className="eyebrow reveal">Characters</p>
        <ul className="plain-list">
          {characters.map((c) => (
            <li key={c.name} className="reveal">
              <span className="name">{c.name}</span>
              <span className="detail">{c.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel quote-panel">
        <blockquote className="quote reveal">“{quotes[1]}”</blockquote>
      </section>

      <section className="panel">
        <p className="eyebrow reveal">Places</p>
        <ul className="plain-list">
          {places.map((p) => (
            <li key={p} className="reveal">
              <span className="name">{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <p className="eyebrow reveal">Story</p>
        <ul className="plain-list">
          {timeline.map((t) => (
            <li key={t.title} className="reveal">
              <span className="detail">{t.year}</span>
              <span className="name">{t.title}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel quote-panel">
        <blockquote className="quote reveal">“{quotes[2]}”</blockquote>
      </section>

      <footer className="footer">
        <p>Unofficial fan site.</p>
      </footer>
    </div>
  );
}
