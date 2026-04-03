/**
 * 3D Globe for Contact Section
 */

function initContactGlobe() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return;

    const container = canvas.parentElement;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Earth (Land)
    const earthGeometry = new THREE.SphereGeometry(4, 64, 64);
    const earthMaterial = new THREE.MeshStandardMaterial({
        color: 0x004411, // Dark Earth Green
        emissive: 0x001105,
        roughness: 0.7,
        metalness: 0.2
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Water sphere slightly smaller for depth
    const waterGeo = new THREE.SphereGeometry(3.9, 64, 64);
    const waterMat = new THREE.MeshStandardMaterial({
        color: 0x002244,
        roughness: 0.3,
        metalness: 0.5
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    scene.add(water);

    // Stylized "Wind/Cloud" Swooshes (Partial white rings from image)
    const swooshGroup = new THREE.Group();
    for (let i = 0; i < 20; i++) {
        const radius = 4.3 + Math.random() * 1.5;
        const tubeRadius = 0.1 + Math.random() * 0.2;
        const arc = Math.PI / 4 + Math.random() * Math.PI; // Partial arcs

        const swooshGeo = new THREE.TorusGeometry(radius, tubeRadius, 8, 50, arc);
        const swooshMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.5 + Math.random() * 0.4,
            roughness: 0.3
        });
        const swoosh = new THREE.Mesh(swooshGeo, swooshMat);

        swoosh.rotation.x = Math.random() * Math.PI;
        swoosh.rotation.y = Math.random() * Math.PI;
        swoosh.rotation.z = Math.random() * Math.PI;

        swoosh.userData = {
            rotSpeedX: (Math.random() - 0.5) * 0.01,
            rotSpeedY: (Math.random() - 0.5) * 0.01,
            rotSpeedZ: (Math.random() - 0.5) * 0.01
        };

        swooshGroup.add(swoosh);
    }
    scene.add(swooshGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const redLight = new THREE.PointLight(0xf00808, 4, 25);
    redLight.position.set(-8, -5, 5);
    scene.add(redLight);

    function animate() {
        requestAnimationFrame(animate);

        earth.rotation.y += 0.003;
        water.rotation.y += 0.003;

        swooshGroup.children.forEach(child => {
            child.rotation.x += child.userData.rotSpeedX;
            child.rotation.y += child.userData.rotSpeedY;
            child.rotation.z += child.userData.rotSpeedZ;
        });

        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });

    animate();
}

// Initialized when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure container dimensions are set
    setTimeout(initContactGlobe, 100);
});
