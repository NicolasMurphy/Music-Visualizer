// import { useState } from 'react';
// import { initializeAudio, startAudio } from './audioSetup';
// import Visualizer from './Visualizer';

// const Play = () => {
//   const [isSongLoaded, setIsSongLoaded] = useState(false);
//   const [isAudioReady, setIsAudioReady] = useState(false);

//   const loadSong = () => {
//     initializeAudio(() => {
//       setIsSongLoaded(true);
//       setIsAudioReady(true);
//     });
//   };

//   return (
//     <div>
//       <h1>Music Visualizer</h1>
//       {!isSongLoaded && <button onClick={loadSong}>Load Song</button>}
//       {isAudioReady && (
//         <>
//           <button onClick={startAudio}>Play Music</button>
//           <Visualizer />
//         </>
//       )}
//     </div>
//   );
// };

// export default Play;

import React from 'react';
import Visualizer from './Visualizer';

const Play: React.FC = () => {
  const [isMicEnabled, setIsMicEnabled] = React.useState(false);

  const handleEnableMic = () => {
    setIsMicEnabled(true);
  };

  return (
    <div>
      {/* Button to enable microphone input */}
      {!isMicEnabled && (
        <button onClick={handleEnableMic}>Enable Microphone</button>
      )}

      {/* Render the Visualizer component if the microphone is enabled */}
      {isMicEnabled && <Visualizer />}
    </div>
  );
};

export default Play;
