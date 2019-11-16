import { FlareType } from "./FlareType";
import {randomNumber} from "../../engine/index";
import {userListData} from "./UserListData";

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
      userType: FlareType.spinType.user.user1,
      spinNumber: randomNumber(1, 50),
      spinColor: FlareType.spinColor[getRandomType(FlareType.spinColor, 2)],
      shadowColor: FlareType.shadowColor.white,
      spinSize: FlareType.spinSize.small,
      spinTextSize: FlareType.spinTextSize.normal
    },
    {
      spinType: FlareType.spinType.ellipse,
      megaType: FlareType.spinType.mega.apple,
      userType: FlareType.spinType.user.user1,
      spinNumber: randomNumber(1, 50),
      spinColor: FlareType.spinColor[getRandomType(FlareType.spinColor, 4)],
      shadowColor: FlareType.shadowColor.white,
      spinSize: FlareType.spinSize.normal,
      spinTextSize: FlareType.spinTextSize.small
    },
    {
      spinType: FlareType.spinType.ellipse,
      megaType: FlareType.spinType.mega[getRandomType(FlareType.spinType.mega, 4)],
      userType: FlareType.spinType.user.user1,
      spinNumber: 0,
      spinColor: FlareType.spinColor[getRandomType(FlareType.flareOrbsColor, 3)],
      shadowColor: FlareType.shadowColor.white,
      spinSize: FlareType.spinSize[getRandomType(FlareType.spinSize, 3)],
      spinTextSize: FlareType.spinTextSize.small
    },
    {
      spinType: FlareType.spinType.ellipse,
      megaType: FlareType.spinType.mega.apple,
      userType: userListData[randomNumber(0, 9)],
      spinNumber: -1,
      spinColor: FlareType.spinColor.blue,
      shadowColor: FlareType.shadowColor.white,
      spinSize: FlareType.spinSize[getRandomType(FlareType.spinSize, 2)],
      spinTextSize: FlareType.spinTextSize.small
    },
    {
      spinType: FlareType.spinType.survey,
      megaType: FlareType.spinType.mega.lock,
      userType: FlareType.spinType.user.user1,
      spinNumber: 0,
      spinColor: FlareType.surveyType[getRandomType(FlareType.surveyType, 2)],
      shadowColor: FlareType.shadowColor.white,
      spinSize: FlareType.spinSize.big,
      spinTextSize: FlareType.spinTextSize.small
    },
  ];
};
