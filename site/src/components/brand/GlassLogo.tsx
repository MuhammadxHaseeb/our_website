'use client';
/* eslint-disable react-hooks/immutability -- three.js objects (scene, textures, meshes) are mutable by design; react-three-fiber updates them in effects and useFrame, outside React's render */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { onLight } from '@/lib/light';
import { WORDMARK_PATH } from './wordmark-path';

/**
 * Hero logo, live 3D (owner chose "C · holographic glass" from four rendered options, 2026-11-21).
 * The exact brand wordmark, extruded and bevelled, as clear glass with a thin-film (holographic) coating, in front of
 * the three foil bars, which it bends as it turns. Lit by a studio of Ice Mint softboxes. It tilts toward the site's
 * one light (lib/light: the cursor) and the bars' foil shifts with it.
 * Loaded only on capable desktops after the page is idle (see LiquidLogo); renders only while on screen.
 */
const STOPS = ['#BFE3FF', '#E2FFF4', '#8FC9FF', '#7FF5D0', '#E4FBFF', '#A8F0E0'];

function studio(renderer: THREE.WebGLRenderer) {
  const env = new THREE.Scene(); env.background = new THREE.Color('#05060a');
  const panel = (color: string | THREE.Color, w: number, h: number, pos: [number, number, number], rot: [number, number, number], k = 1, map?: THREE.Texture) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(k), side: THREE.DoubleSide, ...(map ? { map } : {}) }));
    m.position.set(...pos); m.rotation.set(...rot); env.add(m); return m;
  };
  // banded softbox in front of the letters, so their flat faces catch a sweep of light
  const cv = document.createElement('canvas'); cv.width = 64; cv.height = 512; const x = cv.getContext('2d')!;
  x.fillStyle = '#000'; x.fillRect(0, 0, 64, 512);
  ([['#FFFFFF', 0, 120], ['#E4FBFF', 150, 70], ['#7FF5D0', 250, 60], ['#8FC9FF', 340, 70], ['#E2FFF4', 440, 40]] as const).forEach(([c, y, h]) => { x.fillStyle = c; x.fillRect(0, y, 64, h); });
  const bands = new THREE.CanvasTexture(cv); bands.colorSpace = THREE.SRGBColorSpace;
  panel(new THREE.Color(2.4, 2.4, 2.4), 12, 8, [0, 1.5, 5], [0, 0, 0], 1, bands).lookAt(0, 0, 0);
  panel('#7FF5D0', 3.5, 6, [-5, 0, 4], [0, Math.PI / 3, 0], 1.7);
  panel('#8FC9FF', 3.5, 6, [5, 0.4, 4], [0, -Math.PI / 3, 0], 1.9);
  panel('#E4FBFF', 10, 0.5, [0, -2.2, 5], [Math.PI / 5, 0, 0], 2.6);
  panel('#BFE3FF', 9, 0.8, [0, 2.5, -5], [Math.PI / 3, 0, 0], 2.0);
  panel('#A8F0E0', 0.8, 6, [-6, 0, -2], [0, Math.PI / 2, 0], 1.5);
  panel('#E2FFF4', 0.8, 6, [6, 0, -2], [0, -Math.PI / 2, 0], 1.5);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const tex = pmrem.fromScene(env, 0.035).texture; pmrem.dispose(); bands.dispose();
  return tex;
}

function wordmark() {
  const shapes = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${WORDMARK_PATH}"/></svg>`).paths.flatMap(p => SVGLoader.createShapes(p));
  const geo = mergeGeometries(shapes.map(s => new THREE.ExtrudeGeometry(s, { depth: 70, curveSegments: 12, bevelEnabled: true, bevelThickness: 16, bevelSize: 9, bevelSegments: 5 })));
  geo.scale(1, -1, 1); geo.computeBoundingBox(); const c = new THREE.Vector3(); geo.boundingBox!.getCenter(c);
  geo.translate(-c.x, -c.y, -c.z); geo.computeVertexNormals(); geo.computeBoundingBox();
  return geo;
}

