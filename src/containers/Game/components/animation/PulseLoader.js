import React from 'react';
import { View, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import Pulse from './Pulse';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default class LocationPulseLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      circles: []
    };

    this.counter = 1;
    this.setInterval = null;
    this.anim = new Animated.Value(1);
  }

  componentDidMount() {
    this.setCircleInterval();
  }

  setCircleInterval() {
    this.setInterval = setInterval(this.addCircle.bind(this), this.props.interval);
    this.addCircle();
  }

  addCircle() {
    this.setState({ circles: [...this.state.circles, this.counter] });
    this.counter++;
  }

  render() {
    return (
      <View style={{
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: wp('-4'),
        bottom: wp('-4')
      }}>
        {this.state.circles.map((circle) => (
          <Pulse
            key={circle}
            {...this.props}
          />
        ))}
          <Image
            source={require('../../../../../assets/images/game/fire-btn.png')}
            style={{
              width: this.props.pulseMaxSize,
              height: this.props.pulseMaxSize,
            }}
          />
      </View>
    );
  }
}


LocationPulseLoader.defaultProps = {
  interval: 2000,
  size: 100,
  pulseMaxSize: wp('40'),
  avatar: undefined,
  avatarBackgroundColor: 'white',
  pressInValue: 0.8,
  pressDuration: 150,
  pressInEasing: Easing.in,
  pressOutEasing: Easing.in,
  borderColor: '#2EC760',
  backgroundColor: '#2EC76055',
  getStyle: undefined,
};

