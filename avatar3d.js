// 3D Avatar Configuration
let scene, camera, renderer, avatar, mixer;

async function initAvatar() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x00ff00, 0.3);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, 
        document.getElementById('avatar-container').clientWidth / 
        document.getElementById('avatar-container').clientHeight,
        0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
        document.getElementById('avatar-container').clientWidth,
        document.getElementById('avatar-container').clientHeight
    );
    document.getElementById('avatar-container').appendChild(renderer.domElement);

    // Create placeholder avatar
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x00aa00,
        specular: 0x111111,
        shininess: 30
    });
    avatar = new THREE.Mesh(geometry, material);
    scene.add(avatar);
    
    // Simple rotation animation
    mixer = new THREE.AnimationMixer(avatar);
    const clip = new THREE.AnimationClip('rotate', -1, [
        new THREE.VectorKeyframeTrack('.rotation[y]', [0, 2], [0, Math.PI * 2])
    ]);
    const action = mixer.clipAction(clip);
    action.play();

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        if (mixer) mixer.update(0.01);
    }
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = 
            document.getElementById('avatar-container').clientWidth / 
            document.getElementById('avatar-container').clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
            document.getElementById('avatar-container').clientWidth,
            document.getElementById('avatar-container').clientHeight
        );
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initAvatar);

// Speech animation functions
window.startSpeaking = function() {
    if (avatar) {
        avatar.material.color.setHex(0x55ff55);
        avatar.scale.set(1.05, 1.05, 1.05);
    }
};

window.stopSpeaking = function() {
    if (avatar) {
        avatar.material.color.setHex(0x00aa00);
        avatar.scale.set(1, 1, 1);
    }
};
