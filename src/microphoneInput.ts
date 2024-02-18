const audioContext = new AudioContext();
let analyser: AnalyserNode;
let microphoneStream: MediaStreamAudioSourceNode;

export async function initializeMicrophoneInput() {
  try {
    // Request access to the microphone
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Create a source from the microphone stream
    microphoneStream = audioContext.createMediaStreamSource(stream);

    // Create an analyser node
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048; // You can adjust this value as needed

    // Connect the microphone stream to the analyser
    microphoneStream.connect(analyser);

    // Optional: Connect the analyser to the destination to hear the audio
    // analyser.connect(audioContext.destination);

  } catch (err) {
    console.error('Error initializing microphone input:', err);
    throw err; // Rethrow or handle as needed
  }
}

export function getAnalyserNode() {
  if (!analyser) {
    throw new Error('Analyser node is not initialized. Call initializeMicrophoneInput first.');
  }
  return analyser;
}

// Export the audioContext
export { audioContext };
