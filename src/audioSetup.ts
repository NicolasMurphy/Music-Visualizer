import { camera } from './sceneSetup.js';
import { AudioListener, Audio, AudioLoader} from 'three';
// import { AudioListener, Audio, AudioLoader, AudioAnalyser} from 'three';

// let started = false;
// let sound: Audio , analyser: AudioAnalyser;
let sound: Audio | null = null;

const startAudioDirectly = () => {
    // if (!started) {
        if (!sound) {
            const listener = new AudioListener();
            camera.add(listener);

            sound = new Audio(listener);

            const audioLoader = new AudioLoader();
            audioLoader.load('/cadet(pinballMix).mp3', function(buffer) {
                sound.setBuffer(buffer);
                sound.setLoop(true);
                sound.setVolume(0.5);
                sound.play();
                // started = true;

                // analyser = new AudioAnalyser(sound, 4096);
            }, undefined, function(err) {
                console.error('Error loading audio:', err);
            });
        } else {
            sound.play();
            // started = true;
        }
    }
// };

// export { startAudioDirectly, analyser, started };
export { startAudioDirectly };
