import * as THREE from '../../node_modules/three';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.getElementById('modelCanvasDetail');
const prevBtn = document.getElementById('prevNextBtn').firstElementChild.children[0];
const nextBtn = document.getElementById('prevNextBtn').firstElementChild.children[1];

let panelIndex = 14;
// let frontIndex = 1;
// let prevFront;
let prevIndex;
var savedEvent
var initialSet = true;

// add listener to prev Btn
prevBtn.addEventListener("click", () => {
    prevIndex = panelIndex;
    panelIndex -= 1;
    initialSet = false;
    onClick(savedEvent);
})
nextBtn.addEventListener("click", () => {
    prevIndex = panelIndex;
    panelIndex += 1;
    initialSet = false;
    onClick(savedEvent);
})

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x808080);

document.body.appendChild(renderer.domElement);

canvas.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

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
    // console.log(content);
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
    {
        minX: -2,
        maxX: 2,
        minY: 11,
        maxY:14,
        minZ: -2,
        maxZ: 2
    },
];

// const fontBoundaries = [
//     {
//         minX: -1.6,
//         maxX: 1.6,
//         minY: 21.5,
//         maxY:23.3,
//         minZ: 20,
//         maxZ: 22
//     },
// ];

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
    {
        judul: "Panel Control (Back)",
        content:"panel yang berisikan tombol-tombol untuk mengatur output yang dihasilkan oleh alat rontgen"
    },
    {
        judul: "S-M-L (ukuran hewan)",
        content:"Untuk menentukan ukuran hewan yang di-scan (disarankan untuk hewan tidak terlalu besar seperti anjing, kucing, dll)"
    },
    {
        judul: "Lampu",
        content:"Untuk menyalakan lampu"
    },
    {
        judul: "Density",
        content:"Untuk mengatur tingkat pencahayaan/kontras hasil scan"
    },
    {
        judul: "mAs control",
        content:"Nilainya disesuaikan dengan bagian tubuh yang akan discan. Semakin banyak organ pada bagian tubuh yang di scan, semakin besar nilai mAs yang diperlukan"
    },
    {
        judul: "kV (kilovolt) control",
        content:"Nilainya disesuaikan dengan bagian tubuh yang akan discan. Semakin banyak organ pada bagian tubuh yang di scan, semakin besar nilai mAs yang diperlukan"
    },
];

// const listFrontInfo = [
//     {
//         judul: "Panel Control (Front)",
//         content:"panel yang berisikan tombol-tombol untuk mengatur output yang dihasilkan oleh alat rontgen"
//     },
//     {
//         judul: "mAs control",
//         content:"Nilainya disesuaikan dengan bagian tubuh yang akan discan. Semakin banyak organ pada bagian tubuh yang di scan, semakin besar nilai mAs yang diperlukan"
//     },
//     {
//         judul: "kV (kilovolt) control",
//         content:"Nilainya disesuaikan dengan bagian tubuh yang akan discan. Semakin banyak organ pada bagian tubuh yang di scan, semakin besar nilai mAs yang diperlukan"
//     },
// ];

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

const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Warna merah

// kotak lubang kunci
const boxGeometry1 = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-2.55, 10, -4.5),
    new THREE.Vector3(-1.05, 10, -4.5),
    new THREE.Vector3(-0.95, 11.5, -4.5),
    new THREE.Vector3(-2.35, 11.5, -4.5),
    new THREE.Vector3(-2.55, 10, -4.5)
]);
// kotak S-M-L
const boxGeometry2 = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(1.05, 14.7, -5.2),
    new THREE.Vector3(-0.1, 14.7, -5.2),
    new THREE.Vector3(-0.1, 15.3, -5.2),
    new THREE.Vector3(1, 15.3, -5.2),
    new THREE.Vector3(1.05, 14.7, -5.2)
]);
// kotak Lampu
const boxGeometry3 = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-0.45, 14.7, -5.2),
    new THREE.Vector3(-0.8, 14.7, -5.2),
    new THREE.Vector3(-0.79, 15.2, -5.2),
    new THREE.Vector3(-0.44, 15.2, -5.2),
    new THREE.Vector3(-0.45, 14.7, -5.2)
]);
// kotak Density
const boxGeometry4 = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-0.66, 14.05, -5.2),
    new THREE.Vector3(-1.75, 14.05, -5.2),
    new THREE.Vector3(-1.7, 14.7, -5.2),
    new THREE.Vector3(-0.6, 14.7, -5.2),
    new THREE.Vector3(-0.65, 14.05, -5.2)
]);
// kotak mAs (back)
const boxGeometry5 = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-1.85, 14.5, -4.5),
    new THREE.Vector3(-0.55, 14.5, -4.5),
    new THREE.Vector3(-0.5, 15.5, -4.6),
    new THREE.Vector3(-1.7, 15.5, -4.6),
    new THREE.Vector3(-1.85, 14.5, -4.5)
]);
// kotak kV(kilovolt)
const boxGeometry6 = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(1.9, 14.5, -4.5),
    new THREE.Vector3(0.6, 14.5, -4.5),
    new THREE.Vector3(0.55, 15.5, -4.6),
    new THREE.Vector3(1.75, 15.5, -4.6),
    new THREE.Vector3(1.9, 14.5, -4.5)
]);
//kotak mAs (front)
const boxGeometryFront1 = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(1.9, 14.5, -4.5),
    new THREE.Vector3(0.6, 14.5, -4.5),
    new THREE.Vector3(0.55, 15.5, -4.6),
    new THREE.Vector3(1.75, 15.5, -4.6),
    new THREE.Vector3(1.9, 14.5, -4.5)
]);
// kotak kV(kilovolt) [front]
const boxGeometryFront2 = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(1.9, 14.5, -4.5),
    new THREE.Vector3(0.6, 14.5, -4.5),
    new THREE.Vector3(0.55, 15.5, -4.6),
    new THREE.Vector3(1.75, 15.5, -4.6),
    new THREE.Vector3(1.9, 14.5, -4.5)
]);

