import { useState } from "react";
import { initializeAudio, startAudio } from "./audioSetup";
import Visualizer from "./Visualizer";

const Play = () => {
  const [isSongLoaded, setIsSongLoaded] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // New flag

  const loadSong = () => {
    initializeAudio(() => {
      setIsSongLoaded(true);
      setIsAudioReady(true);
    });
  };

  const handleStart = () => {
    setHasStarted(true); // Mounts visualizer immediately
    setTimeout(() => {
      startAudio(); // Start audio after 1 second
    }, 2000); // Delay in milliseconds
  };

  return (
    <div>
      {!hasStarted && (
        <>
          <h1>Music Visualizer</h1>
          {!isSongLoaded && <button onClick={loadSong}>Load Song</button>}
          {isAudioReady && <button onClick={handleStart}>Play Music</button>}
        </>
      )}
      {hasStarted && <Visualizer />}
    </div>
  );
};

export default Play;

// import React from 'react';
// import Visualizer from './Visualizer';

// const Play: React.FC = () => {
//   // const [isMicEnabled, setIsMicEnabled] = React.useState(false);
//   const [isMicEnabled, setIsMicEnabled] = React.useState(true);

//   const handleEnableMic = () => {
//     setIsMicEnabled(true);
//   };

//   return (
//     <div>
//       {/* Button to enable microphone input */}
//       {!isMicEnabled && (
//         <button onClick={handleEnableMic}>Enable Microphone</button>
//       )}

//       {/* Render the Visualizer component if the microphone is enabled */}
//       {isMicEnabled && <Visualizer />}
//     </div>
//   );
// };

// export default Play;
