/**
 * Generates an elegant, crystal birthday chime using the Web Audio API.
 * No external audio files or dependencies required.
 */
let audioCtx: AudioContext | null = null;

export function playCelebrationChime(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    // Harmonic celebratory chord frequencies (C6, E6, G6, B6, C7 sparkles)
    const notes = [1046.5, 1318.51, 1567.98, 1975.53, 2093.0];

    notes.forEach((freq, index) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gain.gain.setValueAtTime(0, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.08, now + index * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 1.25);
    });
  } catch (e) {
    // Graceful fallback if audio is not permitted
  }
}
