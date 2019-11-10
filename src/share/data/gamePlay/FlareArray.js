import { FlareType } from "./FlareType";
import {randomNumber} from "../../engine/index";

const getRandomType = (objectType, range) => {
  return Object.keys(objectType)[RandomNumber(range)];
};
const RandomNumber = (range) => {
  return Math.floor(Math.random() * 100) % (range);
};

export const getspinArray = () => {
  return [
    {
      spinType: FlareType.spinType.triangle,
      megaType: FlareType.spinType.mega.apple,
      userType: FlareType.spinType.user.woman,
      spinNumber: randomNumber(1, 50),
      spinColor: FlareType.spinColor[getRandomType(FlareType.spinColor, 2)],
      shadowColor: FlareType.shadowColor.white,
      spinSize: FlareType.spinSize.small,
      spinTextSize: FlareType.spinTextSize.normal
    },
    {
      spinType: FlareType.spinType.ellipse,
      megaType: FlareType.spinType.mega.apple,
      userType: FlareType.spinType.user.woman,
      spinNumber: randomNumber(1, 50),
      spinColor: FlareType.spinColor[getRandomType(FlareType.spinColor, 4)],
      shadowColor: FlareType.shadowColor.white,
      spinSize: FlareType.spinSize.normal,
      spinTextSize: FlareType.spinTextSize.small
    },
    {
      spinType: FlareType.spinType.ellipse,
      megaType: FlareType.spinType.mega[getRandomType(FlareType.spinType.mega, 4)],
      userType: FlareType.spinType.user.woman,
      spinNumber: 0,
      spinColor: FlareType.spinColor[getRandomType(FlareType.flareOrbsColor, 4)],
      shadowColor: FlareType.shadowColor.white,
      spinSize: FlareType.spinSize[getRandomType(FlareType.spinSize, 3)],
      spinTextSize: FlareType.spinTextSize.small
    },
    {
      spinType: FlareType.spinType.ellipse,
      megaType: FlareType.spinType.mega.apple,
      userType: FlareType.spinType.user[getRandomType(FlareType.spinType.user, 2)],
      spinNumber: -1,
      spinColor: FlareType.spinColor[getRandomType(FlareType.profileOrbsColor, 5)],
      shadowColor: FlareType.shadowColor.white,
      spinSize: FlareType.spinSize[getRandomType(FlareType.spinSize, 3)],
      spinTextSize: FlareType.spinTextSize.small
    }
  ];
};
