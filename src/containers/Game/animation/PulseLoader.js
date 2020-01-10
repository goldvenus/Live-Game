/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/order */
import React from 'react';
import { View, Image, Easing } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

import Pulse from './Pulse';
import AppMocData from '@share/data/MocData';

export default class LocationPulseLoader extends React.Component {
  static propTypes = {
    interval: PropTypes.number,
    size: PropTypes.number,
    pulseMaxSize: PropTypes.number,
    borderColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    getStyle: PropTypes.any,
    avatar: PropTypes.any,
    avatarBackgroundColor: PropTypes.string,
    pressInValue: PropTypes.number,
    pressDuration: PropTypes.number,
    pressInEasing: PropTypes.any,
    pressOutEasing: PropTypes.any
  };

  static defaultProps = {
    interval: 2000,
    size: 80,
    pulseMaxSize: wp('30'),
    borderColor: '#2EC760',
    backgroundColor: '#2EC76055',
    getStyle: undefined,
    avatar: undefined,
    avatarBackgroundColor: 'white',
    pressInValue: 0.8,
    pressDuration: 100,
    pressInEasing: Easing.in,
    pressOutEasing: Easing.in,
  };

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
    const { interval } = this.props;
    this.setInterval = setInterval(this.addCircle.bind(this), interval);
    this.addCircle();
  }

  addCircle() {
    const { circles } = this.state;
    this.setState({ circles: [...circles, this.counter] });
    this.counter += 1;
  }

  render() {
    const { circles } = this.state;
    const { pulseMaxSize } = this.props;
    return (
      <View style={{
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        {circles.map((circle) => (
          <Pulse
            key={circle}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...this.props}
          />
        ))}
        <Image
          source={AppMocData.game.gameplay.shot.gun.green}
          style={{
            width: pulseMaxSize,
            height: pulseMaxSize,
          }}
        />
      </View>
    );
  }
}
