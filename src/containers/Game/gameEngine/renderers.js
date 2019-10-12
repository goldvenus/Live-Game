import React, { Component } from "react";
import { View } from "react-native";
import Svg from "react-native-svg";
import CreateTarget from "../components/CreateTarget";

const Box = ({size, body}) => (
    <View style={{
      left: body.position.x - size[0] / 2,
      top: body.position.y - size[1] / 2,
      width: size[0],
      height: size[1],
      marginLeft: size[0] * -1,
      marginTop: size[1] / -4,
      transform: [{ rotate: body.angle + "rad" }]
    }}>
      <Svg height="200" width="200">
        <CreateTarget bodyHeight={35} bSize={23} tFontSize={14} tY={-1} tnumber="50"/>
      </Svg>
    </View>
)
export { Box };
