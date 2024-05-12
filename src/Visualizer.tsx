import { useEffect, useRef } from "react";
import * as THREE from "three";
import { scene, camera, renderer, appendRendererToDOM } from "./sceneSetup";
import {
  initializeMicrophoneInput,
  getAnalyserNode,
  audioContext,
} from "./microphoneInput";

const gridSize = 10;
const cubeSize = 0.5;
const spacing = 2;

const Visualizer = () => {
  const cubesRef = useRef<THREE.Mesh[]>([]);
  const requestIdRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode>();

  useEffect(() => {
    const setupMicrophone = async () => {
      await initializeMicrophoneInput();
      analyserRef.current = getAnalyserNode();
      animate();
    };

    // Set renderer size to full screen
    renderer.setSize(window.innerWidth, window.innerHeight);

    appendRendererToDOM("visualizer");
    createCubes();
    setupMicrophone();

    // Resume AudioContext on user interaction
    const resumeAudioContext = () => {
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
    };
    document.addEventListener("click", resumeAudioContext);

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);

    return () => {
      cancelAnimationFrame(requestIdRef.current!);
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("click", resumeAudioContext);
      const element = document.getElementById("visualizer");
      if (element && element.contains(renderer.domElement)) {
        element.removeChild(renderer.domElement);
      }
      cubesRef.current.forEach((cube) => scene.remove(cube));
      cubesRef.current = [];
    };
  }, []);

  const createCubes = () => {
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          const geometry = new THREE.TorusKnotGeometry(500,1,64,8,4,3);
          // const geometry = new THREE.SphereGeometry(5,32,16);
          const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(
              `hsl(${((gridSize - x - 1) / gridSize) * 360}, 100%, 50%)`
            ),
          });
          const cube = new THREE.Mesh(geometry, material);

          cube.position.set(
            (gridSize - x - 1 - gridSize / 2) * spacing,
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

    if (analyserRef.current) {
      const frequencyData = new Uint8Array(
        analyserRef.current.frequencyBinCount
      );
      analyserRef.current.getByteFrequencyData(frequencyData);

      // const lowFreqRange = Math.floor(frequencyData.length * 0.1); // 10% for the first row
      const lowFreqStart = Math.floor(frequencyData.length * 0.05);
      const lowFreqEnd = Math.floor(frequencyData.length * 0.1);
      const lowFreqRange = lowFreqEnd - lowFreqStart; // 5% to 10%

      const midFreqStart = Math.floor(frequencyData.length * 0.1);
      const midFreqEnd = Math.floor(frequencyData.length * 0.8);
      const midFreqRange = midFreqEnd - midFreqStart; // 10% to 80%

      cubesRef.current.forEach((cube) => {
        let index;
        const positionX = cube.position.x + (gridSize / 2) * spacing;

        if (positionX < spacing) {
          const normalizedPosition =
            (positionX - spacing) / ((gridSize - 1) * spacing);
          // index = Math.floor((positionX / spacing) * lowFreqRange);
          index = lowFreqStart + Math.floor(normalizedPosition * lowFreqRange);
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

      scene.rotation.x += 0.002;
      scene.rotation.y += 0.01;

      const time = Date.now() * 0.0001;
      camera.position.z = 1000 + Math.sin(time) * 15;
      camera.lookAt(scene.position);
    }

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.render(scene, camera);
  };

  return (
    <div
      id="visualizer"
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    ></div>
  );
};

export default Visualizer;
