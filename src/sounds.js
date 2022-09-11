import { Howl } from "howler";

import keySoundWebm from "./assets/sounds/key.webm";
import keySoundMp3 from "./assets/sounds/key.mp3";

import winSoundWebm from "./assets/sounds/win.webm";
import winSoundMp3 from "./assets/sounds/win.mp3";

export const SOUND_KEY = "soundKey";
export const SOUND_WIN = "soundWin";

export const soundMap = {
  [SOUND_KEY]: [keySoundWebm, keySoundMp3],
  [SOUND_WIN]: [winSoundWebm, winSoundMp3],
};

export const volumeMap = {
  [SOUND_KEY]: 0.75,
  [SOUND_WIN]: 0.75,
};

const loadedSounds = {};
let disabled = false;

export function loadSounds() {
  for (let soundKey in soundMap) {
    const src = soundMap[soundKey];
    const volume = volumeMap[soundKey] || 1;
    loadSound(soundKey, { src, volume });
  }
}

export function loadSound(soundKey, options = {}) {
  loadedSounds[soundKey] = new Howl(options);
}

export async function playSound(soundKey) {
  if (disabled) {
    return;
  }
  loadedSounds[soundKey].play();
}

export function soundsEnabled(enabled) {
  disabled = !enabled;
}
