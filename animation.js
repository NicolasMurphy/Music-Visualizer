import { renderer, scene, camera } from "./sceneSetup.js";
import { analyser, started } from "./audioSetup.js";

const cubes = [];
const gridSize = 10;
const cubeSize = 0.5;
const spacing = 1.2;

for (let x = 0; x < gridSize; x++) {
  for (let y = 0; y < gridSize; y++) {
    for (let z = 0; z < gridSize; z++) {
      const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(`hsl(${(x / gridSize) * 360}, 100%, 50%)`),
      });
      const cube = new THREE.Mesh(geometry, material);

      cube.position.set(
        (x - gridSize / 2) * spacing,
        (y - gridSize / 2) * spacing,
        (z - gridSize / 2) * spacing
      );

      scene.add(cube);
      cubes.push(cube);
    }
  }
}

function animate() {
  requestAnimationFrame(animate);

  if (started) {
    const frequencyData = analyser.getFrequencyData();

    const lowFreqRange = Math.floor(frequencyData.length * 0.01);

    const midFreqStart = Math.floor(frequencyData.length * 0.05);
    const midFreqEnd = Math.floor(frequencyData.length * 0.8);
    const midFreqRange = midFreqEnd - midFreqStart; // 5% to 80%

    cubes.forEach((cube, i) => {
      let index;
      const positionX = cube.position.x + (gridSize / 2) * spacing;

      if (positionX < spacing) {
        index = Math.floor((positionX / spacing) * lowFreqRange);
      } else {
        const normalizedPosition =
          (positionX - spacing) / ((gridSize - 1) * spacing);
        index = midFreqStart + Math.floor(normalizedPosition * midFreqRange);
      }

      const rawScale = frequencyData[index] / 128 + 0.5;
      const adjustedScaleValue = Math.max(rawScale - 0.5, 0.01);
      const logScale = Math.log(adjustedScaleValue + 1) + 0.2;

      cube.scale.set(logScale, logScale, logScale);
    });

    scene.rotation.x += 0.001;
    scene.rotation.y += 0.001;

    const time = Date.now() * 0.0001;
    camera.position.z = 20 + Math.sin(time) * 15;
    camera.lookAt(scene.position);
  }

  renderer.render(scene, camera);
}

export { animate };
