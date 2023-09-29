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

    raycaster = new THREE.Raycaster();
    arrowHelper = new THREE.ArrowHelper(new THREE.Vector3(), new THREE.Vector3(), 1, 0xff0000);

    scene.add(arrowHelper);

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onClick);

    animate();
});

const infoBox1 = document.getElementById('infoBox1');
const infoBox2 = document.getElementById('infoBox2');

function showInfo1(text) {
    infoBox1.style.display = 'block';
    infoBox1.innerText = text;
}

function hideInfo1() {
    infoBox1.style.display = 'none';
}

function showInfo2(text) {
    infoBox2.style.display = 'block';
    infoBox2.innerText = text;
}

function hideInfo2() {
    infoBox2.style.display = 'none';
}

// buat ngatur posisi berdasarkan yang muncul di console log
const boundaries = [
    {
        minX: -0.9,
        maxX: 3,
        minY: 21,
        maxY: 24,
        minZ: 20,
        maxZ: 22
    },
    {
        minX: -12,
        maxX: -6,
        minY: 8,
        maxY: 10,
        minZ: 10,
        maxZ: 25
    }
];

// Nilai jarak minimum dan maksimum
const minCameraDistance = 10; // Jarak minimum
const maxCameraDistance = 100; // Jarak maksimum

function onClick(event) {
    event.preventDefault();

    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(model, true);

    //set variable isWithinBoundary
    let isWithinBoundary1 = false;
    let isWithinBoundary2 = false;

    if (intersects.length > 0) {
        const face = intersects[0].face;
        const normalMatrix = new THREE.Matrix3().getNormalMatrix(model.matrixWorld);
        const normal = face.normal.clone().applyMatrix3(normalMatrix).normalize();

        const targetPosition = intersects[0].point.clone().add(normal.multiplyScalar(2));

        // buat nampilin posisi di console log
        console.log('Posisi objek yang diklik (x, y, z):', targetPosition.x, targetPosition.y, targetPosition.z);

        // manggil boundary
        for (const boundary of boundaries) {
            if (
                targetPosition.x >= boundary.minX && targetPosition.x <= boundary.maxX &&
                targetPosition.y >= boundary.minY && targetPosition.y <= boundary.maxY &&
                targetPosition.z >= boundary.minZ && targetPosition.z <= boundary.maxZ
            ) {
                // set variable isWithinBoundary berdasarkan urutan perulangan for (berarti dimulai dari 0)
                if (boundary === boundaries[0]) {
                    isWithinBoundary1 = true;
                } else if (boundary === boundaries[1]) {
                    isWithinBoundary2 = true;
                } //misalkan mau nambahin isWithinBoundary3 berarti dari urutan kedua dari perulangan for (boundaries[2])
            }
        }
    }

    // nampilin fungsi showinfo sekaligus ngisi textnya
    if (isWithinBoundary1) {
        showInfo1('Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, quasi! Nihil omnis eum quod, ' +
        'molestias magnam velit deleniti odit repudiandae error quia explicabo eius quas odio tempore magni mollitia ' +
        'quasi nesciunt temporibus obcaecati. Ab ratione distinctio inventore sed consectetur earum repellendus, illum ' +
        'sequi, quasi ipsam consequuntur! Doloremque incidunt doloribus tempore?');
    } else {
        hideInfo1();
    }

    if (isWithinBoundary2) {
        showInfo2('The European Union’s General Data Protection ' +
        'Regulation (G.D.P.R.) goes into effect on May 25 and ' +
        'is meant to ensure a common set of data rights in the ' +
        'European Union. It requires organizations to notify ' +
        'users as soon as possible of high-risk data breaches ' +
        'that could personally affect them.');
    } else {
        hideInfo2();
    }
}

function onMouseMove(event) {
    event.preventDefault();

    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(model, true);

    if (intersects.length > 0) {
        const face = intersects[0].face;
        const normalMatrix = new THREE.Matrix3().getNormalMatrix(model.matrixWorld);
        const normal = face.normal.clone().applyMatrix3(normalMatrix).normalize();

        const position = intersects[0].point.clone().add(normal);

        arrowHelper.position.copy(position);
        arrowHelper.setDirection(normal);
    } else {
        arrowHelper.position.set(0, -10, 0);
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Periksa jarak kamera ke target
    const cameraDistance = camera.position.distanceTo(model.position);

    // Batasi jarak kamera sesuai dengan nilai minimum dan maksimum
    if (cameraDistance < minCameraDistance) {
        camera.position.setLength(minCameraDistance);
    } else if (cameraDistance > maxCameraDistance) {
        camera.position.setLength(maxCameraDistance);
    }

    controls.update();
    renderer.render(scene, camera);
}
