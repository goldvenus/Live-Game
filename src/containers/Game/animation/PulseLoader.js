import React from 'react';
import { View, Image, Easing } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import Pulse from './Pulse';
import AppMocData from '../../../share/data/MocData';

export default class LocationPulseLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      circles: [],
    };

    this.counter = 1;
    this.setInterval = null;
  }

  componentDidMount() {
    this.setCircleInterval();
  }

  componentWillUnmount() {
    clearInterval(this.setInterval);
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
      }}
      >
        {this.state.circles.map(circle => (
          <Pulse
            key={circle}
            {...this.props}
          />
        ))}
        <Image
          source={AppMocData.game.gameplay.shot.gun.green}
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
  size: 80,
  pulseMaxSize: wp('30'),
  avatar: undefined,
  avatarBackgroundColor: 'white',
  pressInValue: 0.8,
  pressDuration: 100,
  pressInEasing: Easing.in,
  pressOutEasing: Easing.in,
  borderColor: '#2EC760',
  backgroundColor: '#2EC76055',
  getStyle: undefined,
};

