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

const infoBox = document.getElementById('infoBox');

function showInfo(title, cnt) {
    infoBox.style.display = 'block';
    const heading1 = infoBox.getElementsByTagName('h1');
    const content = document.getElementById('ibContent');
    heading1[0].innerText = title;
    content.innerText = cnt;
    console.log(content);
}

function hideInfo() {
    infoBox.style.display = 'none';
}

// buat ngatur posisi berdasarkan yang muncul di console log
const boundaries = [
    {
        minX: -13.4,
        maxX: -4.8,
        minY: 8,
        maxY: 11.4,
        minZ: 10,
        maxZ: 25
    },
    {
        minX: -19,
        maxX: 18.2,
        minY: -2,
        maxY: 25,
        minZ: -25.6,
        maxZ: -23
    },
    {
        minX: -3.7,
        maxX: 3.5,
        minY: 7,
        maxY: 8,
        minZ: 13,
        maxZ: 21.4
    },
    {
        minX: -2.3,
        maxX: -1.5,
        minY: 10.9,
        maxY:11.4,
        minZ: -4.22,
        maxZ: -3.3
    },
    {
        minX: -1.2,
        maxX: 1.4,
        minY: 18,
        maxY:19.7,
        minZ: 14.9,
        maxZ: 19.1
    },
    {
        minX: 8.5,
        maxX: 8.8,
        minY: 8.1,
        maxY:12.9,
        minZ: 14.2,
        maxZ: 14.8
    },
    {
        minX: 2.1,
        maxX: 4.1,
        minY: 6.9,
        maxY: 11.3,
        minZ: -3.8,
        maxZ: 0.6
    },
    {
        minX: -2,
        maxX: 1.2,
        minY: 20,
        maxY:21.7,
        minZ: 16.9,
        maxZ: 22
    },
    {
        minX: 1.7,
        maxX: 3.5,
        minY: 20.4,
        maxY:21.2,
        minZ: 16.9,
        maxZ: 19.5
    },
    {
        minX: -9.2,
        maxX: -5.8,
        minY: 8.1,
        maxY:10,
        minZ: -9,
        maxZ: -4.7
    },
    {
        minX: -33.7,
        maxX: -26.1,
        minY: -0.8,
        maxY: 4,
        minZ: -34.6,
        maxZ: -25.3
    },
    {
        minX: -5.9,
        maxX: 12.2,
        minY: 8.2,
        maxY: 8.3,
        minZ: 16.5,
        maxZ: 24.2
    },
    {
        minX: 3.5,
        maxX: 14.8,
        minY: 7.7,
        maxY: 10.6,
        minZ: 49.6,
        maxZ: 62
    },
    {
        minX: 15,
        maxX: 20.4,
        minY: 7.7,
        maxY: 10.8,
        minZ: 51.4,
        maxZ: 55.6
    },

    
];

const listInfo = [
    {
        judul: "Bantalan",
        content: "Digunakan untuk  mengatur agar hewan tidak banyak gerak selama proses rontgen"
    },
    {
        judul: "Papan pelindung",
        content:"Digunakan sebagai penghalang bagi dokter hewan dari radiasi sinar x-ray ketika akan melakukan proses penembakan sinar x-ray "
    },
    {
        judul: "Penyimpan kaset film",
        content: "Berfungsi sebagai tempat untuk menyimpan gambar hasil dari rongent."
    },
    {
        judul: "Lubang kunci",
        content:"Digunakan untuk menyalakan mesin dengan cara memutarkan kunci"
    },
    {
        judul: "X-ray ultrasonografi",
        content:"Mengeluarkan gelombang suara ketika proses rontgen sedang berlangsung"
    },
    {
        judul: "Penggaris",
        content:"Digunakan untuk mengukur ketebalan kulit hewan."
    },
    {
        judul: "Switch",
        content:"Sebuah tombol on/off alat pengisian daya untuk mendapatkan energi cadangan apabila listrik padam."
    },
    {
        judul: "Knob (depan)",
        content:"Mengatur panjang frame cahaya saat akan melakukan proses rontgen"
    },
    {
        judul: "Knob (samping)",
        content:"Mengatur lebar frame cahaya saat akan melakukan proses rontgen"
    },
    {
        judul: "Tombol X-ray",
        content:"Akan mengaktifkan sinar-X saat tombol di tekan"
    },
    {
        judul: "Generator",
        content:"Digunakan untuk menghasilkan daya listrik yang diperlukan untuk mengoperasikan alat rontgen"
    },
    {
        judul: "Meja Rontgen",
        content:"Meja di mana hewan ditempatkan selama prosedur rontgen"
    },
    {
        judul: "Komputer",
        content:"Berfungsi sebagai alat penyimpanan dan pengelolaan hasil gambar dari proses rontgen yang telah dilakukan. Jika ingin mencetak hasilnya, dapat menggunakan printer"
    },
    {
        judul: "Printer",
        content:"Berfungsi sebagai alat untuk mencetak gambar dari proses rontgen"
    },
];

var infoModel = [];

// Nilai jarak minimum dan maksimum
const minCameraDistance = 10; // Jarak minimum
const maxCameraDistance = 100; // Jarak maksimum

function onWindowResize() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
}

window.addEventListener('resize', onWindowResize);

onWindowResize();

function onClick(event) {
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

        const targetPosition = intersects[0].point.clone().add(normal.multiplyScalar(2));

        // buat nampilin posisi di console log
        console.log('Posisi objek yang diklik (x, y, z):', targetPosition.x, targetPosition.y, targetPosition.z);

        hideInfo();

        // manggil boundary
        for (const boundary of boundaries) {
            if (
                targetPosition.x >= boundary.minX && targetPosition.x <= boundary.maxX &&
                targetPosition.y >= boundary.minY && targetPosition.y <= boundary.maxY &&
                targetPosition.z >= boundary.minZ && targetPosition.z <= boundary.maxZ
            ) {
                infoModel = listInfo[boundaries.indexOf(boundary)];
                console.log(infoModel);
                hideInfo();
                showInfo(infoModel.judul, infoModel.content);
            } 
        } 
    }  else {
        hideInfo();
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

document.addEventListener('touchstart', onTouchStart);
document.addEventListener('touchend', onTouchEnd);

function onTouchStart() {
    if (infoModel.length > 0) {
        showInfo(infoModel.judul, infoModel.content);
    };
}

function onTouchEnd() {
    hideInfo();
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