/** the three foil bars (brand device) as a flat backdrop, foil gradient + grain drawn into a texture */
function barsTexture() {
  const cv = document.createElement('canvas'); cv.width = 1024; cv.height = 512; const x = cv.getContext('2d')!;
  const g = x.createLinearGradient(0, 0, 1024, 512); STOPS.forEach((c, i) => g.addColorStop(i / 5, c));
  x.fillStyle = '#0B0C0F'; x.fillRect(0, 0, 1024, 512); x.fillStyle = g; x.filter = 'blur(5px)';
  ([[150, 70], [120, 210], [90, 350]] as const).forEach(([l, y]) => { x.beginPath(); x.moveTo(l + 40, y); x.lineTo(1024, y); x.lineTo(1024, y + 90); x.lineTo(l, y + 90); x.fill(); });
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = THREE.MirroredRepeatWrapping;
  return t;
}

function Scene({ onFirstFrame }: { onFirstFrame: () => void }) {
  const { gl, scene, camera, size } = useThree();
  const logo = useRef<THREE.Mesh>(null);
  const light = useRef({ x: 0.5, y: 0.4 });
  const first = useRef(true);
  const geo = useMemo(() => wordmark(), []);
  const bars = useMemo(() => barsTexture(), []);
  const glass = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#F2FBFF', metalness: 0, roughness: 0.04, transmission: 1, thickness: 70, ior: 1.45,
    iridescence: 1, iridescenceIOR: 1.35, iridescenceThicknessRange: [150, 700], envMapIntensity: 1.4,
    clearcoat: 1, clearcoatRoughness: 0.03, attenuationColor: new THREE.Color('#BFE3FF'), attenuationDistance: 900,
  }), []);

  useEffect(() => {
    const env = studio(gl); scene.environment = env; scene.background = new THREE.Color('#0B0C0F');
    const off = onLight(l => { light.current = { x: l.x, y: l.y }; });
    return () => { off(); env.dispose(); geo.dispose(); bars.dispose(); glass.dispose(); };
  }, [gl, scene, geo, bars, glass]);

  // fit the word to ~60% of the frame width at any aspect
  const fit = useMemo(() => {
    const cam = camera as THREE.PerspectiveCamera; const bb = geo.boundingBox!;
    const viewW = 2 * cam.position.z * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * (size.width / size.height);
    return (0.6 * viewW) / (bb.max.x - bb.min.x);
  }, [camera, geo, size]);

  useFrame((state, dt) => {
    const m = logo.current; if (!m) return;
    const t = state.clock.elapsedTime;
    // tilt toward the light (cursor), with a slow breathing sway on top
    const ty = (light.current.x - 0.5) * 0.7 + Math.sin(t * 0.35) * 0.08;
    const tx = (light.current.y - 0.5) * 0.35 + Math.cos(t * 0.3) * 0.04 - 0.04;
    const k = 1 - Math.exp(-dt * 3.2);
    m.rotation.y += (ty - m.rotation.y) * k; m.rotation.x += (tx - m.rotation.x) * k;
    bars.offset.x = (light.current.x - 0.5) * 0.12 + Math.sin(t * 0.2) * 0.02;
    if (first.current) { first.current = false; requestAnimationFrame(onFirstFrame); }
  });

  return (
    <>
      <mesh position={[420, 10, -900]} scale={1.15}>
        <planeGeometry args={[2600, 1300]} />
        <meshBasicMaterial map={bars} toneMapped={false} />
      </mesh>
      <mesh ref={logo} geometry={geo} material={glass} scale={fit} />
    </>
  );
}

export default function GlassLogo({ onReady, active }: { onReady: () => void; active: boolean }) {
  return (
    <Canvas
      className="glass-logo"
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.5]}
      camera={{ fov: 28, near: 10, far: 10000, position: [0, 0, 2300] }}
      gl={{ antialias: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15, outputColorSpace: THREE.SRGBColorSpace }}
      aria-hidden
    >
      <Scene onFirstFrame={onReady} />
    </Canvas>
  );
}
