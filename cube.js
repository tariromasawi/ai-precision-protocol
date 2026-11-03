import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.getElementById("cube");
const rain = document.getElementById("rain");
const inspector = document.getElementById("inspector");
const tableBody = document.getElementById("cell-rows");
const attractorList = document.getElementById("attractor-list");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const DOMAIN_Y = [
  "Spiritual_Core",
  "Ethical_Forge",
  "Technical_Anvil",
  "Legal_Chain",
  "Narrative_Crown",
  "Economic_Seed",
];
const LAYER_Z = ["RAW_WORDS", "THEME_PULSE", "SYSTEM_BLOOD", "DOCTRINE_FLAME", "COSMIC_COMMAND"];
const COLORS = {
  Spiritual_Core: 0xf0d78c,
  Ethical_Forge: 0xc45c3e,
  Technical_Anvil: 0x9aaf7a,
  Legal_Chain: 0xd7c4a3,
  Narrative_Crown: 0xf7f1e4,
  Economic_Seed: 0xe6c36a,
};

const T0 = Date.parse("2023-01-01T00:00:00Z");
const T1 = Date.parse("2025-12-16T22:46:00Z");

function time01(value) {
  if (!value || String(value).includes("infinity")) return 1;
  const t = Date.parse(value);
  if (Number.isNaN(t)) return 0.5;
  return Math.min(1, Math.max(0, (t - T0) / (T1 - T0)));
}

function layout(cell) {
  const x = time01(cell.temporal_band[0]) * 4.2 - 2.1;
  const domains = cell.domains?.length ? cell.domains : ["Narrative_Crown"];
  const yAvg = domains.reduce((sum, id) => sum + Math.max(0, DOMAIN_Y.indexOf(id)), 0) / domains.length;
  const y = (yAvg / (DOMAIN_Y.length - 1)) * 4.2 - 2.1;
  const zIndex = Math.max(0, LAYER_Z.indexOf(cell.abstraction));
  const z = (zIndex / (LAYER_Z.length - 1)) * 4.2 - 2.1;
  const n = Number(cell.id) || 1;
  return new THREE.Vector3(x + ((n * 3) % 5 - 2) * 0.05, y, z + ((n * 7) % 5 - 2) * 0.05);
}

function colorOf(cell) {
  const key = cell.domains?.[0] || "Spiritual_Core";
  return COLORS[key] || 0xf0d78c;
}

const docPromise = fetch("schema/mccp.json").then((r) => r.json());

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
camera.position.set(6.2, 4.4, 7.4);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = !reduce;
controls.target.set(0, 0, 0);

scene.add(new THREE.AmbientLight(0xf4efe4, 0.55));
const key = new THREE.PointLight(0xf0d78c, 18, 30);
key.position.set(4, 6, 3);
scene.add(key);

const cube = new THREE.LineSegments(
  new THREE.EdgesGeometry(new THREE.BoxGeometry(4.6, 4.6, 4.6)),
  new THREE.LineBasicMaterial({ color: 0xd4b36a, transparent: true, opacity: 0.85 }),
);
scene.add(cube);

const axes = new THREE.AxesHelper(3.1);
axes.setColors(new THREE.Color(0xc45c3e), new THREE.Color(0xf0d78c), new THREE.Color(0x9aaf7a));
scene.add(axes);

function labelSprite(text, color) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 128;
  const g = c.getContext("2d");
  g.clearRect(0, 0, 512, 128);
  g.fillStyle = color;
  g.font = "600 42px Georgia, serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(text, 256, 64);
  const tex = new THREE.CanvasTexture(c);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
  sprite.scale.set(2.4, 0.6, 1);
  return sprite;
}

const lx = labelSprite("X  time", "#c45c3e");
lx.position.set(2.8, -2.55, -2.4);
const ly = labelSprite("Y  domain", "#f0d78c");
ly.position.set(-2.7, 2.7, -2.2);
const lz = labelSprite("Z  abstraction", "#9aaf7a");
lz.position.set(-2.6, -2.55, 2.5);
scene.add(lx, ly, lz);

const core = new THREE.Mesh(
  new THREE.SphereGeometry(0.18, 24, 24),
  new THREE.MeshStandardMaterial({ color: 0xf0d78c, emissive: 0xd4b36a, emissiveIntensity: 0.8 }),
);
scene.add(core);
const coreLabel = labelSprite("Anointed Commander", "#f0d78c");
coreLabel.position.set(0, 0.55, 0);
scene.add(coreLabel);

const meshes = [];
const group = new THREE.Group();
scene.add(group);
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let selected = null;
let walking = false;
const home = camera.position.clone();

function resize() {
  const rect = canvas.parentElement.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height, false);
  camera.aspect = rect.width / Math.max(1, rect.height);
  camera.updateProjectionMatrix();
  rain.width = rect.width;
  rain.height = rect.height;
}
window.addEventListener("resize", resize);

