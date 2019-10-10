import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import { heightPercentageToDP as hp, widthPercentageToDP as wp }
  from "react-native-responsive-screen";

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
          <Image source={require('../../../../../../assets/images/game/target_50.png')}
             style={{
               width: wp('30'),
               height: wp('30') }}/>
          <Text style={{
            position: 'absolute',
            paddingLeft: wp('7'),
            marginTop: wp('-2'),
            fontSize: wp('17'),
            fontFamily: 'Antonio-Bold',
            color: 'white'}}>50</Text>
        </Svg>
      </View>
    );
  }
}

export { Box };
