/**
 * 3D Header Crystals
 * Renders rotating yellowish-red crystals in the logo and navbar area
 */

function initHeaderCrystals() {
    initLogoCrystal();
    initNavbarBackgroundCrystals();
}

function initLogoCrystal() {
    const canvas = document.getElementById('logo-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.width, canvas.height);

    // yellowish-red Crystal (Octahedron)
    const geometry = new THREE.OctahedronGeometry(1.5, 0);
    const material = new THREE.MeshPhongMaterial({
        color: 0xff4500, // Orange-red
        emissive: 0xff8c00, // Dark orange/yellowish
        shininess: 100,
        flatShading: true,
        transparent: true,
        opacity: 0.9
    });

    const crystal = new THREE.Mesh(geometry, material);
    scene.add(crystal);

    // Add multiple small clusters/fragments
    const fragmentCount = 5;
    const fragments = [];
    for (let i = 0; i < fragmentCount; i++) {
        const fragGeo = new THREE.OctahedronGeometry(0.3, 0);
        const frag = new THREE.Mesh(fragGeo, material);
        const angle = (i / fragmentCount) * Math.PI * 2;
        const radius = 2.5;
        frag.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            (Math.random() - 0.5) * 2
        );
        frag.userData = {
            angle: angle,
            radius: radius,
            speed: 0.02 + Math.random() * 0.02
        };
        scene.add(frag);
        fragments.push(frag);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffff00, 2, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    function animate() {
        requestAnimationFrame(animate);

        crystal.rotation.y += 0.02;
        crystal.rotation.x += 0.01;

        fragments.forEach(frag => {
            frag.userData.angle += frag.userData.speed;
            frag.position.x = Math.cos(frag.userData.angle) * frag.userData.radius;
            frag.position.y = Math.sin(frag.userData.angle) * frag.userData.radius;
            frag.rotation.x += 0.05;
            frag.rotation.y += 0.05;
        });

        renderer.render(scene, camera);
    }

    animate();
}

function initNavbarBackgroundCrystals() {
    const canvas = document.getElementById('navbar-bg-canvas');
    if (!canvas) return;

    const container = canvas.parentElement;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const crystalMaterial = new THREE.MeshPhongMaterial({
        color: 0xff8c00,
        emissive: 0xaa0000,
        flatShading: true,
        transparent: true,
        opacity: 0.15
    });

    const crystals = [];
    for (let i = 0; i < 15; i++) {
        const size = Math.random() * 2 + 1;
        const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(size, 0), crystalMaterial);
        crystal.position.set(
            (Math.random() - 0.5) * 150,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        crystal.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        crystal.userData = {
            rotX: Math.random() * 0.01,
            rotY: Math.random() * 0.01,
            speed: Math.random() * 0.05 + 0.02
        };
        scene.add(crystal);
        crystals.push(crystal);
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(1, 1, 1);
    scene.add(light);

    function animate() {
        requestAnimationFrame(animate);
        crystals.forEach(c => {
            c.rotation.x += c.userData.rotX;
            c.rotation.y += c.userData.rotY;
            c.position.x += c.userData.speed;
            if (c.position.x > 80) c.position.x = -80;
        });
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    animate();
}

document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure Three.js is loaded and dimensions are ready
    setTimeout(initHeaderCrystals, 100);
});
