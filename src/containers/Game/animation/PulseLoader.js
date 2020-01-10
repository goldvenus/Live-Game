/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/order */
import React from 'react';
import { View, Image } from 'react-native';
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
    getStyle: PropTypes.any
  };

  static defaultProps = {
    interval: 2000,
    size: 80,
    pulseMaxSize: wp('30'),
    borderColor: '#2EC760',
    backgroundColor: '#2EC76055',
    getStyle: undefined,
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
    const { pulseMaxSize, interval, size, borderColor, backgroundColor, getStyle } = this.props;
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
            interval={interval}
            size={size}
            borderColor={borderColor}
            backgroundColor={backgroundColor}
            getStyle={getStyle}
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
