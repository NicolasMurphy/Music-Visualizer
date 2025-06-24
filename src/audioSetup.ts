import { camera } from './sceneSetup.js';
import { AudioListener, Audio, AudioLoader, AudioAnalyser} from 'three';

let started = false;
let sound: Audio , analyser: AudioAnalyser;

function initializeAudio(onAudioReady: () => void) {

    const listener = new AudioListener();
    camera.add(listener);

    sound = new Audio(listener);
    const audioLoader = new AudioLoader();

    audioLoader.load('/6-19-24.mp3', function(buffer) {

        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);

        analyser = new AudioAnalyser(sound, 4096);

        if (typeof onAudioReady === 'function') {
            onAudioReady();
        }
    });
}

function startAudio() {
    if (!started) {
        if (sound.context.state === 'suspended') {
            sound.context.resume().then(() => {
                sound.play();
                started = true;
            });
        } else {
            sound.play();
            started = true;
        }
    }
}


export { initializeAudio, startAudio, analyser, started };
