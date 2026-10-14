import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const vertex = /* glsl */ `
  attribute vec3 aTarget;
  attribute float aRand;
  uniform float uTime;
  uniform float uWarp;
  uniform float uMorph;
  uniform vec2 uMouse;
  uniform vec3 uTargetOffset;
  uniform float uTargetScale;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying float vMorph;

  void main() {
    vec3 p = position;
    // travel toward the camera; warp speeds it up into hyperspace
    float speed = 1.2 + uWarp * 70.0;
    p.z = mod(p.z + uTime * speed, 200.0) - 180.0;
    float depth = (p.z + 180.0) / 200.0;
    p.xy += uMouse * depth * 3.5;

    // jitter keeps the logo alive instead of frozen
    vec3 t = aTarget * uTargetScale + uTargetOffset;
    t.xy += vec2(sin(uTime * 1.3 + aRand * 40.0), cos(uTime * 1.1 + aRand * 30.0)) * 0.035;
    float m = smoothstep(0.0, 1.0, clamp(uMorph * 1.6 - aRand * 0.6, 0.0, 1.0));
    vec3 finalP = mix(p, t, m);
    vMorph = m;

    vec4 mv = modelViewMatrix * vec4(finalP, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = mix(0.8 + aRand * 1.4, 1.5, m);
    gl_PointSize = min(size * uPixelRatio * (1.0 + uWarp * 0.6) * (60.0 / -mv.z), mix(5.0, 2.6, m) * uPixelRatio);
    vAlpha = mix(smoothstep(0.0, 0.35, depth) * (0.35 + aRand * 0.65), 0.95, m);
  }
`;

const fragment = /* glsl */ `
  uniform float uDim;
  varying float vAlpha;
  varying float vMorph;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    vec3 star = mix(vec3(0.78, 0.84, 1.0), vec3(1.0), a);
    vec3 col = mix(star, vec3(0.86), vMorph);
    gl_FragColor = vec4(col, a * vAlpha * mix(uDim, 1.0, vMorph));
  }
`;

function sampleLogo(src, count) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const size = 160;
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;
      const pts = [];
      const ring = [];
      const c0 = size / 2;
      for (let y = 0; y < size; y += 1) {
        for (let x = 0; x < size; x += 1) {
          const i = (y * size + x) * 4;
          const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
          const r = Math.hypot(x - c0, y - c0) / c0;
          // only inside the light disc: the dark monogram and lettering
          if (r < 0.9 && data[i + 3] > 128 && lum < 110) pts.push([(x / size - 0.5) * 2, -(y / size - 0.5) * 2]);
        }
      }
      // a crisp outline circle frames the monogram
      for (let k = 0; k < 900; k++) {
        const a = (k / 900) * Math.PI * 2;
        ring.push([Math.cos(a) * 0.97, Math.sin(a) * 0.97]);
      }
      const all = pts.concat(ring);
      const out = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const p = all[Math.floor(Math.random() * all.length)] || [0, 0];
        out[i * 3] = p[0];
        out[i * 3 + 1] = p[1];
        out[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
      }
      resolve(out);
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export default function Starfield({ logoSrc }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse), (max-width: 768px)").matches;
    const weak = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
    if (reduced || coarse) {
      document.documentElement.classList.add("no-webgl");
      return;
    }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "low-power" });
    } catch {
      document.documentElement.classList.add("no-webgl");
      return;
    }
    document.documentElement.classList.add("has-webgl");

    const dpr = Math.min(window.devicePixelRatio, weak ? 1 : 1.25);
    renderer.setPixelRatio(dpr);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 400);
    camera.position.z = 20;

    const count = weak ? 1800 : 3200;
    const pos = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 70;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r * 0.7;
      pos[i * 3 + 2] = Math.random() * 200;
      rand[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    geo.setAttribute("aTarget", new THREE.BufferAttribute(new Float32Array(count * 3), 3));

    let logoReady = false;
    const uniforms = {
      uTime: { value: 0 },
      uWarp: { value: 0 },
      uMorph: { value: 0 },
      uDim: { value: 1 },
      uMouse: { value: new THREE.Vector2() },
      uTargetOffset: { value: new THREE.Vector3(6, 0, 0) },
      uTargetScale: { value: 4 },
      uPixelRatio: { value: dpr },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(geo, mat));

    sampleLogo(logoSrc, count).then((t) => {
      if (!t) return;
      geo.attributes.aTarget.array.set(t);
      geo.attributes.aTarget.needsUpdate = true;
      logoReady = true;
    });

    // keep the formed logo glued to the About image's on-screen position
    const anchor = () => document.querySelector(".about_img");
    const worldAt = new THREE.Vector3();
    const placeLogo = () => {
      const el = anchor();
      if (!el) return;
      const r = el.getBoundingClientRect();
      const h = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const w = h * camera.aspect;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      worldAt.set((cx / window.innerWidth - 0.5) * w, -(cy / window.innerHeight - 0.5) * h, 0);
      uniforms.uTargetOffset.value.copy(worldAt);
      uniforms.uTargetScale.value = ((Math.min(r.width, 380) * 0.8) / window.innerHeight) * h * 0.5;
    };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = new THREE.Vector2();
    const onMove = (e) => {
      mouse.set((e.clientX / window.innerWidth - 0.5) * 2, -(e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove);

    // scroll choreography: warp through the hero, form the logo at About
    const triggers = [];
    if (!reduced) {
      triggers.push(
        ScrollTrigger.create({
          trigger: ".banner",
          start: "top top",
          end: "bottom top",
          onUpdate: (s) => {
            uniforms.uWarp.value = Math.sin(s.progress * Math.PI) ** 2;
            uniforms.uDim.value = 1 - s.progress * 0.55;
          },
        }),
        ScrollTrigger.create({
          trigger: ".about",
          start: "top bottom",
          end: "bottom top",
          onUpdate: (s) => {
            const p = s.progress;
            const up = gsap.utils.clamp(0, 1, (p - 0.12) / 0.3);
            const down = gsap.utils.clamp(0, 1, (p - 0.72) / 0.22);
            uniforms.uMorph.value = up * (1 - down);
            placeLogo();
            const img = document.querySelector(".about_img img");
            if (img && logoReady) img.style.opacity = String(1 - Math.min(1, uniforms.uMorph.value * 1.4));
          },
        })
      );
    }

    let raf = 0;
    let visible = true;
    let onScreen = new Set();
    const clock = new THREE.Clock();
    const start = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const tick = () => {
      raf = 0;
      if (!visible || onScreen.size === 0) return;
      raf = requestAnimationFrame(tick);
      uniforms.uTime.value = reduced ? 0 : clock.getElapsedTime();
      uniforms.uMouse.value.lerp(mouse, 0.05);
      renderer.render(scene, camera);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? onScreen.add(e.target) : onScreen.delete(e.target)));
      start();
    });
    document.querySelectorAll(".banner, .about").forEach((el) => io.observe(el));
    start();
    const onVis = () => { visible = !document.hidden; start(); };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      triggers.forEach((t) => t.kill());
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, [logoSrc]);

  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}
