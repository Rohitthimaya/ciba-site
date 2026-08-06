"use client";

import { useEffect, useRef, useState } from "react";
import { getDummyHeroImages, dummyImage } from "@/lib/siteImages";

const SCENES = [
  // warm bronze / sand
  "linear-gradient(160deg, #9a8672 0%, #c2a88d 48%, #8f7f78 100%)",
  // dusty plum / blue-grey
  "linear-gradient(160deg, #4e4a63 0%, #615b73 45%, #8c93a4 100%)",
  // sage / forest
  "linear-gradient(160deg, #5f8471 0%, #a9d3bd 60%, #6f8f7d 100%)",
  // cream-mauve dusk
  "linear-gradient(160deg, #8a7a80 0%, #c9b7a6 55%, #6d647a 100%)",
  // deep ink / ember
  "linear-gradient(160deg, #3c352f 0%, #6e5c4b 55%, #a98d72 100%)",
];
const SCENE_MS = 7000;
const MAX_TILES = 9;

function rand(min, max) {
  return min + Math.random() * (max - min);
}

export default function Hero({ images }) {
  const IMAGES = images && images.length > 0 ? images : getDummyHeroImages();
  const bgARef = useRef(null);
  const bgBRef = useRef(null);
  const tilesRef = useRef(null);
  const chartRef = useRef(null);
  const pathRef = useRef(null);
  const featARef = useRef(null);
  const featBRef = useRef(null);
  const engineRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const bgA = bgARef.current;
    const bgB = bgBRef.current;
    const tilesLayer = tilesRef.current;
    const chartSvg = chartRef.current;
    const chartPath = pathRef.current;
    const featA = featARef.current;
    const featB = featBRef.current;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const activeAnims = new Set();
    let running = false;
    let sceneTimer = null;
    let tileTimer = null;
    let sceneIndex = 0;
    let frontIsA = true;
    let featFrontIsA = true;
    let poolIndex = 1;
    let liveTiles = 0;
    let chartAnim = null;

    IMAGES.forEach((src) => {
      const im = new Image();
      im.src = src;
    });

    function nextImage() {
      poolIndex = (poolIndex + 1) % IMAGES.length;
      return IMAGES[poolIndex];
    }

    function withFallback(img) {
      img.onerror = () => {
        img.onerror = null;
        img.src = dummyImage(`ciba-fb-${Math.floor(Math.random() * 99)}`, 480, 500);
      };
    }
    withFallback(featA);
    withFallback(featB);

    function trackAnimation(anim) {
      activeAnims.add(anim);
      anim.finished.catch(() => {}).finally(() => activeAnims.delete(anim));
      if (!running) anim.pause();
    }

    function nextScene() {
      sceneIndex = (sceneIndex + 1) % SCENES.length;
      const incoming = frontIsA ? bgB : bgA;
      const outgoing = frontIsA ? bgA : bgB;
      incoming.style.background = SCENES[sceneIndex];
      incoming.style.opacity = "1";
      outgoing.style.opacity = "0";
      frontIsA = !frontIsA;
      swapFeature();
      drawChart();
    }

    function swapFeature() {
      const incoming = featFrontIsA ? featB : featA;
      const outgoing = featFrontIsA ? featA : featB;
      incoming.style.opacity = "1";
      outgoing.style.opacity = "0";
      setTimeout(() => {
        outgoing.src = nextImage();
      }, 2100);
      featFrontIsA = !featFrontIsA;
    }

    function spawnTile() {
      if (liveTiles >= MAX_TILES) return;
      liveTiles++;

      const size = rand(48, 150);
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.style.width = `${size}px`;
      tile.style.height = `${size * rand(0.9, 1.15)}px`;

      // keep tiles away from dead-centre so the headline stays readable
      let xPct;
      do {
        xPct = rand(4, 92);
      } while (xPct > 38 && xPct < 58 && Math.random() < 0.75);
      tile.style.left = `${xPct}%`;
      tile.style.top = `${rand(4, 66)}%`;

      const img = document.createElement("img");
      img.src = nextImage();
      img.loading = "lazy";
      withFallback(img);
      tile.appendChild(img);
      tilesLayer.appendChild(tile);

      const duration = rand(5200, 8500);
      const drift = rand(-160, -60);
      const anim = tile.animate(
        [
          { opacity: 0, transform: "translateY(24px) scale(0.7)" },
          { opacity: 1, transform: `translateY(${drift * 0.4}px) scale(1)`, offset: 0.35 },
          { opacity: 1, transform: `translateY(${drift * 0.7}px) scale(1.02)`, offset: 0.7 },
          { opacity: 0, transform: `translateY(${drift}px) scale(0.92)` },
        ],
        { duration, easing: "ease-in-out" }
      );
      anim.onfinish = () => {
        tile.remove();
        liveTiles--;
      };
      trackAnimation(anim);
    }

    function drawChart() {
      const w = chartSvg.clientWidth || window.innerWidth;
      const h = chartSvg.clientHeight || window.innerHeight;
      chartSvg.setAttribute("viewBox", `0 0 ${w} ${h}`);

      const points = [];
      const steps = 9;
      let y = h * rand(0.55, 0.8);
      for (let i = 0; i <= steps; i++) {
        const x = (w / steps) * i;
        y = Math.min(h * 0.85, Math.max(h * 0.12, y + rand(-h * 0.22, h * 0.16)));
        points.push([x, y]);
      }

      let d = `M ${points[0][0]} ${points[0][1]}`;
      for (let i = 1; i < points.length; i++) {
        const [px, py] = points[i - 1];
        const [cx, cy] = points[i];
        const mx = (px + cx) / 2;
        d += ` C ${mx} ${py}, ${mx} ${cy}, ${cx} ${cy}`;
      }
      chartPath.setAttribute("d", d);

      const len = chartPath.getTotalLength();
      chartPath.style.strokeDasharray = String(len);
      if (chartAnim) chartAnim.cancel();
      chartAnim = chartPath.animate(
        [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
        { duration: 4200, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "forwards" }
      );
      trackAnimation(chartAnim);
    }

    function start() {
      if (running) return;
      running = true;
      sceneTimer = setInterval(nextScene, SCENE_MS);
      tileTimer = setInterval(spawnTile, 950);
      activeAnims.forEach((a) => a.play());
    }

    function stop() {
      running = false;
      clearInterval(sceneTimer);
      clearInterval(tileTimer);
      activeAnims.forEach((a) => a.pause());
    }

    const onResize = () => {
      if (running) drawChart();
    };
    window.addEventListener("resize", onResize);

    engineRef.current = { start, stop };
    running = !reducedMotion;
    drawChart();
    if (reducedMotion) {
      setPaused(true);
    } else {
      for (let i = 0; i < 5; i++) setTimeout(spawnTile, i * 350);
      start();
    }

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      activeAnims.forEach((a) => a.cancel());
      tilesLayer.querySelectorAll(".tile").forEach((t) => t.remove());
      engineRef.current = null;
    };
  }, []);

  const togglePause = () => {
    const next = !paused;
    if (next) engineRef.current?.stop();
    else engineRef.current?.start();
    setPaused(next);
  };

  return (
    <section className="hero" id="home">
      <div className="hero__bg" ref={bgARef} style={{ background: SCENES[0] }} />
      <div className="hero__bg" ref={bgBRef} style={{ opacity: 0 }} />
      <div className="hero__grain" />

      <svg className="hero__chart" ref={chartRef} preserveAspectRatio="none" aria-hidden="true">
        <path
          ref={pathRef}
          fill="none"
          stroke="rgba(255,255,255,0.92)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      <div className="hero__tiles" ref={tilesRef} aria-hidden="true">
        <div className="hero__feature">
          <img ref={featARef} src={IMAGES[0]} alt="" />
          <img ref={featBRef} src={IMAGES[1 % IMAGES.length]} alt="" style={{ opacity: 0 }} />
        </div>
      </div>

      <div className="hero__content">
        <h1 className="hero__title">Momentum starts&nbsp;here</h1>
        <p className="hero__sub">We Empower Emerging And Established Organizations.</p>
        <a className="btn btn--light btn--lg" href="#contact">Get started</a>
      </div>

      <div className="hero__fabs">
        <a className="fab" href="#contact" aria-label="Chat with us" title="Chat with us">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 12a8.5 8.5 0 0 1-8.5 8.5c-1.4 0-2.7-.3-3.9-.9L3 21l1.4-5.6A8.5 8.5 0 1 1 21 12z" />
          </svg>
        </a>
        <button
          className={`fab${paused ? " paused" : ""}`}
          onClick={togglePause}
          aria-label={paused ? "Play animation" : "Pause animation"}
          aria-pressed={paused}
          title={paused ? "Play animation" : "Pause animation"}
        >
          <svg className="icon-pause" viewBox="0 0 24 24" fill="currentColor">
            <rect x="7" y="6" width="3.2" height="12" rx="1" />
            <rect x="13.8" y="6" width="3.2" height="12" rx="1" />
          </svg>
          <svg className="icon-play" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5z" />
          </svg>
        </button>
      </div>
    </section>
  );
}
