/* eslint-disable max-len */
import AppMocData from '../data/MocData';
import { Audio } from 'expo-av';
import { soundPlayNames } from './soundName';

let fireShot;
let fireMultiShot;
let fireLongShot;
let getMegaSpin;
let fireWorks;
let tapClickTarget;
let countDown;

export const soundEffectInit = async () => {
  const { sound: soundObject1 } = await Audio.Sound.createAsync(AppMocData.sound.shotSound, { shouldPlay: false });
  fireShot = soundObject1;
  const { sound: soundObject2 } = await Audio.Sound.createAsync(AppMocData.sound.mutiShotSound, { shouldPlay: false });
  fireMultiShot = soundObject2;
  const { sound: soundObject3 } = await Audio.Sound.createAsync(AppMocData.sound.holdShotSound, { shouldPlay: false });
  fireLongShot = soundObject3;
  const { sound: soundObject4 } = await Audio.Sound.createAsync(AppMocData.sound.megaSpinSound, { shouldPlay: false });
  getMegaSpin = soundObject4;
  const { sound: soundObject5 } = await Audio.Sound.createAsync(AppMocData.sound.fireworks, { shouldPlay: false });
  fireWorks = soundObject5;
  const { sound: soundObject6 } = await Audio.Sound.createAsync(AppMocData.sound.tapClickSound, { shouldPlay: false });
  tapClickTarget = soundObject6;
  const { sound: soundObject7 } = await Audio.Sound.createAsync(AppMocData.sound.countdownSound, { shouldPlay: false });
  countDown = soundObject7;
};

export const soundPlay = async (soundName) => {
  let soundObject = null;
  if (soundName) {
    switch (soundName) {
      case soundPlayNames.GamePlay.fireShot:
        soundObject = fireShot;
        break;
      case soundPlayNames.GamePlay.fireMultiShot:
        soundObject = fireMultiShot;
        break;
      case soundPlayNames.GamePlay.fireLongShot:
        soundObject = fireLongShot;
        break;
      case soundPlayNames.GamePlay.fireWorks:
        soundObject = fireWorks;
        break;
      case soundPlayNames.GamePlay.getMegaSpin:
        soundObject = getMegaSpin;
        break;
      case soundPlayNames.GamePlay.tapClickTarget:
        soundObject = tapClickTarget;
        break;
      case soundPlayNames.GamePlay.countDown:
        soundObject = countDown;
        break;
      default:
        break;
    }
  }
  if (soundObject) {
    try {
      await soundObject.replayAsync();
    // eslint-disable-next-line no-console
    } catch (e) { console.log('soundObject-error', e); }
  }
};
