// Use global THREE from CDN
const THREE = window.THREE;
const GLTFLoader = THREE.GLTFLoader;
const OrbitControls = THREE.OrbitControls;

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    powerPreference: "high-performance"
  });
} catch (e) {
  console.error('WebGL not supported:', e);
  document.getElementById('avatar-container').innerHTML = `
    <div class="fallback-avatar">
      <i class="fas fa-robot"></i>
      <p>3D Avatar not supported in your browser</p>
      <p class="text-sm">${e.message}</p>
    </div>
  `;
  return;
}
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('avatar-container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Load 3D model with progress and error handling
const loader = new GLTFLoader();
const progressContainer = document.createElement('div');
progressContainer.className = 'model-loading';
progressContainer.innerHTML = `
  <div class="loading-text">Duke ngarkuar modelin 3D...</div>
  <div class="loading-bar">
    <div class="progress"></div>
  </div>
`;
document.getElementById('avatar-container').appendChild(progressContainer);

// Simple avatar model that will load reliably
const modelUrl = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/duck/glTF/Duck.gltf';

loader.load(
  modelUrl,
  function (gltf) {
    progressContainer.remove();
    const model = gltf.scene;
    model.scale.set(0.8, 0.8, 0.8);
    model.position.y = -0.5;
    model.rotation.y = Math.PI;
    scene.add(model);

    // Setup animations
    const mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;
    if (clips && clips.length) {
      clips.forEach(clip => {
        const action = mixer.clipAction(clip);
        action.play();
      });
    }

    // Speaking animation control
    window.startSpeaking = function() {
      const mouth = model.getObjectByName('Mouth');
      if (mouth) {
        mouth.material.emissiveIntensity = 1.0;
        mouth.material.needsUpdate = true;
      }
    };

    window.stopSpeaking = function() {
      const mouth = model.getObjectByName('Mouth');
      if (mouth) {
        mouth.material.emissiveIntensity = 0.0;
        mouth.material.needsUpdate = true;
      }
    };

    // Animation loop
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      renderer.render(scene, camera);
    }
    animate();
  },
  function (xhr) {
    const percent = (xhr.loaded / xhr.total) * 100;
    progressContainer.querySelector('.progress').style.width = `${percent}%`;
  },
  function (error) {
    console.error('Error loading 3D model:', error);
    progressContainer.innerHTML = `
      <div class="fallback-avatar">
        <i class="fas fa-robot"></i>
        <p>Modeli 3D nuk u ngarkua</p>
      </div>
    `;
  }
);

// Interactive controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.maxPolarAngle = Math.PI/2;
controls.minPolarAngle = Math.PI/4;
controls.target.set(0, 1, 0);
camera.position.set(0, 1.5, 2.5);

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Speech animation
window.startSpeaking = function() {
  // Would trigger mouth animation in full implementation
  console.log("Speaking animation started");
};

window.stopSpeaking = function() {
  // Would stop mouth animation
  console.log("Speaking animation stopped");
};