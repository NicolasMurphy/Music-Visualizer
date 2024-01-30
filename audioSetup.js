import { camera } from './sceneSetup.js';

let started = false;
let sound, analyser;

function initializeAudio(onAudioReady) {
    const listener = new THREE.AudioListener();
    camera.add(listener);
    sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();

    audioLoader.load('cadet(pinballMix).wav', function(buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);

        if (typeof onAudioReady === 'function') {
            onAudioReady();
        }
    });

    analyser = new THREE.AudioAnalyser(sound, 4096);
}

function startAudio() {
    if (!started) {
        sound.play();
        started = true;
    }
}

export { initializeAudio, startAudio, analyser, started };
