import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

export default class Pulse extends React.Component {
  static propTypes = {
    interval: PropTypes.number,
    size: PropTypes.number,
    borderColor: PropTypes.string,
    pulseMaxSize: PropTypes.number,
    backgroundColor: PropTypes.string,
    getStyle: PropTypes.func
  };

  static defaultProps = {
    interval: 0,
    size: 0,
    borderColor: '',
    pulseMaxSize: 0,
    backgroundColor: '',
    getStyle: (() => null)
  };

  constructor(props) {
    super(props);

    this.anim = new Animated.Value(0);
  }

  componentDidMount() {
    const { interval } = this.props;
    Animated.timing(this.anim, {
      toValue: 1,
      duration: interval,
      easing: Easing.in,
    })
      .start();
  }

  render() {
    const {
      size, pulseMaxSize, borderColor, backgroundColor, getStyle,
    } = this.props;

    return (
      <View style={[styles.circleWrapper, {
        width: pulseMaxSize,
        height: pulseMaxSize,
        marginLeft: -pulseMaxSize * 1.6,
        marginTop: -hp('48.9'),
      }]}
      >
        <Animated.View
          style={[styles.circle, {
            borderColor,
            backgroundColor,
            width: this.anim.interpolate({
              inputRange: [0, 1],
              outputRange: [size, pulseMaxSize],
            }),
            height: this.anim.interpolate({
              inputRange: [0, 1],
              outputRange: [size, pulseMaxSize],
            }),
            borderRadius: pulseMaxSize / 2,
            opacity: this.anim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          }, getStyle && getStyle(this.anim)]}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  circleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: wp('50'),
    top: hp('50'),
  },
  circle: {
    borderWidth: 4 * StyleSheet.hairlineWidth,
  },
});
