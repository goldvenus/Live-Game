import React from "react";
import { View } from "react-native";
import CreateTarget from "../components/CreateTarget";
import CreateBullet from "../components/CreateBullet";

const Box = ({ size, body, spinInfoData }) => {
  const width = size[0];
  const height = size[1];
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;
  const angle = body.angle;
  return (
    <View style={{
      left: x,
      top: y,
      position: "absolute",
      zIndex:4,
      width: width,
      height: height,
      marginTop: size[1] / -1.1
    }}>
      <CreateTarget spinInfoData={spinInfoData} angle = {angle}/>
    </View>
  );
};
const Bullet = ({ size, body }) => {
  const width = size[0];
  const height = size[1];
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;
  const angle = body.angle;
  return (
    <View style={{
      left: x,
      top: y,
      position: "absolute",
      zIndex:4,
      width: width,
      height: height,
      marginTop: size[1] / -1.7
    }}>
      <CreateBullet angle = {angle}/>
    </View>
  );
};
export { Box, Bullet };
