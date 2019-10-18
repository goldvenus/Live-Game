import { GameTypes } from "./gameType";

const getRandomType = (objectType, range) => {
  return Object.keys(objectType)[RandomNumber(range)];
};
const RandomNumber = (range) => {
  return Math.floor(Math.random() * 100) % (range);
};

export const getspinArray = () => {
  return [
    {
      spinType: GameTypes.spinType.triangle,
      megaType: GameTypes.spinType.mega.apple,
      userType: GameTypes.spinType.user.woman,
      spinNumber: RandomNumber(50),
      spinColor: GameTypes.spinColor[getRandomType(GameTypes.spinColor, 2)],
      shadowColor: GameTypes.shadowColor.white,
      spinSize: GameTypes.spinSize.small,
      spinTextSize: GameTypes.spinTextSize.normal
    },
    {
      spinType: GameTypes.spinType.ellipse,
      megaType: GameTypes.spinType.mega.apple,
      userType: GameTypes.spinType.user.woman,
      spinNumber: RandomNumber(50),
      spinColor: GameTypes.spinColor[getRandomType(GameTypes.spinColor, 4)],
      shadowColor: GameTypes.shadowColor.white,
      spinSize: GameTypes.spinSize.normal,
      spinTextSize: GameTypes.spinTextSize.small
    },
    {
      spinType: GameTypes.spinType.ellipse,
      megaType: GameTypes.spinType.mega[getRandomType(GameTypes.spinType.mega, 4)],
      userType: GameTypes.spinType.user.woman,
      spinNumber: 0,
      spinColor: GameTypes.spinColor[getRandomType(GameTypes.spinColor, 4)],
      shadowColor: GameTypes.shadowColor.white,
      spinSize: GameTypes.spinSize[getRandomType(GameTypes.spinSize, 3)],
      spinTextSize: GameTypes.spinTextSize.small
    },
    {
      spinType: GameTypes.spinType.ellipse,
      megaType: GameTypes.spinType.mega.apple,
      userType: GameTypes.spinType.user[getRandomType(GameTypes.spinType.user, 2)],
      spinNumber: -1,
      spinColor: GameTypes.spinColor[getRandomType(GameTypes.spinColor, 4)],
      shadowColor: GameTypes.shadowColor.white,
      spinSize: GameTypes.spinSize[getRandomType(GameTypes.spinSize, 3)],
      spinTextSize: GameTypes.spinTextSize.small
    }
  ];
};
