import {FlareType} from "./FlareType";

const getRandomType = (objectType, range) => {
  return Object.keys(objectType)[RandomNumber(range)];
};
const RandomNumber = (range) => {
  return Math.floor(Math.random() * 100) % (range);
};

export const userListData = [
  {
    userImage: FlareType.spinType.user.user1,
    userFlag: FlareType.flag[getRandomType(FlareType.flag, 2)]
  },
  {
    userImage: FlareType.spinType.user.user2,
    userFlag: FlareType.flag[getRandomType(FlareType.flag, 2)]
  },
  {
    userImage: FlareType.spinType.user.user3,
    userFlag: FlareType.flag[getRandomType(FlareType.flag, 2)]
  },
  {
    userImage: FlareType.spinType.user.user4,
    userFlag: FlareType.flag[getRandomType(FlareType.flag, 2)]
  },
  {
    userImage: FlareType.spinType.user.user5,
    userFlag: FlareType.flag[getRandomType(FlareType.flag, 2)]
  },
  {
    userImage: FlareType.spinType.user.user6,
    userFlag: FlareType.flag[getRandomType(FlareType.flag, 2)]
  },
  {
    userImage: FlareType.spinType.user.user7,
    userFlag: FlareType.flag[getRandomType(FlareType.flag, 2)]
  },
  {
    userImage: FlareType.spinType.user.user8,
    userFlag: FlareType.flag[getRandomType(FlareType.flag, 2)]
  },
];
