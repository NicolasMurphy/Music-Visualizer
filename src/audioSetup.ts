import { camera } from './sceneSetup.js';
import { AudioListener, Audio, AudioLoader, AudioAnalyser} from 'three';

let started = false;
let sound: Audio , analyser: AudioAnalyser;

function initializeAudio(onAudioReady: () => void) {
    const listener = new AudioListener();
    camera.add(listener);
    sound = new Audio(listener);
    const audioLoader = new AudioLoader();

    audioLoader.load('/cadet(pinballMix).wav', function(buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);

        if (typeof onAudioReady === 'function') {
            onAudioReady();
        }
    });

    analyser = new AudioAnalyser(sound, 4096);
}

function startAudio() {
    if (!started) {
        sound.play();
        started = true;
    }
}

export { initializeAudio, startAudio, analyser, started };
