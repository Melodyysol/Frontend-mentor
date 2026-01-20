const audioCtx = new (window.AudioContext || window.webkitAudioContent);

export function clickSound(freq = 800, duration = 0.05) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.value = freq;
  osc.type = 'square';

  gain.gain.value = 0.1;

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start()
  osc.stop(audioCtx.currentTime + duration)
}