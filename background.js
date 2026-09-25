/*let bgScene, bgCamera, bgRenderer, bgParticles, gridHelper;
let count = 0;
let mouseX = 0, mouseY = 0;

function initBackground3D() {
    const canvas = document.getElementById('bg-canvas-3d');
    if (!canvas) return;
    
    bgScene = new THREE.Scene();
    bgScene.fog = new THREE.FogExp2(0x060913, 0.0015);
    
    bgCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    bgCamera.position.set(0, 300, 500);
    bgCamera.lookAt(0, 0, 0);
    
    bgRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    buildBackgroundParticles();
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.2;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.2;
    });
    
    animateBackground3D();
}

function buildBackgroundParticles() {
    const numParticles = 1500;
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);
    const colorNormalA = new THREE.Color(0x38bdf8);
    const colorNormalB = new THREE.Color(0x818cf8);
    
    let i = 0;
    for (let ix = 0; ix < 50; ix++) {
        let currentColor = (ix % 2 === 0) ? colorNormalA : colorNormalB;
        for (let iy = 0; iy < 30; iy++) {
            positions[i] = ix * 40 - 1000;
            positions[i + 1] = 0;
            positions[i + 2] = iy * 40 - 600;
            colors[i] = currentColor.r;
            colors[i + 1] = currentColor.g;
            colors[i + 2] = currentColor.b;
            i += 3;
        }
    }
    
    const bgGeo = new THREE.BufferGeometry();
    bgGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    bgGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const bgMat = new THREE.PointsMaterial({
        size: 5,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
    });
    
    bgParticles = new THREE.Points(bgGeo, bgMat);
    bgScene.add(bgParticles);
    
    gridHelper = new THREE.GridHelper(2000, 40, 0x818cf8, 0x1e293b);
    gridHelper.position.y = -100;
    bgScene.add(gridHelper);
}

function animateBackground3D() {
    requestAnimationFrame(animateBackground3D);
    count += 0.03;
    
    bgCamera.position.x += (mouseX - bgCamera.position.x) * 0.05;
    bgCamera.position.y += (-mouseY + 300 - bgCamera.position.y) * 0.05;
    bgCamera.lookAt(bgScene.position);
    
    if (bgParticles) {
        const positions = bgParticles.geometry.attributes.position.array;
        let i = 0;
        for (let ix = 0; ix < 50; ix++) {
            for (let iy = 0; iy < 30; iy++) {
                positions[i + 1] = (Math.sin((ix + count) * 0.3) * 30) + (Math.sin((iy + count) * 0.5) * 30);
                i += 3;
            }
        }
        bgParticles.geometry.attributes.position.needsUpdate = true;
    }
    
    bgRenderer.render(bgScene, bgCamera);
}

// Cố định lại sự kiện resize để phủ kín tuyệt đối màn hình
window.addEventListener('resize', () => {
    if (!bgCamera || !bgRenderer) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    bgCamera.aspect = width / height;
    bgCamera.updateProjectionMatrix();
    bgRenderer.setSize(width, height);
});

window.addEventListener('DOMContentLoaded', initBackground3D);*/