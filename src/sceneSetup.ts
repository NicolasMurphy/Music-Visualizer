import { Scene, PerspectiveCamera, WebGLRenderer, PointLight } from 'three';

const scene: Scene = new Scene();
const camera: PerspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 1000);
const renderer: WebGLRenderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 5;
camera.lookAt(scene.position);

const light: PointLight = new PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

const appendRendererToDOM = (elementId: string): void => {
    const element = document.getElementById(elementId);
    if (element) {
        element.appendChild(renderer.domElement);
    } else {
        console.warn(`Element with id '${elementId}' not found.`);
    }
}

export { scene, camera, renderer, appendRendererToDOM };
