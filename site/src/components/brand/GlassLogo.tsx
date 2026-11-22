'use client';
/* eslint-disable react-hooks/immutability -- three.js objects (scene, textures, meshes) are mutable by design; react-three-fiber updates them in effects and useFrame, outside React's render */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { onLight } from '@/lib/light';
import { barsAlpha, camZ, diveAt, F_USER, getAnchor, glowAt, letterAt, LOGO_Z, markStory3D, onAnchor, onStory, setStoryBounds, smooth, storyOn, tintAt, VB, worldAt, Z0 } from '@/lib/story';
import { FOIL_STOPS, SLICES } from './FoilBars';
import { WORDMARK_PATH } from './wordmark-path';

/**
 * Hero logo, live 3D (owner chose "C · holographic glass" from four rendered options, 2026-11-21).
 * The exact brand wordmark, extruded and bevelled, as clear glass with a thin-film (holographic) coating, in front of
 * the three foil bars, which it bends as it turns. Lit by a studio of Ice Mint softboxes. It tilts toward the site's
 * one light (lib/light: the cursor) and the bars' foil shifts with it.
 * Loaded only on capable desktops after the page is idle (see LiquidLogo); renders only while on screen.
 */
const REST_Z = 2300; // camera distance at rest
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

/**
 * The wordmark as separate glass letters (so they can fly in and lock together in the scroll story).
 * Each letter's geometry is centred on itself; `rest` is where it sits in the word (word centred on 0).
 */
type Letter = { geo: THREE.BufferGeometry; rest: THREE.Vector3 };
function wordmark() {
  const shapes = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${WORDMARK_PATH}"/></svg>`).paths.flatMap(p => SVGLoader.createShapes(p));
  const geos = shapes.map(s => { const g = new THREE.ExtrudeGeometry(s, { depth: 70, curveSegments: 12, bevelEnabled: true, bevelThickness: 16, bevelSize: 9, bevelSegments: 5 }); g.scale(1, -1, 1); g.computeBoundingBox(); return g; });
  const word = new THREE.Box3(); geos.forEach(g => word.union(g.boundingBox!));
  const wc = new THREE.Vector3(); word.getCenter(wc);
  const letters: Letter[] = geos.map(g => {
    const c = new THREE.Vector3(); g.boundingBox!.getCenter(c);
    g.translate(-c.x, -c.y, -c.z); g.computeVertexNormals(); g.computeBoundingBox();
    return { geo: g, rest: c.sub(wc) };
  }).sort((a, b) => a.rest.x - b.rest.x);
  const box = word.clone().translate(wc.negate());
  return { letters, box };
}
// where each letter starts before it flies into the word (in word widths) and how it is turned
const SCATTER = [
  { x: -0.85, y: 0.55, z: 0.5, rx: 0.9, ry: -1.3, rz: 0.6 },
  { x: -0.15, y: -0.75, z: 0.8, rx: -1.2, ry: 0.7, rz: -0.5 },
  { x: 0.3, y: 0.7, z: 0.6, rx: 1.1, ry: 1.0, rz: -0.7 },
  { x: 0.95, y: -0.45, z: 0.4, rx: -0.8, ry: -1.1, rz: 0.8 },
];

/** the three foil bars (brand device) as a flat backdrop, foil gradient + grain drawn into a texture */
function barsTexture() {
  const cv = document.createElement('canvas'); cv.width = 1024; cv.height = 512; const x = cv.getContext('2d')!;
  const g = x.createLinearGradient(0, 0, 1024, 512); STOPS.forEach((c, i) => g.addColorStop(i / 5, c));
  // transparent around the bars, so in the scroll story they sit on the foil glow as well as on black
  x.fillStyle = g; x.filter = 'blur(5px)';
  ([[150, 70], [120, 210], [90, 350]] as const).forEach(([l, y]) => { x.beginPath(); x.moveTo(l + 40, y); x.lineTo(1024, y); x.lineTo(1024, y + 90); x.lineTo(l, y + 90); x.fill(); });
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = THREE.MirroredRepeatWrapping;
  return t;
}

