import React from "react";
import { StatusBar, TouchableOpacity, View, Alert, Text } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Physics, NewSpinShow, NewFire } from "./systems";
import Matter from "matter-js";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import LocationPulseLoader from "../animation/PulseLoader";
import GameDashBoard from "../components/GamePlayDashboard";
import GamePlayBottomBar from "../components/GamePlayBottomBar";
import { getspinArray } from "../../../share/data/gamePlay/FlareArray";
import { GetFlareBox } from "../animation/GetFlareAnimation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addSpinCoinsScore,
  addSpin,
  addSpinList,
  resetAnimation,
  addWaveScore,
  addPassScore, setFlareToken
} from "../../../redux/action/game";
import { ADD_APPLE_SPIN, ADD_LOCK_SPIN, ADD_MEGA_SPIN, ADD_NIKE_SPIN } from "../../../redux/action/type";
import GetBubbleLeftScreen from "../page/GetBubbleLeftScreen";
import { leftSpinList } from "../../../share/data/gamePlay/LeftFlareData";
import GameHeaderBar from "../components/GameHeaderBar";
import GamePlayHeader from "../components/GamePlayHeader";
import {randomNumber} from "../../../share/engine";
import {soundPlay} from "../../../share/soundPlay";
import {soundPlayNames} from "../../../share/soundPlay/soundName";

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

let pressedTime = 0;
let firingGun = false;
let oneFireShotTimer = null;
let doubleFireReady = false;
let doubleFireReadyTimer = null;
let burstFireTimer = null;
let burstFireTemp = false;
let proImageTargetMark = 0;

