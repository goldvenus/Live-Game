import React from "react";
import { StatusBar, TouchableOpacity, View, Alert, Text } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Physics, NewSpinShow, NewFire } from "./systems";
import Matter from "matter-js";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import LocationPulseLoader from "../components/animation/PulseLoader";
import GameDashBoard from "../components/GameDashBoard";
import GameBottomBar from "../components/GameBottomBar";
import { getspinArray } from "./data/levelData";
import { GetFlareBox } from "../components/animation/GetFlareAnimation";
import Images from "../../../../MocData";
import { Audio } from "expo-av";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addFlareScore, addSpin, addSpinList, setFlareToken, setMegaToken } from "../../../redux/action/game";
import { ADD_APPLE_SPIN, ADD_LOCK_SPIN, ADD_MEGA_SPIN, ADD_NIKE_SPIN } from "../../../redux/action/type";
import GetBubbleLeftScreen from "../page/GetBubbleLeftScreen";
import { leftSpinList } from "./data/LeftSpinListData";
import GameHeaderBar from "../components/GameHeaderBar";

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

const useVariable = initialValue => {
  const ref = React.useRef([
    initialValue,
    param => {
      ref.current[0] =
        typeof param === "function" ? param(ref.current[0]) : param;
    }
  ]);
  return ref.current;
};

let pressedTime = 0;
let firingGun = false;
let oneFireshotTimer = null;
let endGameTimer = null;
let doublefireReady = false;
let doublefireReadyTimer = null;
let burstFireTimer = null;
let burstFireTemp = false;