function showCell(cell) {
  const unbounded = cell.importance_unbounded ? " (declared unbounded)" : "";
  inspector.innerHTML = `
    <p class="kicker">Cell ${cell.id} · ${cell.abstraction}</p>
    <h3>${cell.title}</h3>
    <p>${cell.temporal_band[0]} → ${cell.temporal_band[1]}</p>
    <p>Domains: ${cell.domains.join(", ")}${cell.domains_inferred ? " · inferred from title" : ""}</p>
    <p>Importance ${cell.importance}${unbounded}</p>
    <p>Edges: ${cell.connections.length ? cell.connections.join(", ") : "none in this edition"}</p>
    <span class="hash">${cell.hash}</span>
    <p>Embedding ${cell.embedding.map((n) => n.toFixed(3)).join("  ")}</p>
  `;
  document.querySelectorAll("#cell-rows tr").forEach((row) => {
    row.style.outline = row.dataset.id === cell.id ? "1px solid #d4b36a" : "";
  });
}

function selectMesh(mesh) {
  if (selected) selected.material.emissiveIntensity = 0.35;
  selected = mesh;
  mesh.material.emissiveIntensity = 1.1;
  showCell(mesh.userData.cell);
  if (walking) controls.target.copy(mesh.position);
}

docPromise.then((payload) => {
  const cells = payload.MCCP.micro_cells;
  const byId = new Map(cells.map((cell) => [cell.id, cell]));
  cells.forEach((cell) => {
    const radius = 0.07 + Math.min(cell.importance, 100) / 100 * 0.16;
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 20, 20),
      new THREE.MeshStandardMaterial({
        color: colorOf(cell),
        emissive: colorOf(cell),
        emissiveIntensity: 0.35,
        roughness: 0.35,
      }),
    );
    mesh.position.copy(layout(cell));
    mesh.userData.cell = cell;
    group.add(mesh);
    meshes.push(mesh);
  });

  const linePos = [];
  cells.forEach((cell) => {
    cell.connections.forEach((id) => {
      if (id === "*" || id === cell.id) return;
      const other = byId.get(id);
      if (!other) return;
      const a = layout(cell);
      const b = layout(other);
      linePos.push(a.x, a.y, a.z, b.x, b.y, b.z);
    });
  });
  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
  group.add(new THREE.LineSegments(geom, new THREE.LineBasicMaterial({ color: 0xd4b36a, transparent: true, opacity: 0.35 })));

  tableBody.innerHTML = cells.map((cell) => `
    <tr data-id="${cell.id}">
      <td>${cell.id}</td>
      <td>${cell.title}</td>
      <td>${cell.abstraction.replaceAll("_", " ")}</td>
      <td>${cell.temporal_band[0].slice(0, 10)}</td>
      <td>${cell.importance}${cell.importance_unbounded ? "∞" : ""}</td>
    </tr>
  `).join("");
  tableBody.addEventListener("click", (event) => {
    const row = event.target.closest("tr");
    if (!row) return;
    const mesh = meshes.find((item) => item.userData.cell.id === row.dataset.id);
    if (mesh) selectMesh(mesh);
  });

  attractorList.innerHTML = payload.MCCP.semantic_attractors.map((item) => `
    <article class="card">
      <h3>${item.name}</h3>
      <p>Dominance ${item.dominance} · ${item.weight || ""}</p>
      <p>${item.domains.join(" · ")}</p>
      <p>Cells ${item.connections.join(", ")}</p>
    </article>
  `).join("");

  selectMesh(meshes.find((item) => item.userData.cell.id === "047") || meshes[0]);
  resize();
});

canvas.addEventListener("pointerdown", (event) => {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(meshes)[0];
  if (hit) selectMesh(hit.object);
});

document.getElementById("walk-btn").addEventListener("click", (event) => {
  walking = !walking;
  event.currentTarget.setAttribute("aria-pressed", String(walking));
  event.currentTarget.textContent = walking ? "Orbit" : "Walk to cell";
  if (!walking) {
    controls.target.set(0, 0, 0);
    camera.position.copy(home);
  } else if (selected) {
    controls.target.copy(selected.position);
  }
});

const drops = Array.from({ length: 48 }, () => ({
  x: Math.random(),
  y: Math.random(),
  s: 0.4 + Math.random() * 1.4,
  t: Math.random().toString(16).slice(2, 8),
}));
const rg = rain.getContext("2d");
function drawRain() {
  const w = rain.width;
  const h = rain.height;
  rg.clearRect(0, 0, w, h);
  rg.fillStyle = "rgba(212,179,106,0.55)";
  rg.font = "12px ui-monospace, monospace";
  drops.forEach((drop) => {
    rg.fillText(drop.t, drop.x * w, drop.y * h);
    if (!reduce) drop.y += 0.002 * drop.s;
    if (drop.y > 1) drop.y = 0;
  });
}

function frame() {
  if (!reduce) {
    group.rotation.y += walking ? 0 : 0.0016;
    core.scale.setScalar(1 + Math.sin(performance.now() / 700) * 0.06);
  }
  controls.update();
  renderer.render(scene, camera);
  drawRain();
  requestAnimationFrame(frame);
}
resize();
frame();
