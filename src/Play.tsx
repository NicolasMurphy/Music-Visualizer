import { useState } from 'react';
import { startAudioDirectly } from './audioSetup';
import Visualizer from './Visualizer';

const Play = () => {
  const [isAudioReady, setIsAudioReady] = useState(false);

  const handlePlayClick = () => {
    startAudioDirectly();
    setIsAudioReady(true);
  };

  const testAudio = () => {
    const audio = new Audio('/cadet(pinballMix).mp3');
    audio.play();
};


  return (
    <div>
      <h1>Music Visualizer</h1>
      <button onClick={handlePlayClick}>Play</button>
      {isAudioReady && <Visualizer />}
      <button onClick={testAudio}>Play test</button>
    </div>
  );
};

export default Play;
