// import { camera } from './sceneSetup.js';
// import { AudioListener, Audio, AudioLoader, AudioAnalyser} from 'three';

// let started = false;
// let sound: Audio , analyser: AudioAnalyser;

let audioContext: AudioContext;
let started = false;

const startAudioDirectly = () => {
    if (!started) {
        if (!audioContext) {
            audioContext = new (window.AudioContext);
            fetch('/cadet(pinballMix).mp3')
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                    const source = audioContext.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(audioContext.destination);
                    source.start();
                    started = true;
                })
                .catch(error => console.error('Error with fetching the audio file:', error));
        } else {
            audioContext.resume();
            started = true;
        }
    }
};


// const startAudioDirectly = () => {
//     if (!started) {
//         if (!sound) {
//             const listener = new AudioListener();
//             camera.add(listener);
//             sound = new Audio(listener);
//             const audioLoader = new AudioLoader();

//             audioLoader.load('/cadet(pinballMix).mp3', function(buffer) {
//                 sound.setBuffer(buffer);
//                 sound.setLoop(true);
//                 sound.setVolume(0.5);
//                 analyser = new AudioAnalyser(sound, 4096);

//                 sound.play();
//                 started = true;
//             });
//         } else {
//             sound.play();
//             started = true;
//         }
//     }
// };

// export { startAudioDirectly, analyser, started };

export { startAudioDirectly, started };
