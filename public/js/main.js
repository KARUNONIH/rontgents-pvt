import * as THREE from '../../node_modules/three';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.getElementById('modelCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
renderer.setClearColor(0x808080);

document.body.appendChild(renderer.domElement);

canvas.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(50, 30, 1);
controls.update();

const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Pencahayaan ambient
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 3); // Hemisphere light
hemisphereLight.position.set(0, 10, 0);
scene.add(hemisphereLight);

const spotLight = new THREE.SpotLight(0xffffff, 3);
spotLight.position.set(0, 20, 0);
scene.add(spotLight);

let model;
let rotationSpeed = -0.01; // Kecepatan rotasi negatif untuk berputar ke arah sebaliknya
let isRotating = true; // Status rotasi otomatis

const loader = new GLTFLoader().setPath('/rontgen_hewan/');
loader.load('scene.gltf', (gltf) => {
    model = gltf.scene;
    model.position.set(0, 0, 0);
    scene.add(model);

    animate();
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    if (model) {
        if (isRotating) {
            model.rotation.y += rotationSpeed; // Rotasi otomatis saat tombol mouse tidak ditekan
        }
    }

    renderer.render(scene, camera);
}

// Menambahkan event listener untuk mendeteksi klik mouse
document.addEventListener('mousedown', () => {
    isRotating = false; // Menghentikan rotasi otomatis saat tombol mouse ditekan
});

// Menambahkan event listener untuk mendeteksi lepas mouse
document.addEventListener('mouseup', () => {
    isRotating = true; // Mengaktifkan kembali rotasi otomatis saat tombol mouse dilepas
});

// Menambahkan event listener untuk mendeteksi sentuhan pada layar ponsel
document.addEventListener('touchstart', () => {
    isRotating = false; // Menghentikan rotasi otomatis saat layar sentuh ditekan
});

// Menambahkan event listener untuk mendeteksi saat layar sentuh dilepas
document.addEventListener('touchend', () => {
    isRotating = true; // Mengaktifkan kembali rotasi otomatis saat layar sentuh dilepas
});
