/* eslint-disable no-shadow */
import React from 'react';
import { TouchableOpacity, View, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Matter from 'matter-js';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import LocationPulseLoader from '../animation/PulseLoader';
import GameDashBoard from '../components/GamePlayDashboard';
import GamePlayBottomBar from '../components/GamePlayBottomBar';
import GameEnginePure from './GameEnginePure';
import { GetFlareBox } from '../animation/GetFlareAnimation';
import { NewSpinShow, NewFire } from './systems';
import PropTypes from 'prop-types';
import { ADD_APPLE_SPIN, ADD_LOCK_SPIN, ADD_MEGA_SPIN, ADD_NIKE_SPIN } from '@redux/action/type';
import GetBubbleLeftScreen from '../components/GetBubbleLeftScreen';
import GameHeaderBar from '../components/GameHeaderBar';
import GamePlayHeader from '../components/GamePlayHeader';
import {
  addSpinCoinsScore,
  addSpin,
  addSpinList,
  resetAnimation,
  addWaveScore,
  addPassScore, setFlareToken,
} from '@redux/action/game';
import { randomNumber } from '@share/engine';
import { getspinArray } from '@share/data/gamePlay/FlareArray';
import { soundPlay } from '@share/soundPlay';
import { soundPlayNames } from '@share/soundPlay/soundName';
import { FlareType } from '@share/data/gamePlay/FlareType';
import { leftSpinList } from '@share/data/gamePlay/LeftFlareData';


Matter.Common.isElement = () => false;


const oneFireShotTimer = null;
const doubleFireReadyTimer = null;
const burstFireTimer = null;
let proImageTargetMark = 0;
let getFlareData;
let mBulletCount;
let mFireGunClickCount = 0;
let mBackTimer = null;
let mLongBackTimer = null;

GameEnginePlay.propTypes = {
  addWaveScore: PropTypes.func.isRequired,
  gameScore: PropTypes.object.isRequired,
  backPage: PropTypes.func.isRequired,
  setFlareToken: PropTypes.func.isRequired,
  addSpinCoinsScore: PropTypes.func.isRequired,
  addSpin: PropTypes.func.isRequired,
  addSpinList: PropTypes.func.isRequired,
  resetAnimation: PropTypes.func.isRequired,
  getSpinListItems: PropTypes.array.isRequired
};

function GameEnginePlay(props) {
  const {
    addWaveScore, gameScore, backPage, setFlareToken,
    addSpinCoinsScore, addSpin, addSpinList, resetAnimation,
    getSpinListItems, navigation } = props;

  const [running, setRunning] = React.useState(true);
  const [bulletCount, setBulletCount] = React.useState(100);
  const [gamePlayTime, setGamePlayTime] = React.useState(100);
  const [gamePauseState, setGamePauseState] = React.useState(false);
  const [gameHitData, setGameHitData] = React.useState({});
  const [gameStartInternal, setGameStartInternal] = React.useState(null);

  const spinSpeed = 4;
  const bulletSpeed = 8;
  const targetShowTime = 3;
  const multiShotSpeed = 80;
  React.useEffect(() => {
    addWaveScore(-1 * gameScore.waveScore);
    gameStart();
    return () => {
      clearInterval(gameStartInternal);
      gameStop();
    };
  }, []);

  React.useEffect(() => {
    if (gamePlayTime < 1) {
      let getSpinCoin = 0;
      for (let i = 0; i <= gameScore.playerPassScore; i += 1) {
        getSpinCoin += i;
        if (i === 12) {
          break;
        }
      }
      setFlareToken(Math.floor((getSpinCoin + gameScore.spinCoins) / 25));
      addSpinCoinsScore(getSpinCoin);
      clearInterval(gameStartInternal);
      clearTimer();
      setTimeout(() => {
        gameStop();
      }, 4000);
    }
    // if(gamePlayTime % surveyShowTime === 0 && (gamePlayTime > 3) && gamePlayTime !== 96) {
    //   const random = (randomNumber(0, 10000) % wp("70")) + wp("10");
    //   const targetPosition = {x: random, y: hp("90")};
    //   const spinInfoData = getspinArray()[4];
    //   NewSpinShow(targetPosition, spinInfoData, spinSpeed);
    // } else if
    if (gamePlayTime % targetShowTime === 0 && (gamePlayTime > 0)) {
      const random = (randomNumber(0, 10000) % wp('70')) + wp('10');
      const targetPosition = {
        x: random,
        y: hp('90'),
      };
      const spinInfoData = getspinArray()[randomNumber(2, 5)];
      NewSpinShow(targetPosition, spinInfoData, spinSpeed);
    }
  }, [gamePlayTime]);

  React.useEffect(() => {
    mBulletCount = bulletCount;
  }, [bulletCount]);
  const gameStop = () => {
    setRunning(false);
    clearTimeout(mLongBackTimer);
    clearTimeout(mBackTimer);
    clearInterval(gameStartInternal);
    clearTimer();
  };

  const gamePause = () => {
    setRunning(false);
    clearInterval(gameStartInternal);
    setGamePauseState(true);
  };

  const clearTimer = () => {
    clearTimeout(oneFireShotTimer);
    clearInterval(burstFireTimer);
    clearTimeout(doubleFireReadyTimer);
  };

  const calculatorScore = (spinInfoData) => {
    let resultScore = 0;
    switch (spinInfoData.userType.userColor) {
      case FlareType.profileOrbsColor.green:
        resultScore = 5;
        break;
      case FlareType.profileOrbsColor.blue:
        resultScore = 7;
        break;
      case FlareType.profileOrbsColor.purple:
        resultScore = 10;
        break;
      case FlareType.profileOrbsColor.pink:
        resultScore = 15;
        break;
      case FlareType.profileOrbsColor.amber:
        resultScore = 25;
        break;
      default:
        break;
    }
    return resultScore;
  };

  const glowBallBonusFlare = (spinInfoData) => {
    if (spinInfoData.spinSize === FlareType.spinSize.big) {
      switch (spinInfoData.spinColor) {
        case FlareType.spinColor.amber:
          setBulletCount((t) => t + 5);
          break;
        case FlareType.spinColor.white:
          setBulletCount((t) => t + 3);
          break;
        case FlareType.spinColor.orange:
          setBulletCount((t) => t + 10);
          break;
        case FlareType.spinColor.red:
          setBulletCount((t) => t + 25);
          break;
        default:
          break;
      }
      return true;
    }
    return false;
  };
  const onEvent = (e) => {
    if (e.type === 'goal-target') {
      setGameHitData(e.data);
      if (e.data.spinInfoData) {
        getFlareData = e.data.spinInfoData;
      }
      proImageTargetMark = 0;
    }
    switch (e.type) {
      case 'game-over':
        gameStop();
        break;
      case 'goal-mega':
        // gamePause();
        addSpin(ADD_MEGA_SPIN);
        soundPlay(soundPlayNames.GamePlay.getMegaSpin);
        soundPlay(soundPlayNames.GamePlay.tapClickTarget);
        break;
      case 'goal-survey':
        soundPlay(soundPlayNames.GamePlay.tapClickTarget);
        resetAnimation();
        addSpinList(leftSpinList[4]);
        addSpin(ADD_NIKE_SPIN);
        break;
      case 'goal-niki':
        // gamePause();
        soundPlay(soundPlayNames.GamePlay.tapClickTarget);
        if (!glowBallBonusFlare(getFlareData)) {
          resetAnimation();
          addSpinList(leftSpinList[0]);
          addSpin(ADD_NIKE_SPIN);
        }
        break;
      case 'goal-lock':
        soundPlay(soundPlayNames.GamePlay.tapClickTarget);
        if (!glowBallBonusFlare(getFlareData)) {
          resetAnimation();
          addSpinList(leftSpinList[3]);
          addSpin(ADD_LOCK_SPIN);
        }
        break;
      case 'goal-apple':
        soundPlay(soundPlayNames.GamePlay.tapClickTarget);
        if (!glowBallBonusFlare(getFlareData)) {
          resetAnimation();
          addSpinList(leftSpinList[2]);
          addSpin(ADD_APPLE_SPIN);
        }
        break;
      case 'goal-user':
        soundPlay(soundPlayNames.GamePlay.tapClickTarget);
        proImageTargetMark = calculatorScore(getFlareData); // tap the profile orbs
        addWaveScore(proImageTargetMark);
        break;
      case 'goal-mega-tap':
        soundPlay(soundPlayNames.GamePlay.getMegaSpin);
        soundPlay(soundPlayNames.GamePlay.fireWorks);
        proImageTargetMark = 1000;
        addSpin(ADD_MEGA_SPIN);
        break;
      case 'goal-niki-tap':
        soundPlay(soundPlayNames.GamePlay.fireWorks);
        if (!glowBallBonusFlare(getFlareData)) {
          proImageTargetMark = 1000;
          resetAnimation();
          addSpinList(leftSpinList[0]);
          addSpin(ADD_NIKE_SPIN);
        }
        break;
      case 'goal-lock-tap':
        soundPlay(soundPlayNames.GamePlay.fireWorks);
        if (!glowBallBonusFlare(getFlareData)) {
          proImageTargetMark = 1000;
          resetAnimation();
          addSpinList(leftSpinList[3]);
          addSpin(ADD_LOCK_SPIN);
        }
        break;
      case 'goal-apple-tap':
        soundPlay(soundPlayNames.GamePlay.fireWorks);
        if (!glowBallBonusFlare(getFlareData)) {
          proImageTargetMark = 1000;
          resetAnimation();
          addSpinList(leftSpinList[2]);
          addSpin(ADD_APPLE_SPIN);
        }
        break;
      case 'goal-user-tap':
        soundPlay(soundPlayNames.GamePlay.fireWorks);
        proImageTargetMark = calculatorScore(getFlareData) + 1000;// hit the profile Orbs
        addWaveScore(proImageTargetMark - 1000);
        break;
      case 'no-goal':
        break;
      default:
        break;
    }
    if (e.type.includes('score')) {
      addWaveScore(String.parseInt(e.type.slice(6)));
    }
  };

  const onFireGun = () => {
    if (mBulletCount >= 1) {
      oneShot();
    }
  };

  const oneShot = () => {
    if (mBulletCount >= 1) {
      setBulletCount((t) => t - 1);
      NewFire(bulletSpeed);
    } else {
      clearTimer();
    }
  };
  const onMultiFireGun = (multiNum) => {
    const bullet = mBulletCount;
    if (bullet < multiNum && bullet > 0) {
      const intervalTime = setInterval(() => {
        onFireGun();
      }, multiShotSpeed);
      setTimeout(() => {
        clearInterval(intervalTime);
      }, (multiShotSpeed * bullet) + 50);
    } else if (bullet >= multiNum) {
      const intervalTime = setInterval(() => {
        onFireGun();
      }, multiShotSpeed);
      setTimeout(() => {
        clearInterval(intervalTime);
      }, (multiShotSpeed * multiNum) + 50);
    } else {
      clearTimer();
    }
  };

  const fireOneBulletShot = () => {
    soundPlay(soundPlayNames.GamePlay.fireShot);
    onFireGun();
    addWaveScore(50);
  };

  const fireDoubleBulletShot = () => {
    onMultiFireGun(5);
    addWaveScore(250);
    soundPlay(soundPlayNames.GamePlay.fireMultiShot);
  };

  const fireLongBulletShot = () => {
    mLongBackTimer = setTimeout(() => {
      soundPlay(soundPlayNames.GamePlay.fireLongShot);
      onMultiFireGun(3);
      addWaveScore(150);
      fireLongBulletShot();
    }, 1500);
  };

  const gameStart = () => {
    const id = setInterval(() => {
      setGamePlayTime((t) => t - 1);
    }, 1000);
    setGameStartInternal(id);
    setRunning(true);
    setGamePauseState(false);
  };

  const setupWorld = () => {
    const random = Math.floor(Math.random() * 10000) % wp('100');
    const targetPosition = {
      x: random,
      y: hp('89'),
    };
    const engine = Matter.Engine.create({ enableSleeping: false });
    const { world } = engine;
    return {
      physics: {
        engine,
        world,
      },
      targetPosition,
    };
  };

  return (
    <View style={{
      flex: 1,
    }}
    >

      <GameEnginePure
        style={{ zIndex: 3 }}
        onEvent={onEvent}
        running={running}
        entities={setupWorld()}
      />
      {
        gameHitData.size
        && (
        <GetFlareBox
          size={gameHitData.size}
          body={gameHitData.body}
          spinInfoData={gameHitData.spinInfoData}
          navigation={navigation}
          gamePause={gamePause}
          setGameHitData={setGameHitData}
          mark={proImageTargetMark}
        />
        )
      }
      <GameDashBoard />
      {
        !running && getSpinListItems.length < 1
          ? <GamePlayHeader backPage={backPage} />
          : <GameHeaderBar />
      }
      <GamePlayBottomBar bulletCount={bulletCount} gamePlayTime={gamePlayTime} />
      <TouchableWithoutFeedback
        disabled={!running}
        onLongPress={() => {
        }}
        onPressIn={() => fireLongBulletShot()}
        onPressOut={() => clearTimeout(mLongBackTimer)}
        onPress={() => {
          mFireGunClickCount += 1;
          if (mFireGunClickCount === 2) {
            clearTimeout(mBackTimer);
            fireDoubleBulletShot();
            mFireGunClickCount = 0;
          } else {
            mBackTimer = setTimeout(() => {
              mFireGunClickCount = 0;
              fireOneBulletShot();
            }, 300);
          }
        }}
      >
        <View style={{
          position: 'absolute',
          zIndex: 3,
          right: wp('-2'),
          bottom: wp('-2'),
        }}
        >
          <LocationPulseLoader stopGame={running} />
        </View>
      </TouchableWithoutFeedback>
      {
        gamePauseState
        && (
        <View style={{
          top: 0,
          backgroundColor: 'black',
          opacity: 0.5,
          position: 'absolute',
          zIndex: 20,
          width: wp('100'),
          height: hp('100'),
        }}
        >
          <TouchableOpacity
            onPress={gameStart}
            style={{
              flex: 1,
            }}
          >
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
            >
              <Text style={{
                fontSize: wp('7'),
                color: 'white',
                opacity: 1,
                fontFamily: 'Antonio-Bold',
              }}
              >
Touch screen to continue...
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        )
      }
      <GetBubbleLeftScreen spinInfoData running={running} backPage={backPage} />
    </View>
  );
}

const mapStateToProps = (state) => ({
  getSpinListItems: state.game.getSpinListItems,
  gameScore: state.game.score,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  ...bindActionCreators({
    addSpinCoinsScore,
    addWaveScore,
    addPassScore,
    addSpin,
    addSpinList,
    resetAnimation,
    setFlareToken,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameEnginePlay);
