/* ============================================================
   Jouer avec la CCM — effets sonores (Web Audio, sans fichier audio)
   ============================================================ */

const SOUND_KEY = 'ccm-sound';
let soundOn = true;
let audioCtx = null;

function ensureAudio() {
  if (!soundOn) return null;
  try {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      audioCtx = new Ctx();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  } catch (e) {
    return null;
  }
}

function tone(opts) {
  if (!soundOn) return;
  const ctx = ensureAudio();
  if (!ctx) return;
  const freq = opts.freq || 440;
  const dur = opts.dur || 0.15;
  const type = opts.type || 'sine';
  const peak = opts.gain || 0.06;
  const delay = opts.delay || 0;
  const t0 = ctx.currentTime + delay;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (opts.slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, opts.slide), t0 + dur);

  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.03);
}

const sfx = {
  click() { tone({ freq: 520, dur: 0.06, type: 'triangle', gain: 0.03 }); },
  correct() {
    tone({ freq: 660, dur: 0.12, gain: 0.06 });
    tone({ freq: 880, dur: 0.16, gain: 0.055, delay: 0.1 });
  },
  wrong() { tone({ freq: 240, dur: 0.2, type: 'sawtooth', gain: 0.045, slide: 130 }); },
  tick() { tone({ freq: 980, dur: 0.05, type: 'square', gain: 0.025 }); },
  gift() { [523, 659, 784, 1047].forEach((f, i) => tone({ freq: f, dur: 0.22, gain: 0.055, delay: i * 0.09 })); },
  win() { [523, 659, 784, 1047, 1319].forEach((f, i) => tone({ freq: f, dur: 0.3, type: 'triangle', gain: 0.055, delay: i * 0.12 })); },
  duel() {
    tone({ freq: 392, dur: 0.14, type: 'triangle', gain: 0.05 });
    tone({ freq: 587, dur: 0.18, type: 'triangle', gain: 0.05, delay: 0.14 });
  }
};

function updateSoundButtons() {
  document.querySelectorAll('[data-sound]').forEach(btn => {
    btn.textContent = soundOn ? '🔊' : '🔇';
    btn.setAttribute('aria-pressed', soundOn ? 'true' : 'false');
    if (typeof t === 'function') btn.setAttribute('aria-label', t(soundOn ? 'sound.on' : 'sound.off'));
  });
}

function setSound(on) {
  soundOn = !!on;
  try { localStorage.setItem(SOUND_KEY, soundOn ? '1' : '0'); } catch (e) { /* stockage indisponible */ }
  updateSoundButtons();
  if (soundOn) {
    ensureAudio();
    sfx.click();
  }
}

function toggleSound() {
  setSound(!soundOn);
}

function initSound() {
  try {
    const saved = localStorage.getItem(SOUND_KEY);
    if (saved !== null) soundOn = saved === '1';
  } catch (e) { /* stockage indisponible */ }
  updateSoundButtons();
  document.addEventListener('pointerdown', () => ensureAudio(), { once: true });
  document.addEventListener('keydown', () => ensureAudio(), { once: true });
}
