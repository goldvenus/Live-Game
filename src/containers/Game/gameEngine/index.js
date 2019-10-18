import React from "react";
import { StatusBar, TouchableOpacity, View, Alert } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Physics, CreateBox, TargetHit, CleanBoxes, NewSpinShow, CreateFire, NewFire } from "./systems";
import Matter from "matter-js";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import LocationPulseLoader from "../components/animation/PulseLoader";
import GameDashBoard from "../components/GameDashBoard";
import GameHeaderBar from "../components/GameHeaderBar";
import GameBottomBar from "../components/GameBottomBar";
import { getspinArray } from "./data/levelData";
import { GetFlareBox } from "../components/animation/GetFlareAnimation";
import Images from "../../../../MocData";
import { Audio } from "expo-av";

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

export default function GamePlay({ backPage }) {
  const [running, setRunning] = React.useState(true);
  const [score, setScore] = React.useState(0);
  const [passPlayers, setpassPlayers] = React.useState(0);
  const [bulletCount, setbulletCount] = React.useState(100);
  const [gamePlayTime, setGamePlayTime] = React.useState(100);
  const [gameHitData, setGameHitData] = React.useState({});
  const [gameStartInternal, setGameStartInternal] = React.useState(null);
  const [shotSoundObjectSingle, setShotSoundObjectSingle] = useVariable(null);
  const [shotSoundObjectFive, setShotSoundObjectFive] = useVariable(null);
  const [shotSoundObjectTen, setShotSoundObjectTen] = useVariable(null);

  let gameEngine = null;
  let spinSpeed = 5;
  let bulletSpeed = 10;
  let targetShowTime = 3;
  const multiShotSpeed = 300;


  React.useEffect(() => {
    gameStart();
    soundEffectInit();
    return () => {
      clearInterval(gameStartInternal);
      gameStop();
    };
  }, []);

  React.useEffect(() => {
    if (gamePlayTime < 1) {
      clearInterval(gameStartInternal);
      ShowAlertDialog();
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

  /*End Game Dialog*/
  const ShowAlertDialog = (time) => {
    if (!endGameTimer)
      endGameTimer = setTimeout(() => {
        gameStop();
        Alert.alert(
          "Game Over",
          "Click OK to restart the game",
          [
            { text: "OK", onPress: () => {
              backPage("GameJoin");
              }
            }
          ],
          { cancelable: false }
        );
        endGameTimer = null;
      }, time);
  };


  const resetGame = () => {
    gameEngine.swap(setupWorld());
    setRunning(true);
    setScore(0);
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
        gameStop();
        backPage("GameMegaRound");
        break;
      case "goal-niki":
        gameStop();
        backPage("GameNikiRound");
        break;
      case "goal-user":
        setpassPlayers(passPlayers + 1);
        break;
    }
    ///update score
    if (e.type.includes("score")) {
      setScore(score + parseInt(e.type.slice(6)));
    }
  };

  const onFireGun = () => {
    if (bulletCount < 1) {
      ShowAlertDialog(10);
      //gameStop();
    } else {
      //soundEffectInit();
      if (bulletCount === 1)
        ShowAlertDialog(1500);
      oneShot();
    }
  };

  const oneShot=()=> {
    if(bulletCount >=1) {
      setbulletCount(t => t - 1);
      NewFire(bulletSpeed);
    }
  }

  const onMultiFireGun = (multiNum) => {
    const bullet = bulletCount;
    if (bulletCount < 1) {
      ShowAlertDialog(10);
      //gameStop();
    }
    else if (bullet < multiNum) {
      firingGun = true;
      const intervalTime = setInterval(() => {
        oneShot();
        // setbulletCount(0);
        ShowAlertDialog(5000);
      }, multiShotSpeed);
      setTimeout(() => {
        clearInterval(intervalTime);
        firingGun = false;
      }, multiShotSpeed * bullet + 100);
    } else {
      firingGun = true;
      const intervalTime = setInterval(() => {
        //NewFire(bulletSpeed);
        oneShot();
        //setbulletCount(bulletCount - multiNum);
      }, multiShotSpeed);
      setTimeout(() => {
        clearInterval(intervalTime);
        firingGun = false;
      }, multiShotSpeed * multiNum + 100);
    }
  };

  const FirePressIn = () => {
    const pressedIntime = new Date().getTime();
    if ((pressedIntime - pressedTime > 500)) doublefireReady = false;
    if ((pressedIntime - pressedTime < 200) && !firingGun && !doublefireReady) {
      doublefireReady = true;
      doublefireReadyTimer = setTimeout(()=> {
        firingGun = true;
        doublefireReady=false;
        clearTimeout(oneFireshotTimer);
        soundEffectPlay(shotSoundObjectTen);
        onMultiFireGun(9);
      }, 250);
    }
    else if(doublefireReady && (pressedIntime - pressedTime < 300)) {
      console.log('3times');
      clearTimeout(doublefireReadyTimer);
    }
    pressedTime = pressedIntime;
  };

  const FirePressOut = () => {
    const currentTime = new Date().getTime();
    if (!firingGun) {
      if (currentTime - pressedTime > 1000) {
        firingGun = true;
        soundEffectPlay(shotSoundObjectFive);
        onMultiFireGun(5);
      } else {
        oneFireshotTimer = setTimeout(() => {
          soundEffectPlay(shotSoundObjectSingle);
          onFireGun();
        }, 100);
      }
    }
  };
  const gameStart = () => {
    const id = setInterval(() => {
      setGamePlayTime((t) => t - 1);
    }, 1000);
    setGameStartInternal(id);
  };

  const setupWorld = () => {
    const random = Math.floor(Math.random() * 10000) % wp("100");
    const targetPosition = { x: random, y: hp("89") };
    const width = wp("100");
    const height = hp("100");
    const boxSize = Math.trunc(Math.max(width, height) * 0.075);

    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;
    const body = Matter.Bodies.rectangle(width / 2, -1000, boxSize, boxSize, { frictionAir: 0.021 });
    const floor = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true });
    const constraint = Matter.Constraint.create({
      label: "Drag Constraint",
      pointA: { x: 0, y: 0 },
      pointB: { x: 0, y: 0 },
      length: 0.01,
      stiffness: 0.1,
      angularStiffness: 1
    });

    Matter.World.add(world, [body, floor]);
    Matter.World.addConstraint(world, constraint);
    return {
      physics: { engine: engine, world: world, constraint: constraint },
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
        systems={[Physics, CreateBox, TargetHit, CreateFire, CleanBoxes]}
        running={running}
        entities={setupWorld()}>
        <StatusBar hidden={true}/>
      </GameEngine>
      {
        gameHitData["size"] &&
        <GetFlareBox size={gameHitData["size"]} body={gameHitData["body"]} spinInfoData={gameHitData["spinInfoData"]}/>
      }
      <GameDashBoard addSpinCoin={score} passPlayers={passPlayers}/>
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
    </View>
  );
}
