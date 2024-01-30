import { useState } from 'react';
import { initializeAudio, startAudio } from './audioSetup';
import Visualizer from './Visualizer';

const Play = () => {
  const [isSongLoaded, setIsSongLoaded] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);

  const loadSong = () => {
    initializeAudio(() => {
      setIsSongLoaded(true);
      setIsAudioReady(true); // Assuming the song is ready to play immediately after loading
    });
  };

  return (
    <div>
      <h1>Music Visualizer</h1>
      {!isSongLoaded && <button onClick={loadSong}>Load Song</button>}
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
