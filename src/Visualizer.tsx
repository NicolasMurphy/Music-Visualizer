import { useEffect, useRef } from "react";
import * as THREE from "three";
import { scene, camera, renderer, appendRendererToDOM } from './sceneSetup';
import { analyser, started } from "./audioSetup";

const gridSize = 10;
const cubeSize = 0.5;
const spacing = 1.2;

const Visualizer = () => {
  const cubesRef = useRef<THREE.Mesh[]>([]);
  const requestIdRef = useRef<number>();

  useEffect(() => {
    appendRendererToDOM('visualizer');
    createCubes();
    animate();

    return () => {
      cancelAnimationFrame(requestIdRef.current!);
      const element = document.getElementById('visualizer');
      if (element && element.contains(renderer.domElement)) {
        element.removeChild(renderer.domElement);
      }
      cubesRef.current.forEach(cube => scene.remove(cube));
      cubesRef.current = [];
    };
  }, []);

  const createCubes = () => {
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
          const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(`hsl(${((gridSize - x - 1) / gridSize) * 360}, 100%, 50%)`),
          });
          const cube = new THREE.Mesh(geometry, material);

          cube.position.set(
            ((gridSize - x - 1) - gridSize / 2) * spacing,
            (y - gridSize / 2) * spacing,
            (z - gridSize / 2) * spacing
          );

          scene.add(cube);
          cubesRef.current.push(cube);
        }
      }
    }
  };

  const animate = () => {
    requestIdRef.current = requestAnimationFrame(animate);

    if (started && analyser) {
      const frequencyData = analyser.getFrequencyData();

      const lowFreqRange = Math.floor(frequencyData.length * 0.01); // 1% for the first row
      const midFreqStart = Math.floor(frequencyData.length * 0.05);
      const midFreqEnd = Math.floor(frequencyData.length * 0.8);
      const midFreqRange = midFreqEnd - midFreqStart; // 5% to 80%

      cubesRef.current.forEach((cube) => {
        let index;
        const positionX = cube.position.x + (gridSize / 2) * spacing;

        if (positionX < spacing) {
          index = Math.floor((positionX / spacing) * lowFreqRange);
        } else {
          const normalizedPosition = (positionX - spacing) / ((gridSize - 1) * spacing);
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
  };

  return <div id="visualizer"></div>;
};

export default Visualizer;
