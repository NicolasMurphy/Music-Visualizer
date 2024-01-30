import { initializeAudio, startAudio } from './audioSetup.js';
import { animate } from './animation.js';

const playButton = document.getElementById('play-button');
playButton.style.display = 'none';

initializeAudio(() => {
    playButton.style.display = 'block';
    playButton.addEventListener('click', startAudio);
});

animate();