function GameEnginePlay({addWaveScore, gameScore, backPage, setFlareToken, addSpinCoinsScore,addSpin, addSpinList, resetAnimation, getSpinListItems }) {
  const [running, setRunning] = React.useState(true);
  const [bulletCount, setBulletCount] = React.useState(100);
  const [gamePlayTime, setGamePlayTime] = React.useState(100);
  const [gamePauseState, setGamePauseState] = React.useState(false);
  const [gameHitData, setGameHitData] = React.useState({});
  const [gameStartInternal, setGameStartInternal] = React.useState(null);

  let gameEngine = null;
  let spinSpeed = 4;
  let bulletSpeed = 8;
  let targetShowTime = 3;
  const multiShotSpeed = 80;

  React.useEffect(() => {
    addWaveScore(-1* gameScore.waveScore);
    gameStart();
    return () => {
      clearInterval(gameStartInternal);
      gameStop();
    };
  }, []);

  React.useEffect(() => {
    if (gamePlayTime < 1) {
      let getSpinCoin = 0;
      for (let i=0; i<= gameScore.playerPassScore; i++) {
        getSpinCoin += i;
        if(i===12)
          break;
      }
      setFlareToken(Math.floor((getSpinCoin+gameScore.spinCoins)/25));
      addSpinCoinsScore(getSpinCoin);
      clearInterval(gameStartInternal);
      gameStop();
    }
    if (gamePlayTime % targetShowTime === 0 && (gamePlayTime > 3)) {
      const random = (randomNumber(0, 10000) % wp("70")) + wp("10");
      const targetPosition = { x: random, y: hp("90") };
      const spinInfoData = getspinArray()[randomNumber(2, 4)];
      NewSpinShow(targetPosition, spinInfoData, spinSpeed);
    }
  }, [gamePlayTime]);

  const gameStop = () => {
    setRunning(false);
    clearInterval(gameStartInternal);
  };

  const gamePause = () => {
    setRunning(false);
    clearInterval(gameStartInternal);
    setGamePauseState(true);
  };

  const onEvent = (e) => {
    if (e.type === "goal-target") {
      setGameHitData(e.data);
      proImageTargetMark = 0;
    }
    switch (e.type) {
      case "game-over":
        gameStop();
        break;
      case "goal-mega":
        //gamePause();
        addSpin(ADD_MEGA_SPIN);
        soundPlay(soundPlayNames.GamePlay.getMegaSpin);
        soundPlay(soundPlayNames.GamePlay.tapClickTarget);
        break;
      case "goal-niki":
        //gamePause();
        soundPlay(soundPlayNames.GamePlay.tapClickTarget);
        resetAnimation();
        addSpinList(leftSpinList[0]);
        addSpin(ADD_NIKE_SPIN);
        break;
      case 'goal-lock':
        soundPlay(soundPlayNames.GamePlay.tapClickTarget);
        resetAnimation();
        addSpinList(leftSpinList[3]);
        addSpin(ADD_LOCK_SPIN);
        break;
      case 'goal-apple':
        soundPlay(soundPlayNames.GamePlay.tapClickTarget);
        resetAnimation();
        addSpinList(leftSpinList[2]);
        addSpin(ADD_APPLE_SPIN);
        break;
      case "goal-user":
        soundPlay(soundPlayNames.GamePlay.tapClickTarget);
        proImageTargetMark = randomNumber(10, 100);
        addWaveScore(proImageTargetMark);
        break;
      case "goal-mega-tap":
        soundPlay(soundPlayNames.GamePlay.getMegaSpin);
        soundPlay(soundPlayNames.GamePlay.fireWorks);
        proImageTargetMark = 1000;
        addSpin(ADD_MEGA_SPIN);
        break;
      case "goal-niki-tap":
        soundPlay(soundPlayNames.GamePlay.fireWorks);
        proImageTargetMark = 1000;
        resetAnimation();
        addSpinList(leftSpinList[0]);
        addSpin(ADD_NIKE_SPIN);
        break;
      case 'goal-lock-tap':
        soundPlay(soundPlayNames.GamePlay.fireWorks);
        proImageTargetMark = 1000;
        resetAnimation();
        addSpinList(leftSpinList[3]);
        addSpin(ADD_LOCK_SPIN);
        break;
      case 'goal-apple-tap':
        soundPlay(soundPlayNames.GamePlay.fireWorks);
        proImageTargetMark = 1000;
        resetAnimation();
        addSpinList(leftSpinList[2]);
        addSpin(ADD_APPLE_SPIN);
        break;
      case "goal-user-tap":
        soundPlay(soundPlayNames.GamePlay.fireWorks);
        proImageTargetMark = 1000 + randomNumber(10, 100);
        addWaveScore(proImageTargetMark-1000);
        break;
      case "no-goal":
        break;
    }
    if (e.type.includes("score")) {
      addWaveScore(parseInt(e.type.slice(6)));
    }
  };

  const onFireGun = () => {
    if (bulletCount > 0) {
      oneShot();
    }
  };

  const oneShot = () => {
    if (bulletCount >= 1) {
      setBulletCount(t => t - 1);
      NewFire(bulletSpeed);
    }
  };

  const onMultiFireGun = (multiNum) => {
    const bullet = bulletCount;
    if (bullet < multiNum) {
      firingGun = true;
      const intervalTime = setInterval(() => {
        oneShot();
      }, multiShotSpeed);
      setTimeout(() => {
        clearInterval(intervalTime);
        firingGun = false;
      }, multiShotSpeed * bullet + 50);
    } else {
      firingGun = true;
      const intervalTime = setInterval(() => {
        oneShot();
      }, multiShotSpeed);
      setTimeout(() => {
        clearInterval(intervalTime);
        firingGun = false;
      }, multiShotSpeed * multiNum + 50);
    }
  };

  const FirePressIn = () => {
    burstFireTimer = setInterval(()=> {
      doubleFireReady = true;
      burstFireTemp = true;
      onMultiFireGun(5);
      addWaveScore(250);
      soundPlay(soundPlayNames.GamePlay.fireMultiShot);
    }, 1500);
    const pressedIntime = new Date().getTime();
    if ((pressedIntime - pressedTime > 500)) doubleFireReady = false;
    if ((pressedIntime - pressedTime < 170) && !firingGun && !doubleFireReady && running) {
      doubleFireReady = true;
      doubleFireReadyTimer = setTimeout(() => {
        firingGun = true;
        doubleFireReady = false;
        clearTimeout(oneFireShotTimer);
        soundPlay(soundPlayNames.GamePlay.fireLongShot);
        onMultiFireGun(3);
        addWaveScore(150);
      }, 180);
    }
    else if (doubleFireReady && (pressedIntime - pressedTime < 300)) {
      clearTimeout(doubleFireReadyTimer);
    }
    pressedTime = pressedIntime;
  };

  const FirePressOut = () => {
    if (!firingGun && running && !burstFireTemp) {
      oneFireShotTimer = setTimeout(() => {
        soundPlay(soundPlayNames.GamePlay.fireShot);
        onFireGun();
        addWaveScore(50);
      }, 220);
    }
    clearInterval(burstFireTimer);
      burstFireTemp = false
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
    const random = Math.floor(Math.random() * 10000) % wp("100");
    const targetPosition = { x: random, y: hp("89") };
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;
    return {
      physics: { engine: engine, world: world },
      targetPosition: targetPosition
    };
  };

  return (
    <View style={{
      flex: 1
    }}>
      <GameEngine
        style={{ zIndex: 3 }}
        ref={(ref) => {
          gameEngine = ref;
        }}
        onEvent={onEvent}
        systems={[Physics]}
        running={running}
        entities={setupWorld()}>
        <StatusBar hidden={true}/>
      </GameEngine>
      {
        gameHitData["size"] &&
        <GetFlareBox size={gameHitData["size"]}
                     body={gameHitData["body"]}
                     spinInfoData={gameHitData["spinInfoData"]}
                     mark={proImageTargetMark}/>
      }
      <GameDashBoard />
      {
        !running && getSpinListItems.length < 1 ? <GamePlayHeader backPage={backPage}/>: <GameHeaderBar/>
      }
      <GamePlayBottomBar bulletCount={bulletCount} gamePlayTime={gamePlayTime}/>
      <TouchableOpacity
        style={{
          position: "absolute",
          zIndex: 3,
          right: wp("-2"),
          bottom: wp("-2")
        }}
        onPressIn={FirePressIn}
        onPressOut={FirePressOut}>
        <LocationPulseLoader stopGame={running}/>
      </TouchableOpacity>
      {
        gamePauseState &&
        <View style={{
          top: 0,
          backgroundColor: "black",
          opacity: 0.5,
          position: "absolute",
          zIndex: 20,
          width: wp("100"),
          height: hp("100"),
        }}>
          <TouchableOpacity onPress={gameStart}
          style={{
            flex: 1,
          }}>
            <View style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row"
            }}>
              <Text style={{
                fontSize: wp("7"),
                color: 'white',
                opacity: 1,
                fontFamily: "Antonio-Bold"
              }}>Touch screen to continue...</Text>
            </View>
          </TouchableOpacity>
        </View>
      }
      <GetBubbleLeftScreen spinInfoData={true} running={running} backPage={backPage}/>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    getSpinListItems: state.game.getSpinListItems,
    gameScore: state.game.score
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({
      addSpinCoinsScore: addSpinCoinsScore,
      addWaveScore: addWaveScore,
      addPassScore: addPassScore,
      addSpin: addSpin,
      addSpinList:addSpinList,
      resetAnimation: resetAnimation,
      setFlareToken: setFlareToken
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameEnginePlay);