/**
 * Scroll story: the hero's foil bars rebuilt in 3D, drawn exactly like the SVG (FoilBars): the same six-stop foil
 * gradient in the same user space (reflected), the same radial sheen and the same −35° grain, composited in sRGB.
 * Placed on the z = 0 plane so that, from the resting camera, every pixel lands where the SVG's did; the SVG can then
 * step aside without a visible change, and the camera flies into the real thing.
 */
function storyBarsGeometry() {
  const geos = SLICES.map(s => {
    const n = s.split(/[ ,]+/).map(Number);
    const shape = new THREE.Shape();
    for (let i = 0; i < n.length; i += 2) { if (i === 0) shape.moveTo(n[0], n[1]); else shape.lineTo(n[i], n[i + 1]); }
    return new THREE.ShapeGeometry(shape);
  });
  const geo = mergeGeometries(geos); geos.forEach(g => g.dispose());
  const pos = geo.getAttribute('position');
  const vb = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) { vb[i * 2] = pos.getX(i); vb[i * 2 + 1] = pos.getY(i); }
  geo.setAttribute('aVB', new THREE.BufferAttribute(vb, 2));
  return geo;
}
const hex = (c: string) => new THREE.Vector3(parseInt(c.slice(1, 3), 16) / 255, parseInt(c.slice(3, 5), 16) / 255, parseInt(c.slice(5, 7), 16) / 255);
const STOP_V = FOIL_STOPS.map(([o, c]) => ({ o: Number(o), c: hex(c) }));
/** the bars shader's colour at one user-space point, in sRGB (same maths as the fragment shader below) */
function foilAt(x: number, y: number, shift: THREE.Vector2, sheen: THREE.Vector2) {
  const ax = 138, ay = 9.3, dx = 198, dy = 183.7;
  let t = (((x - shift.x - ax) * dx + (y - shift.y - ay) * dy) / (dx * dx + dy * dy)) % 2; if (t < 0) t += 2; if (t > 1) t = 2 - t;
  const c = STOP_V[0].c.clone();
  for (let i = 1; i < STOP_V.length; i++) c.lerp(STOP_V[i].c, Math.min(1, Math.max(0, (t - STOP_V[i - 1].o) / (STOP_V[i].o - STOP_V[i - 1].o))));
  const r = Math.hypot(x - sheen.x, y - sheen.y) / 78;
  const s = r < 0.45 ? 0.55 + (0.16 - 0.55) * (r / 0.45) : 0.16 * (1 - Math.min(1, Math.max(0, (r - 0.45) / 0.55)));
  c.lerp(new THREE.Vector3(1, 1, 1), s);
  const k = (35 * Math.PI) / 180; const m = ((Math.cos(k) * x - Math.sin(k) * y) % 3 + 3) % 3;
  if (m < 0.81) c.lerp(new THREE.Vector3(1, 1, 1), 0.22);
  return c;
}
const BRAND_BLACK = new THREE.Color('#0B0C0F');
const BLACK_SRGB = hex('#0B0C0F');
function storyBarsMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, toneMapped: false,
    uniforms: {
      uShift: { value: new THREE.Vector2() }, uSheen: { value: new THREE.Vector2(240, 60) }, uAlpha: { value: 1 },
      uStops: { value: FOIL_STOPS.map(([, c]) => hex(c)) }, uOff: { value: FOIL_STOPS.map(([o]) => Number(o)) },
    },
    vertexShader: /* glsl */`
      attribute vec2 aVB; varying vec2 vVB;
      void main() { vVB = aVB; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    // raw sRGB out (no colorspace / tone-mapping chunks), exactly what the SVG paints
    fragmentShader: /* glsl */`
      uniform vec2 uShift; uniform vec2 uSheen; uniform float uAlpha; uniform vec3 uStops[6]; uniform float uOff[6];
      varying vec2 vVB;
      vec3 foil(float t) {
        t = mod(t, 2.0); if (t > 1.0) t = 2.0 - t; // spreadMethod="reflect"
        vec3 c = uStops[0];
        for (int i = 1; i < 6; i++) { c = mix(c, uStops[i], clamp((t - uOff[i - 1]) / (uOff[i] - uOff[i - 1]), 0.0, 1.0)); }
        return c;
      }
      void main() {
        vec2 a = vec2(138.0, 9.3); vec2 d = vec2(336.0, 193.0) - a;
        vec3 c = foil(dot(vVB - uShift - a, d) / dot(d, d));
        float r = length(vVB - uSheen) / 78.0;
        float s = r < 0.45 ? mix(0.55, 0.16, r / 0.45) : mix(0.16, 0.0, clamp((r - 0.45) / 0.55, 0.0, 1.0));
        c = mix(c, vec3(1.0), s);
        float k = radians(35.0);
        float gx = cos(k) * vVB.x - sin(k) * vVB.y; // pattern space of rotate(-35)
        float m = mod(gx, 3.0); float w = fwidth(gx);
        float g = smoothstep(-w, w, m) * (1.0 - smoothstep(0.81 - w, 0.81 + w, m));
        c = mix(c, vec3(1.0), 0.22 * g);
        gl_FragColor = vec4(c, uAlpha);
      }`,
  });
}

function Scene({ onFirstFrame }: { onFirstFrame: () => void }) {
  const { gl, scene, camera, size } = useThree();
  const word = useRef<THREE.Group>(null);
  const letterRefs = useRef<(THREE.Mesh | null)[]>([]);
  const light = useRef({ x: 0.5, y: 0.4 });
  const first = useRef(true);
  const mark = useMemo(() => wordmark(), []);
  const bars = useMemo(() => barsTexture(), []);
  const barsMatB = useMemo(() => new THREE.MeshBasicMaterial({ map: bars, toneMapped: false, alphaTest: 0.3 }), [bars]);
  const glass = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#F2FBFF', metalness: 0, roughness: 0.04, transmission: 1, thickness: 70, ior: 1.45,
    iridescence: 1, iridescenceIOR: 1.35, iridescenceThicknessRange: [150, 700], envMapIntensity: 1.4,
    clearcoat: 1, clearcoatRoughness: 0.03, attenuationColor: new THREE.Color('#BFE3FF'), attenuationDistance: 900,
  }), []);

  // home scroll story (lib/story)
  const story = useRef({ on: storyOn(), p: 0 });
  const tilt = useRef({ x: 0, y: 0 });
  const corners = useMemo(() => Array.from({ length: 8 }, () => new THREE.Vector3()), []);
  const last = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const backdrop = useRef<THREE.Mesh>(null);
  const storyBars = useRef<THREE.Mesh>(null);
  const barsGeo = useMemo(() => storyBarsGeometry(), []);
  const barsMat = useMemo(() => storyBarsMaterial(), []);
  const anchor = useRef(getAnchor());
  const F = useRef(new THREE.Vector2()); // world position of the point the camera flies at
  const O = useRef(new THREE.Vector3()); // world position of the hole of the "o" (the dive goes through it)
  const sky = useRef(new THREE.Color());

  useEffect(() => {
    const env = studio(gl); scene.environment = env; scene.background = new THREE.Color('#0B0C0F');
    const off = onLight(l => { light.current = { x: l.x, y: l.y }; });
    const offStory = onStory(p => { story.current.p = p; story.current.on = storyOn(); });
    const offAnchor = onAnchor(a => { anchor.current = a; });
    return () => {
      off(); offStory(); offAnchor(); env.dispose(); mark.letters.forEach(l => l.geo.dispose()); bars.dispose(); barsMatB.dispose();
      glass.dispose(); barsGeo.dispose(); barsMat.dispose();
    };
  }, [gl, scene, mark, bars, barsMatB, glass, barsGeo, barsMat]);

  // fit the word to ~60% of the frame width at any aspect (50% in the story, where the canvas fills the whole screen)
  const fit = useMemo(() => {
    const cam = camera as THREE.PerspectiveCamera; const bb = mark.box;
    const viewW = 2 * REST_Z * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * (size.width / size.height);
    // in portrait the word is sized to the width, as on Notiune's phone version, so it does not end up a sliver
    const frac = storyOn() ? (size.width < size.height ? 0.84 : 0.5) : 0.6;
    return (frac * viewW) / (bb.max.x - bb.min.x);
  }, [camera, mark, size]);

  useFrame((state, dt) => {
    const w = word.current; const bd = backdrop.current; const sb = storyBars.current; if (!w || !bd || !sb) return;
    const t = state.clock.elapsedTime;
    // tilt toward the light (cursor), with a slow breathing sway on top
    const ty = (light.current.x - 0.5) * 0.7 + Math.sin(t * 0.35) * 0.08;
    const tx = (light.current.y - 0.5) * 0.35 + Math.cos(t * 0.3) * 0.04 - 0.04;
    const k = 1 - Math.exp(-dt * 3.2);
    tilt.current.y += (ty - tilt.current.y) * k; tilt.current.x += (tx - tilt.current.x) * k;
    bars.offset.x = (light.current.x - 0.5) * 0.12 + Math.sin(t * 0.2) * 0.02;
    const wordW = mark.box.max.x - mark.box.min.x;

    const s = story.current; const a = anchor.current;
    if (!s.on || !a) {
      // the normal hero logo (no story): word in front of its bars, camera at rest
      sb.visible = false; w.visible = true; bd.visible = true; barsMatB.color.setScalar(1); bd.scale.setScalar(1.15);
      (scene.background as THREE.Color).copy(BRAND_BLACK);
      w.position.set(0, 0, 0); bd.position.set(420, 10, -900);
      state.camera.position.set(0, 0, REST_Z);
      w.rotation.set(tilt.current.x, tilt.current.y, 0);
      letterRefs.current.forEach((m, i) => { if (!m) return; m.position.copy(mark.letters[i].rest); m.rotation.set(0, 0, 0); });
    } else {
      const p = s.p;
      // place the bars so that from the resting camera they cover exactly the SVG's pixels
      const cam = state.camera as THREE.PerspectiveCamera;
      const wpp = (2 * Z0 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2))) / size.height; // world units per px on z = 0
      const kpx = a.width / VB.w; // SVG px per user unit
      sb.scale.set(kpx * wpp, -kpx * wpp, 1);
      sb.position.set((a.left - VB.x * kpx - size.width / 2) * wpp, -(a.top - VB.y * kpx - size.height / 2) * wpp, 0);
      F.current.set(F_USER.x * sb.scale.x + sb.position.x, F_USER.y * sb.scale.y + sb.position.y);

      // the word floats behind the foil on the flight line; the hole of its "o" is where the dive ends
      const dive = diveAt(p);
      w.position.set(F.current.x, F.current.y, LOGO_Z);
      const calm = 1 - smooth(dive * 1.6); // the word stops tilting as the camera dives at it, so the hole stays on line
      w.rotation.set(tilt.current.x * calm, tilt.current.y * calm, 0);
      w.updateMatrixWorld();
      O.current.copy(mark.letters[Math.min(2, mark.letters.length - 1)].rest).applyMatrix4(w.matrixWorld);

      // the flight: straight at F until the foil, on through the dark to the word, then into the "o"
      const z = camZ(p); const f = z > 0 ? 1 - z / Z0 : 1;
      const d = smooth(dive);
      cam.position.set(F.current.x * f + (O.current.x - F.current.x) * d, F.current.y * f + (O.current.y - F.current.y) * d, z);

      // the bars' foil follows the light exactly as the SVG's does (FoilBars): gradient shift + sheen under the cursor
      const zoom = z > 1 ? Z0 / z : Z0;
      const fpx = { x: a.left + (F_USER.x - VB.x) * kpx, y: a.top + (F_USER.y - VB.y) * kpx };
      const lx = fpx.x + (light.current.x * size.width - fpx.x) / zoom; const ly = fpx.y + (light.current.y * size.height - fpx.y) / zoom;
      const u = barsMat.uniforms;
      u.uShift.value.set((light.current.x - 0.5) * 160, (light.current.y - 0.5) * 50);
      u.uSheen.value.set(Math.max(110, Math.min(380, VB.x + (lx - a.left) / kpx)), Math.max(20, Math.min(175, VB.y + (ly - a.top) / kpx)));
      u.uAlpha.value = barsAlpha(z);
      sb.visible = barsAlpha(z) > 0;

      // the ground: black, picking up the foil's tint as we near it, the foil's own colour just behind it, then black
      // (mixed in sRGB, as the eye sees it: a 20% tint looks like 20%, the way Notiune's ground tints)
      const c = foilAt(F_USER.x, F_USER.y, u.uShift.value, u.uSheen.value);
      const k2 = z > 0 ? tintAt(p) : glowAt(z);
      sky.current.setRGB(BLACK_SRGB.x + (c.x - BLACK_SRGB.x) * k2, BLACK_SRGB.y + (c.y - BLACK_SRGB.y) * k2, BLACK_SRGB.z + (c.z - BLACK_SRGB.z) * k2, THREE.SRGBColorSpace);
      (scene.background as THREE.Color).copy(sky.current);

      // the world behind the foil (our bars behind the word) lights up in the dark, and goes out for the dive
      const world = worldAt(p);
      barsMatB.color.setScalar(world);
      bd.visible = z < 50 && world > 0.002;
      // portrait: a smaller backdrop that sits behind the word only, so the proof strip below stays on black
      const bs = size.width < size.height ? 0.62 : 1.15;
      bd.scale.setScalar(bs);
      bd.position.set(F.current.x + 420 * (bs / 1.15), F.current.y + 10, LOGO_Z - 900);

      // the letters fly in from their own places and lock into the word
      w.visible = z < 50 && letterAt(p, 0) > 0;
      letterRefs.current.forEach((m, i) => {
        if (!m) return;
        const l = mark.letters[i]; const sc = SCATTER[i % SCATTER.length]; const e = 1 - letterAt(p, i);
        m.position.set(l.rest.x + sc.x * wordW * e, l.rest.y + sc.y * wordW * e, l.rest.z + sc.z * wordW * e);
        m.rotation.set(sc.rx * e * 2.2, sc.ry * e * 2.2, sc.rz * e * 2.2);
      });
    }
    // publish where the word sits on screen (canvas px = stage px), so the Found corners lock onto the glass
    if (s.on && s.p > 0.6 && s.p < 0.95) {
      const bb = mark.box; w.updateMatrixWorld();
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      corners.forEach((v, i) => {
        // the word's middle plane only (z = 0): the front and back faces spread wide in perspective once the word tilts
        v.set(i & 1 ? bb.max.x : bb.min.x, i & 2 ? bb.max.y : bb.min.y, 0).applyMatrix4(w.matrixWorld).project(state.camera);
        const px = (v.x + 1) / 2 * size.width; const py = (1 - v.y) / 2 * size.height;
        x0 = Math.min(x0, px); x1 = Math.max(x1, px); y0 = Math.min(y0, py); y1 = Math.max(y1, py);
      });
      const b = { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }; const l = last.current;
      if (Math.abs(b.x - l.x) + Math.abs(b.y - l.y) + Math.abs(b.w - l.w) + Math.abs(b.h - l.h) > 0.6) { last.current = b; setStoryBounds(b); }
    }
    if (first.current) { first.current = false; requestAnimationFrame(() => { onFirstFrame(); if (s.on && a) markStory3D(); }); }
  });

  return (
    <>
      {/* a cut-out, not transparent: the glass only refracts opaque objects (three.js transmission pass) */}
      <mesh ref={backdrop} position={[420, 10, -900]} scale={1.15} material={barsMatB}>
        <planeGeometry args={[2600, 1300]} />
      </mesh>
      <group ref={word} scale={fit}>
        {mark.letters.map((l, i) => (
          <mesh key={i} ref={el => { letterRefs.current[i] = el; }} geometry={l.geo} material={glass} position={l.rest} />
        ))}
      </group>
      <mesh ref={storyBars} geometry={barsGeo} material={barsMat} visible={false} renderOrder={2} frustumCulled={false} />
    </>
  );
}

export default function GlassLogo({ onReady, active }: { onReady: () => void; active: boolean }) {
  return (
    <Canvas
      className="glass-logo"
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.5]}
      camera={{ fov: 28, near: 1, far: 10000, position: [0, 0, REST_Z] }}
      gl={{ antialias: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15, outputColorSpace: THREE.SRGBColorSpace }}
      aria-hidden
    >
      <Scene onFirstFrame={onReady} />
    </Canvas>
  );
}
