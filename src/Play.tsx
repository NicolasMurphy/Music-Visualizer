import { useState } from 'react';
import { startAudioDirectly } from './audioSetup';
import Visualizer from './Visualizer';

const Play = () => {
  const [isAudioReady, setIsAudioReady] = useState(false);

  const handlePlayClick = () => {
    startAudioDirectly();
    setIsAudioReady(true);
  };

  return (
    <div>
      <h1>Music Visualizer</h1>
      <button onClick={handlePlayClick}>Play</button>
      {isAudioReady && <Visualizer />}
    </div>
  );
};

export default Play;
