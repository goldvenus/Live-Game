import React, { Component } from "react";
import { StatusBar, Dimensions } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Physics, CreateBox, MoveBox, CleanBoxes } from "./systems";
import Matter from "matter-js";

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

export default class RigidBodies extends Component {
  constructor() {
    super();
    this.state = {
      targetPosition: {
        x: 0,
        y: 0
      },
      timer: null,
      targetCreate: false

    };
  }

  componentDidMount() {
    //this.CreateTargetObject();
  }

  componentWillUnmount() {
    //clearInterval(this.state.timer);
  }

  CreateTargetObject() {
    let timer = setInterval(this.tick, 3000);
    this.setState({ timer });
  }

  tick = () => {
    const { width, height } = Dimensions.get("window");
    const random = Math.floor(Math.random() * 10000) % width;
    this.setState({
      targetPosition: { x: random, y: height }, targetCreate: true
    });
  };


  render() {
    const { targetPosition, targetCreate } = this.state;
    const { width, height } = Dimensions.get("window");
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

    return (
      <GameEngine
        systems={[Physics, CreateBox, CleanBoxes]}
        entities={{
          physics: { engine: engine, world: world, constraint: constraint, targetPosition: targetPosition, targetCreate:targetCreate}
        }}>
        <StatusBar hidden={true}/>
      </GameEngine>
    );
  }
}
