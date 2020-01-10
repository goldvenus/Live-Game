import { FlareType } from './FlareType';

const getRandomType = (objectType, range) => Object.keys(objectType)[RandomNumber(range)];
const RandomNumber = (range) => Math.floor(Math.random() * 100) % (range);

export const userListData = [
  {
    userImage: FlareType.spinType.user.user1,
    userFlag: FlareType.flag[getRandomType(FlareType.flag, 2)],
    userColor: FlareType.profileOrbsColor.pink,
  },
  {
    userImage: FlareType.spinType.user.user2,
    userFlag: FlareType.flag[getRandomType(FlareType.flag, 2)],
    userColor: FlareType.profileOrbsColor.purple,
  },
  {
    userImage: FlareType.spinType.user.user3,
    userFlag: FlareType.flag[getRandomType(FlareType.flag, 2)],
    userColor: FlareType.profileOrbsColor.amber,
  },
  {
    userImage: FlareType.spinType.user.user4,
    userFlag: FlareType.flag[getRandomType(FlareType.flag, 2)],
    userColor: FlareType.profileOrbsColor.green,
  },
  {
    userImage: FlareType.spinType.user.user5,
    userFlag: FlareType.flag[getRandomType(FlareType.flag, 2)],
    userColor: FlareType.profileOrbsColor.amber,
  },
  {
    userImage: FlareType.spinType.user.user6,
    userFlag: FlareType.flag[getRandomType(FlareType.flag, 2)],
    userColor: FlareType.profileOrbsColor.purple,
  },
  {
    userImage: FlareType.spinType.user.user7,
    userFlag: FlareType.flag[getRandomType(FlareType.flag, 2)],
    userColor: FlareType.profileOrbsColor.blue,
  },
  {
    userImage: FlareType.spinType.user.user8,
    userFlag: FlareType.flag[getRandomType(FlareType.flag, 2)],
    userColor: FlareType.profileOrbsColor.blue,
  },
  {
    userImage: FlareType.spinType.user.user9,
    userFlag: FlareType.flag[getRandomType(FlareType.flag, 2)],
    userColor: FlareType.profileOrbsColor.green,
  },
];
