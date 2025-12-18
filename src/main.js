import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';
import { DefaultPrefab } from './prefab.js';
import { createInspector } from './inspector.js';
// Простая система управления экземплярами (Unity-like Instantiate)
let instances = []; // { id, name, object, mixer, availableAnims, active }
let selectedId = null;
let idCounter = 1;
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);
const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 2, 6);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);
window.addEventListener('resize', onWindowResize);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.update();
const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
scene.add(hemi);
const dir = new THREE.DirectionalLight(0xffffff, 0.8);
dir.position.set(5, 10, 7);
scene.add(dir);
const grid = new THREE.GridHelper(50, 50, 0x333333, 0x1a1a1a);
scene.add(grid);
const loader = new GLTFLoader();
const mixers = [];
function animate(time) {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  mixers.forEach(m => m.update(delta));
  renderer.render(scene, camera);
}
const clock = new THREE.Clock();
animate();
function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}
// Instantiate(prefab, position)
async function instantiate(prefab = DefaultPrefab, position = new THREE.Vector3(0, 0, 0)) {
  const id = inst-${idCounter++};
  try {
    const gltf = await new Promise((resolve, reject) => {
      loader.load(prefab.modelUrl, resolve, undefined, reject);
    });
