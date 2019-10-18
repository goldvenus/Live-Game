import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

const RADIUS = 50;

class Target extends PureComponent {

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.position !== prevProps.position) {
  //     console.log(this.props.position)
  //   }
  // }
  render() {
    console.log(this.props)
    const x = this.props.position[0] - RADIUS / 2;
    const y = this.props.position[1] - RADIUS / 2;
    return (
      <View style={[styles.finger, { left: x, top: y }]} />
    );
  }
}

const styles = StyleSheet.create({
  finger: {
    borderColor: "#ccc",
    marginTop: 300,
    borderWidth: 4,
    borderRadius: RADIUS * 2,
    width: RADIUS * 2,
    height: RADIUS * 2,
    backgroundColor: "pink",
    position: "absolute"
  }
});

export { Target };