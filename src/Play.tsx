import { useState, useEffect } from 'react';
import { initializeAudio, startAudio } from './audioSetup';
import Visualizer from './Visualizer';

const Play = () => {
  const [isAudioReady, setIsAudioReady] = useState(false);

  useEffect(() => {
    initializeAudio(() => {
      setIsAudioReady(true);
    });
  }, []);

  return (
    <div>
      <h1>Music Visualizer</h1>
      {isAudioReady && (
        <>
          <button onClick={startAudio}>Play Music</button>
          <Visualizer />
        </>
      )}
    </div>
  );
};

export default Play;
