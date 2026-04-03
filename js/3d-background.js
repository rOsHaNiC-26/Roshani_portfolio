/**
 * 3D Background with Three.js
 * Computers, Code, Developers and Sparkles
 */

let scene, camera, renderer, objects = [], sparkles;

function init3D() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff0000, 5, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const blueLight = new THREE.PointLight(0x00f2fe, 2, 100);
    blueLight.position.set(-10, -10, 10);
    scene.add(blueLight);

    // Create 3D Objects
    createObjects();

    // Create Crystal Royal Symbol
    createRoyalCrystal();

    // Create Starry Night
    createStarryNight();

    // Create Pill Shapes
    createPills();

    // Create Gaming Setup
    createGamingSetup();

    // Create Enhanced Sparkles & Plexus
    createParticleSystem();

    // Mouse Interaction
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);

    animate();
}

function createObjects() {
    const geometryBox = new THREE.BoxGeometry(1, 1, 1);
    const geometrySphere = new THREE.SphereGeometry(0.7, 32, 32);

    // Developer representation (Stylized Spheres)
    for (let i = 0; i < 8; i++) {
        const material = new THREE.MeshPhongMaterial({
            color: i % 2 === 0 ? 0xff0000 : 0xffffff,
            emissive: i % 2 === 0 ? 0x330000 : 0x222222,
            shininess: 100
        });
        const mesh = new THREE.Mesh(geometrySphere, material);
        mesh.position.set(
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 30
        );
        mesh.userData = {
            speed: Math.random() * 0.01 + 0.005,
            rotSpeed: Math.random() * 0.02
        };
        scene.add(mesh);
        objects.push(mesh);
    }

    // Python Code Snippets
    createPythonSnippets();

    // Computer Screens (Rectangular boxes)
    for (let i = 0; i < 8; i++) {
        const material = new THREE.MeshPhongMaterial({ color: 0x111111 });
        const screenMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8 });
        const group = new THREE.Group();

        // Screen Case
        const screen = new THREE.Mesh(new THREE.BoxGeometry(4, 2.5, 0.3), material);
        group.add(screen);

        // Actual Screen (Glowing)
        const display = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.1, 0.1), screenMaterial);
        display.position.z = 0.16;
        group.add(display);

        // Stand
        const stand = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.8, 0.2), material);
        stand.position.y = -1.5;
        group.add(stand);

        group.position.set(
            (Math.random() - 0.5) * 70,
            (Math.random() - 0.5) * 70,
            (Math.random() - 0.5) * 40
        );
        group.userData = { speed: Math.random() * 0.005 + 0.002 };
        scene.add(group);
        objects.push(group);
    }
}

function createPythonSnippets() {
    const snippets = [
        'def init():',
        'import three',
        'class User:',
        'return "Success"',
        'print("Hello")',
        'if __name__ == "__main__":',
        'while True:',
        'await async_func()',
        'from future import all',
        '# Python <3'
    ];

    snippets.forEach((text, i) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 128;

        // Transparent background
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Text style
        ctx.font = 'bold 40px "Courier New", monospace';
        ctx.fillStyle = i % 2 === 0 ? '#ff0000' : '#ffffff'; // Red and White theme
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
            opacity: 0.9
        });

        const geometry = new THREE.PlaneGeometry(10, 2.5);
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 40
        );

        // Random rotation
        mesh.rotation.z = (Math.random() - 0.5) * 0.5;
        mesh.rotation.y = (Math.random() - 0.5) * 0.5;

        mesh.userData = {
            speed: Math.random() * 0.01 + 0.002,
            rotSpeed: Math.random() * 0.01
        };

        scene.add(mesh);
        objects.push(mesh);
    });
}

function createPills() {
    for (let i = 0; i < 10; i++) {
        const group = new THREE.Group();

        // Pill Outer (Capsule)
        const outerGeo = new THREE.CapsuleGeometry(0.5, 1.2, 8, 16);
        const outerMat = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide
        });
        const outer = new THREE.Mesh(outerGeo, outerMat);
        group.add(outer);

        // Inner Dot (Red)
        const innerGeo = new THREE.SphereGeometry(0.3, 16, 16);
        const innerMat = new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0x330000 });
        const inner = new THREE.Mesh(innerGeo, innerMat);
        inner.position.y = (Math.random() - 0.5) * 0.8; // Random position inside pill
        group.add(inner);

        group.position.set(
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 50
        );
        group.userData = {
            speed: Math.random() * 0.005 + 0.002,
            moveDir: Math.random() > 0.5 ? 1 : -1
        };
        scene.add(group);
        objects.push(group);
    }
}

