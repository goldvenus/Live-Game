import React, { Component } from "react";
import { View } from "react-native";
import Svg from "react-native-svg";
import CreateTarget from "../../../components/CreateTarget";

class Box extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    const angle = this.props.body.angle;

    return (
      <View style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        transform: [{ rotate: angle + "rad" }]}}>
        <Svg height="200" width="200">
          <CreateTarget bodyHeight={35} bSize = {23} tFontSize={14} tY={-1} tnumber="50"/>
        </Svg>
      </View>
    );
  }
}

export { Box };
