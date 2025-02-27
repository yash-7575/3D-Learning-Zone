class ModelViewer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.modelType = new URLSearchParams(window.location.search).get('model') || 'brain';
        this.init();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        // Lighting
        this.setupLights();

        // Camera position
        this.camera.position.set(0, 2, 5);

        // Controls
        this.setupControls();

        // Load model
        this.loadModel();

        // Event listeners
        window.addEventListener('resize', () => this.onWindowResize(), false);

        // Start animation loop
        this.animate();
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 0);
        this.scene.add(directionalLight);
    }

    setupControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = true;
        this.controls.minDistance = 0.1;
        this.controls.maxDistance = 100;
        this.controls.maxPolarAngle = Math.PI;
        this.controls.minPolarAngle = 0;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;
        this.controls.enableRotate = true;
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;

        this.controls.touches = {
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
        };

        this.controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
        };
    }

    loadModel() {
        const loader = new THREE.GLTFLoader();
        const modelPath = this.getModelPath();
        
        loader.load(
            modelPath,
            (gltf) => {
                const model = gltf.scene;
                
                // Center the model
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center);
                
                // Scale to fit
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 2 / maxDim;
                model.scale.multiplyScalar(scale);
                
                this.scene.add(model);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.error('Error loading model:', error);
            }
        );
    }

    getModelPath() {
        const models = {
            'brain': './models/brain/scene.gltf',
            'nose': './models/nose/scene.gltf'
        };
        return models[this.modelType] || models['brain'];
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    resetPosition() {
        this.controls.reset();
    }
}

// Initialize the viewer when the page loads
window.addEventListener('DOMContentLoaded', () => {
    const viewer = new ModelViewer('model-container');
    window.modelViewer = viewer; // Make it accessible globally for controls
}); 