const boxes = [
    new THREE.Line(boxGeometry1, lineMaterial),
    new THREE.Line(boxGeometry2, lineMaterial),
    new THREE.Line(boxGeometry3, lineMaterial),
    new THREE.Line(boxGeometry4, lineMaterial),
    new THREE.Line(boxGeometry5, lineMaterial),
    new THREE.Line(boxGeometry6, lineMaterial),
]
// const boxesFront = [
//     new THREE.Line(boxGeometryFront1, lineMaterial),
//     new THREE.Line(boxGeometryFront2, lineMaterial)
// ]
// const box1 = new THREE.Line(boxGeometry1, lineMaterial);
// const box2 = new THREE.Line(boxGeometry2, lineMaterial);
// const box3 = new THREE.Line(boxGeometry3, lineMaterial);
// const box4 = new THREE.Line(boxGeometry4, lineMaterial);
// const box5 = new THREE.Line(boxGeometry5, lineMaterial);
// const box6 = new THREE.Line(boxGeometry6, lineMaterial);

let previousCameraPosition = new THREE.Vector3();
let cameraMoved = false;

function onClick(event) {
    event.preventDefault();
    savedEvent = event;

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

        // if (panelIndex < 15) {
            hideInfo();
        // }

        // manggil boundary
        for (const boundary of boundaries) {
            // console.log("panelIndex = " + panelIndex);
            if (
                (targetPosition.x >= boundary.minX && targetPosition.x <= boundary.maxX &&
                targetPosition.y >= boundary.minY && targetPosition.y <= boundary.maxY &&
                targetPosition.z >= boundary.minZ && targetPosition.z <= boundary.maxZ) ||
                (!initialSet && panelIndex >= 14 && panelIndex < 20) 
                // (!initialSet && frontIndex >=18 && frontIndex <=20)
            ) {
                // if (boundaries.indexOf(boundary) == 15) {
                //     infoModel = listInfo[20];
                //     frontIndex = 20;
                // } else {
                    infoModel = listInfo[boundaries.indexOf(boundary)];
                //}
                // console.log(infoModel);
                if (infoModel.judul == "Panel Control (Back)") {
                    document.getElementById('prevNextBtn').style.visibility = "visible";
                    if (initialSet) {previousCameraPosition.copy(camera.position)};
                    cameraMoved = true;
                    camera.position.set(0.002, 21.3, -11.5);
                    camera.lookAt(targetPosition);
                    controls.enabled = false;
                    controls.update();
                    scene.remove(boxes[1]);
                } 
                // else if (infoModel.judul == "Panel Control (Front)") {
                //     document.getElementById('prevNextBtn').style.visibility = "visible";
                //     if (initialSet) {previousCameraPosition.copy(camera.position)};
                //     cameraMoved = true;
                //     camera.position.set(0.002, 29, 37);
                //     camera.lookAt(targetPosition);
                //     controls.enabled = false;
                //     controls.update();
                //     scene.remove(boxes[18]);
                // } 
                else {
                    document.getElementById('prevNextBtn').style.visibility = "hidden";
                }
                if (panelIndex > 14 && panelIndex < 20) {
                    infoModel = listInfo[panelIndex];
                    scene.remove(boxes[prevIndex - 14]);
                    scene.add(boxes[panelIndex - 14]);
                } 
                // else if (frontIndex > 17 && frontIndex < 21) {
                //     infoModel = listInfo[frontIndex];
                //     scene.remove(boxes[prevFront - 2]);
                //     console.log(frontIndex);
                //     scene.add(boxes[frontIndex - 2]);
                // }
                hideInfo();
                showInfo(infoModel.judul, infoModel.content);
            } if (panelIndex < 14) {
                panelIndex = 14;
            } else if (panelIndex > 19) {
                panelIndex = 19;
            } 
            // else if (frontIndex < 18) {
            //     frontIndex = 18;
            // } else if (frontIndex > 20) {
            //     frontIndex = 20;
            // }
        } 
    }  else {
        hideInfo();
        // console.log('cameraMoved:',cameraMoved);
        if (cameraMoved) {
            camera.position.copy(previousCameraPosition);
            controls.enabled = true;
            controls.update();
            cameraMoved = false;
            scene.remove(boxes[panelIndex - 14]);
            scene.remove(boxes[prevIndex - 14]);
            // scene.remove(boxes[frontIndex - 2]);
            // scene.remove(boxes[prevFront - 2]);
            panelIndex = 14;
            // frontIndex = 20;
            initialSet = true;
        }
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

    const cameraWorldPosition = new THREE.Vector3();
    camera.getWorldPosition(cameraWorldPosition);
    console.log("Posisi Kamera Dunia (x, y, z):", cameraWorldPosition.x, cameraWorldPosition.y, cameraWorldPosition.z);

    controls.update();
    renderer.render(scene, camera);
}
