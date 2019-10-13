import React, { Component } from "react";
import { StatusBar, TouchableOpacity, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Physics, CreateBox, TargetHit, CleanBoxes, NewSpinShow, CreateFire, NewFire } from "./systems";
import Matter from "matter-js";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import LocationPulseLoader from "../components/animation/PulseLoader";
import GameDashBoard from "../components/GameDashBoard";
import GameHeaderBar from "../components/GameHeaderBar";
import GameBottomBar from "../components/GameBottomBar";
import { getspinArray } from "./data/levelData";

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

export default class GamePlay extends Component {

  constructor() {
    super();
    this.state = {
      running: true,
      score: 0,
      passPlayers: 0,
      bulletCount: 100,
    };
    this.gameEngine = null;
    this.entities = this.setupWorld();
    this.spinSpeed = 10;
    this.bulletSpeed = 10;
  }

  gameStop = () => {
    this.setState({
      running: false
    });
  };

  resetGame = () => {
    this.gameEngine.swap(this.setupWorld());
    this.setState({
      running: true,
      score: 0
    });
  };
  onEvent = (e) => {
    switch (e.type) {
      case "game-over":
        this.gameStop();
        break;
      case 'goal-mega':
        this.props.backPage("GameMegaRound");
        break;
      case 'goal-niki':
        this.props.backPage("GameNikiRound");
        break;
      case 'goal-user':
        this.setState({ passPlayers: this.state.passPlayers + 1});
        break;
    }
    ///update score
    if(e.type.includes('score')) {
      this.setState({ score: this.state.score + parseInt(e.type.slice(6)) });
    }
  };
  onFireGun() {
    if(this.state.bulletCount<1){
      this.gameStop();
      //this.props.navigation.goBack(null);
    } else {
      this.setState({ bulletCount: this.state.bulletCount - 1 });
      NewFire(this.bulletSpeed);
    }
  }
  gameStart() {
    setInterval(() => {
      const random = (Math.floor(Math.random() * 10000) % wp("70")) + wp("10");
      const targetPosition = { x: random, y: hp("90") };
      const spinInfoData = getspinArray()[Math.floor(Math.random() * 10) % 4];
      NewSpinShow(targetPosition, spinInfoData, this.spinSpeed);
    }, 2000);
  }

  componentDidMount() {
    this.gameStart();
  }

  setupWorld = () => {
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

  render() {
    const {score, passPlayers, bulletCount} = this.state;
    return (
      <View style={{
        flex: 1
      }}>
        <GameEngine
          style={{ zIndex: 3 }}
          ref={(ref) => {
            this.gameEngine = ref;
          }}
          onEvent={this.onEvent}
          systems={[Physics, CreateBox, TargetHit, CreateFire, CleanBoxes]}
          running={this.state.running}
          entities={this.entities}>
          <StatusBar hidden={true}/>
        </GameEngine>
        <GameDashBoard addSpinCoin={score} passPlayers={passPlayers}/>
        <GameHeaderBar/>
        <GameBottomBar bulletCount={bulletCount}/>
        <TouchableOpacity
          style={{
            position: 'absolute',
            zIndex: 3,
            right: wp('-2'),
            bottom: wp('-2')
          }}
          onPress={()=>this.onFireGun()}>
          <LocationPulseLoader/>
        </TouchableOpacity>

      </View>
    );
  }
}