function createGamingSetup() {
    const group = new THREE.Group();
    const caseColor = 0x111111;
    const accentColor = 0xf00808;

    // 1. MONITOR
    const monitorGroup = new THREE.Group();
    const frame = new THREE.Mesh(new THREE.BoxGeometry(8, 5, 0.4), new THREE.MeshPhongMaterial({ color: caseColor }));
    monitorGroup.add(frame);

    const screen = new THREE.Mesh(new THREE.BoxGeometry(7.5, 4.5, 0.1), new THREE.MeshBasicMaterial({ color: 0x050505 }));
    screen.position.z = 0.2;
    monitorGroup.add(screen);

    // Code Lines (Simulated with thin planes)
    for (let i = 0; i < 6; i++) {
        const line = new THREE.Mesh(new THREE.PlaneGeometry(3, 0.1), new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0.5 }));
        line.position.set(-1.5, 1.5 - (i * 0.4), 0.22);
        monitorGroup.add(line);
    }

    const stand = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 0.5), new THREE.MeshPhongMaterial({ color: caseColor }));
    stand.position.y = -3;
    monitorGroup.add(stand);

    monitorGroup.position.set(0, 2, 0);
    group.add(monitorGroup);

    // 2. SPEAKERS
    const createSpeaker = (x) => {
        const speaker = new THREE.Group();
        const body = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.5, 1.5), new THREE.MeshPhongMaterial({ color: caseColor }));
        speaker.add(body);

        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.05, 16, 32), new THREE.MeshBasicMaterial({ color: accentColor }));
        ring.position.z = 0.76;
        speaker.add(ring);

        speaker.position.set(x, -1, 1);
        return speaker;
    };
    group.add(createSpeaker(-6));
    group.add(createSpeaker(6));

    // 3. PC CASE
    const pcCase = new THREE.Group();
    const caseBody = new THREE.Mesh(new THREE.BoxGeometry(3, 5, 4), new THREE.MeshPhongMaterial({ color: caseColor, transparent: true, opacity: 0.9 }));
    pcCase.add(caseBody);

    // PC Fans
    for (let i = 0; i < 2; i++) {
        const fan = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.1, 16, 32), new THREE.MeshBasicMaterial({ color: accentColor }));
        fan.position.set(-1.51, 1 - (i * 2), 0);
        fan.rotation.y = Math.PI / 2;
        pcCase.add(fan);
    }

    pcCase.position.set(8, 0, -2);
    pcCase.rotation.y = -Math.PI / 6;
    group.add(pcCase);

    group.position.set(15, -5, 5); // Position it to the side of the home text
    group.rotation.y = -0.3;
    scene.add(group);
    objects.push(group);
}


let stars;
function createStarryNight() {
    const starCount = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 200;
        positions[i + 1] = (Math.random() - 0.5) * 200;
        positions[i + 2] = (Math.random() - 0.5) * 150;
        sizes[i / 3] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
        size: 0.15,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    stars = new THREE.Points(geometry, material);
    scene.add(stars);
}

let royalCrystal;
function createRoyalCrystal() {
    const geometry = new THREE.OctahedronGeometry(2, 0);
    const material = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0x660000,
        shininess: 100,
        flatShading: true,
        transparent: true,
        opacity: 0.9
    });

    royalCrystal = new THREE.Mesh(geometry, material);
    royalCrystal.position.set(0, 0, 10);
    scene.add(royalCrystal);

    // Inner Glow
    const light = new THREE.PointLight(0xff0000, 10, 20);
    royalCrystal.add(light);
}

let particles, lineMesh;
function createParticleSystem() {
    const particleCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 120;
        positions[i + 1] = (Math.random() - 0.5) * 120;
        positions[i + 2] = (Math.random() - 0.5) * 100;

        const isRed = Math.random() > 0.4;
        colors[i] = isRed ? 1.0 : 1.0;
        colors[i + 1] = isRed ? 0.0 : 1.0;
        colors[i + 2] = isRed ? 0.0 : 1.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Plexus Lines
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending
    });
    lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);
}

let mouseX = 0, mouseY = 0;
function onMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    // Rotate and Float Objects
    objects.forEach((obj, idx) => {
        obj.rotation.x += 0.005 * (idx % 2 === 0 ? 1 : -1);
        obj.rotation.y += 0.005;
        obj.position.y += Math.sin(time + idx) * 0.01;
        obj.position.x += Math.cos(time + idx) * 0.01;

        // Animate the inner dot for "Pill" objects
        if (obj.children.length > 1) {
            const inner = obj.children[1];
            inner.position.y = Math.sin(time * 2 + idx) * 0.4;
        }
    });

    // Move camera slightly based on mouse
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Particle/Plexus animation
    if (particles) {
        particles.rotation.y += 0.0005;
        particles.rotation.z += 0.0002;

        const pos = particles.geometry.attributes.position.array;
        const linePositions = [];

        // Simple plexus effect: Connect particles within a threshold
        // To keep performance high, we only check a subset or use a simple jitter
        for (let i = 0; i < 300; i += 3) {
            pos[i] += Math.sin(time + i) * 0.01;
            pos[i + 1] += Math.cos(time + i) * 0.01;

            // Draw lines between a few particles
            if (i < 100) {
                linePositions.push(pos[i], pos[i + 1], pos[i + 2]);
                linePositions.push(pos[i + 3], pos[i + 4], pos[i + 5]);
            }
        }
        particles.geometry.attributes.position.needsUpdate = true;

        if (lineMesh) {
            lineMesh.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
        }
    }

    // Twinkle Stars
    if (stars) {
        stars.rotation.y += 0.0002;
        const starSizes = stars.geometry.attributes.size.array;
        for (let i = 0; i < starSizes.length; i++) {
            starSizes[i] = Math.sin(time * 2 + i) * 0.5 + 0.5;
        }
    }

    // Royal Crystal Animation
    if (royalCrystal) {
        royalCrystal.rotation.y += 0.01;
        royalCrystal.rotation.x += 0.005;
        royalCrystal.position.y = Math.sin(time) * 1;
    }

    // Pulse Gaming RGB Setup
    objects.forEach(obj => {
        if (obj.children.length > 5) { // Identifying the gaming setup
            obj.children.forEach(child => {
                if (child.material && child.material.color && child.material.color.getHex() === 0xf00808) {
                    child.material.opacity = 0.5 + Math.sin(time * 3) * 0.3;
                }
            });
        }
    });

    renderer.render(scene, camera);
}

// Start sequence
window.addEventListener('load', () => {
    init3D();
});
