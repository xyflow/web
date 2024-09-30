import React, { useCallback, useState } from 'react';

const ctx = new AudioContext();
const osc = ctx.createOscillator();
const amp = ctx.createGain();

ctx.suspend();

osc.connect(amp);
amp.connect(ctx.destination);

osc.start();

export default function App() {
  const [running, isRunning] = useState(ctx.state === 'running');
  const updateAudio = useCallback((e) => {
    const freq = (e.clientX / window.innerWidth) * 1000;
    const gain = 1 - e.clientY / window.innerHeight;

    osc.frequency.value = freq;
    amp.gain.value = gain;
  });

  const toggleDSP = useCallback(() => {
    if (ctx.state === 'suspended') {
      ctx.resume().then(() => isRunning(true));
    } else {
      ctx.suspend().then(() => isRunning(false));
    }
  });

  return (
    <main onMouseMove={updateAudio}>
      <button onClick={toggleDSP}>{running ? '🔊' : '🔇'}</button>
    </main>
  );
}