function GamePlay({ backPage, addFlareScore, setMegaToken, setFlareToken, addSpin, addSpinList }) {
  const [running, setRunning] = React.useState(true);
  const [passPlayers, setpassPlayers] = React.useState(0);
  const [bulletCount, setbulletCount] = React.useState(100);
  const [gamePlayTime, setGamePlayTime] = React.useState(100);
  const [gamePauseState, setGamePauseState] = React.useState(false);
  const [gameHitData, setGameHitData] = React.useState({});
  const [gameStartInternal, setGameStartInternal] = React.useState(null);
  const [shotSoundObjectSingle, setShotSoundObjectSingle] = useVariable(null);
  const [shotSoundObjectFive, setShotSoundObjectFive] = useVariable(null);
  const [shotSoundObjectTen, setShotSoundObjectTen] = useVariable(null);

  let gameEngine = null;
  let spinSpeed = 4;
  let bulletSpeed = 8;
  let targetShowTime = 3;
  const multiShotSpeed = 80;


  React.useEffect(() => {
    gameStart();
    soundEffectInit();
    setMegaToken(1);
    setFlareToken(2);
    return () => {
      clearInterval(gameStartInternal);
      gameStop();
    };
  }, []);

  React.useEffect(() => {
    if (gamePlayTime < 1) {
      clearInterval(gameStartInternal);
      gameStop();
      //ShowAlertDialog();
    }
    if (gamePlayTime % targetShowTime === 0 && (gamePlayTime > 3)) {
      const random = (Math.floor(Math.random() * 10000) % wp("70")) + wp("10");
      const targetPosition = { x: random, y: hp("90") };
      const spinInfoData = getspinArray()[Math.floor(Math.random() * 10) % 4];
      NewSpinShow(targetPosition, spinInfoData, spinSpeed);
    }
  }, [gamePlayTime]);

  const gameStop = () => {
    setRunning(false);
    clearInterval(gameStartInternal);
    //gameStartInternal
  };

  const gamePause = () => {
    setRunning(false);
    clearInterval(gameStartInternal);
    setGamePauseState(true);
  };
  /*End Game Dialog*/
  const ShowAlertDialog = (time) => {
    if (!endGameTimer)
      endGameTimer = setTimeout(() => {
        gameStop();
        Alert.alert(
          "Game Over",
          "Click OK to restart the game",
          [
            {
              text: "OK", onPress: () => {
                backPage("GameJoin");
              }
            }
          ],
          { cancelable: false }
        );
        endGameTimer = null;
      }, time);
  };

  const onEvent = (e) => {
    if (e.type === "goal-target") {
      setGameHitData(e.data);
    }
    switch (e.type) {
      case "game-over":
        gameStop();
        break;
      case "goal-mega":
        //gamePause();
        addSpin(ADD_MEGA_SPIN);
        addSpinList(leftSpinList[1]);
        //backPage("GameMegaRound");
        break;
      case "goal-niki":
        //gamePause();
        addSpinList(leftSpinList[0]);
        addSpin(ADD_NIKE_SPIN);
        //backPage("GameNikiRound");
        break;
      case 'goal-lock':
        addSpinList(leftSpinList[3]);
        addSpin(ADD_LOCK_SPIN);
        break;
      case 'goal-apple':
        addSpinList(leftSpinList[2]);
        addSpin(ADD_APPLE_SPIN);
        break;
      case "goal-user":
        setpassPlayers(passPlayers + 1);
        break;
    }
    if (e.type.includes("score")) {
      addFlareScore(parseInt(e.type.slice(6)));
    }
  };

  const onFireGun = () => {
    if (bulletCount > 0) {
      oneShot();
    }
  };

  const oneShot = () => {
    if (bulletCount >= 1) {
      setbulletCount(t => t - 1);
      NewFire(bulletSpeed);
    }
  };

  const onMultiFireGun = (multiNum) => {
    const bullet = bulletCount;
    if (bullet < multiNum) {
      firingGun = true;
      const intervalTime = setInterval(() => {
        oneShot();
        //ShowAlertDialog(5000);
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
      doublefireReady = true;
      burstFireTemp = true;
      onMultiFireGun(5);
      soundEffectPlay(shotSoundObjectFive);
    }, 1500);
    const pressedIntime = new Date().getTime();
    if ((pressedIntime - pressedTime > 500)) doublefireReady = false;
    if ((pressedIntime - pressedTime < 170) && !firingGun && !doublefireReady && running) {
      doublefireReady = true;
      doublefireReadyTimer = setTimeout(() => {
        firingGun = true;
        doublefireReady = false;
        clearTimeout(oneFireshotTimer);
        soundEffectPlay(shotSoundObjectTen);
        onMultiFireGun(9);
      }, 180);
    }
    else if (doublefireReady && (pressedIntime - pressedTime < 300)) {
      clearTimeout(doublefireReadyTimer);
    }
    pressedTime = pressedIntime;
  };

  const FirePressOut = () => {
    const currentTime = new Date().getTime();
    if (!firingGun && running && !burstFireTemp) {
      // if (currentTime - pressedTime > 1000) {
      //   firingGun = true;
      //   soundEffectPlay(shotSoundObjectFive);
      //   onMultiFireGun(5);
      // }
      oneFireshotTimer = setTimeout(() => {
        soundEffectPlay(shotSoundObjectSingle);
        onFireGun();
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


  /* Sound Effect */
  const soundEffectInit = async () => {
    try {
      const { sound: soundObjectSingle } = await Audio.Sound.createAsync(Images.sound.shotSound, { shouldPlay: false });
      setShotSoundObjectSingle(soundObjectSingle);
      const { sound: soundObjectFive } = await Audio.Sound.createAsync(Images.sound.mutiShotSound, { shouldPlay: false });
      setShotSoundObjectFive(soundObjectFive);
      const { sound: soundObjectTem } = await Audio.Sound.createAsync(Images.sound.holdShotSound, { shouldPlay: false });
      setShotSoundObjectTen(soundObjectTem);
    } catch (error) {
    }
  };

  const soundEffectPlay = async (soundObject) => {
    if (soundObject) {
      try {
        await soundObject.replayAsync();
      } catch (e) {
      }
    }
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
        <GetFlareBox size={gameHitData["size"]} body={gameHitData["body"]} spinInfoData={gameHitData["spinInfoData"]}/>
      }
      <GameDashBoard passPlayers={passPlayers}/>
      <GameHeaderBar/>
      <GameBottomBar bulletCount={bulletCount} gamePlayTime={gamePlayTime}/>
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
    getSpinListItems: state.game.getSpinListItems
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({
      addFlareScore: addFlareScore,
      setFlareToken: setFlareToken,
      setMegaToken: setMegaToken,
      addSpin: addSpin,
      addSpinList:addSpinList
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePlay);
