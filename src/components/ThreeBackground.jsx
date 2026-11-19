import { useEffect, useRef } from "react";
import * as THREE from "three";

// Dark WebGL background with red clouds and ember glow.
// Shown on the second screen, after the video has ended.
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;
    p += (uMouse - 0.5) * 0.05;

    float t = uTime * 0.05;
    float n = fbm(p * 2.5 + vec2(t, -t * 0.6));
    float n2 = fbm(p * 4.0 - vec2(t * 0.8, t));

    vec3 night = vec3(0.02, 0.02, 0.05);
    vec3 crimson = vec3(0.55, 0.04, 0.08);
    vec3 ember = vec3(0.95, 0.35, 0.08);

    float c1 = smoothstep(0.4, 0.8, n);
    float c2 = smoothstep(0.5, 0.9, n2);
    vec3 col = night;
    col = mix(col, crimson, c1 * 0.9);
    col += ember * c2 * 0.45;
    col += vec3(0.35, 0.12, 0.08) * c1 * c2 * 0.4;

    float d = length(p);
    col *= 1.0 - smoothstep(0.4, 1.2, d) * 0.6;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function ThreeBackground({ fixed = true }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(1);
    // false: the size on screen is set by CSS (100%), only the drawing buffer uses these values.
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    };

    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const onMouse = (e) => {
      uniforms.uMouse.value.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("resize", onResize);

    let raf = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  // Own inline styles: the layer is always fixed, full screen and visible behind the sections.
  return (
    <div
      ref={mountRef}
      className="webgl-background"
      aria-hidden="true"
      style={{
        position: fixed ? "fixed" : "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        visibility: "visible",
        filter: "blur(2px)",
        opacity: 1,
        background: "radial-gradient(ellipse at 50% 40%, #3a0309 0%, #14050a 45%, #050507 100%)",
      }}
    />
  );
}
