import * as THREE from '../../node_modules/three';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.getElementById('modelCanvasDetail');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x808080);

document.body.appendChild(renderer.domElement);

canvas.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

camera.position.set(50, 30, 60);
controls.update();

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 3);
scene.add(hemisphereLight);

const spotLight = new THREE.SpotLight(0xffffff, 3);
spotLight.position.set(0, 20, 0);
scene.add(spotLight);

let model;
let raycaster;
let arrowHelper;

const loader = new GLTFLoader().setPath('/rontgen_hewan/');
loader.load('scene.gltf', (gltf) => {
    model = gltf.scene;
    model.position.set(0, 0, 0);
    scene.add(model);

    // Inisialisasi raycaster dan ArrowHelper
    raycaster = new THREE.Raycaster();
    arrowHelper = new THREE.ArrowHelper(new THREE.Vector3(), new THREE.Vector3(), 1, 0xff0000);

    // Menambahkan ArrowHelper ke dalam adegan
    scene.add(arrowHelper);

    // Menambahkan event listener untuk mendeteksi pergerakan mouse
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onClick);


    animate();
});

function onMouseMove(event) {
    event.preventDefault();

    // Mendapatkan posisi mouse dalam koordinat normalised device coordinates (NDC)
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Set raycaster dari posisi mouse
    raycaster.setFromCamera(mouse, camera);

    // Mendapatkan daftar wajah yang terkena oleh raycaster
    const intersects = raycaster.intersectObject(model, true);

    // Jika ada wajah yang terkena, perbarui posisi ArrowHelper
    if (intersects.length > 0) {
        const face = intersects[0].face;
        const normalMatrix = new THREE.Matrix3().getNormalMatrix(model.matrixWorld);
        const normal = face.normal.clone().applyMatrix3(normalMatrix).normalize();

        // Hitung posisi ArrowHelper agar sesuai dengan kursor mouse
        const position = intersects[0].point.clone().add(normal);

        arrowHelper.position.copy(position);
        arrowHelper.setDirection(normal);
    } else {
        // Sembunyikan ArrowHelper jika tidak ada wajah yang terkena
        arrowHelper.position.set(0, -10, 0);
    }
}

function onClick(event) {
    event.preventDefault();

    // Mendapatkan posisi mouse dalam koordinat normalised device coordinates (NDC)
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Set raycaster dari posisi mouse
    raycaster.setFromCamera(mouse, camera);

    // Mendapatkan daftar wajah yang terkena oleh raycaster
    const intersects = raycaster.intersectObject(model, true);

    // Jika ada wajah yang terkena saat diklik, lakukan zoom
    if (intersects.length > 0) {
        const face = intersects[0].face;
        const normalMatrix = new THREE.Matrix3().getNormalMatrix(model.matrixWorld);
        const normal = face.normal.clone().applyMatrix3(normalMatrix).normalize();

        // Hitung posisi target zoom
        const targetPosition = intersects[0].point.clone().add(normal.multiplyScalar(2));

        // Animasi zoom ke posisi target
        const zoomDuration = 1000; // Durasi zoom dalam milidetik
        const startPosition = camera.position.clone();
        let startTime = null;

        function zoomStep(time) {
            if (!startTime) startTime = time;
            const progress = (time - startTime) / zoomDuration;
            if (progress < 1) {
                camera.position.lerpVectors(startPosition, targetPosition, progress);
                requestAnimationFrame(zoomStep);
            } else {
                camera.position.copy(targetPosition);
            }
        }

        requestAnimationFrame(zoomStep);
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
