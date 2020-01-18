/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  StyleSheet,
  View,
  Text as RNText,
  Animated,
  TouchableOpacity,
  Image as RNImage
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as d3Shape from 'd3-shape';
import color from 'randomcolor';
import { snap } from '@popmotion/popcorn';
import Svg, { Path, G, Image } from 'react-native-svg';
import AppMocData from '@share/data/MocData';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GameHeaderBar from '../components/GameHeaderBar';
import { addSpin } from '@redux/action/game';
import Modal from 'react-native-modal';
import { REDUCE_MEGA_SPIN } from '@redux/action/type';
import { randomNumber } from '@share/engine';

const width = wp('100');
const numberOfSegments = 8;
const wheelSize = wp('75');
const oneTurn = 360;
const angleBySegment = oneTurn / numberOfSegments;
const angleOffset = angleBySegment / 2;
const knobFill = color({ hue: 'purple' });

const makeWheel = () => {
  const data = Array.from({ length: numberOfSegments }).fill(1);
  const arcs = d3Shape.pie()(data);

  return arcs.map((arc, index) => {
    const instance = d3Shape
      .arc()
      .padAngle(0.01) // padding arc
      .outerRadius(wp('50'))
      .innerRadius(wp('30'));

    return {
      path: instance(arc),
      color: '#000', // colors[index], // set arc background color
      value: index, // Math.round(Math.random() * 10 + 1) * 200, //[200, 2200]
      centroid: instance.centroid(arc),
    };
  });
};

class MegaSpinWheel extends React.Component {
  static propTypes = {
    spinToken: PropTypes.number,
    addSpin: PropTypes.func.isRequired
  };

  static defaultProps = {
    spinToken: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      enabled: true,
      finished: false,
      winner: null,
      playWheel: false,
    };
  }

  _wheelPaths = makeWheel();

  _angle = new Animated.Value(0);

  angle = 0;

  ImageArray = AppMocData.wheel.flare;

  closeDialog = () => {
    this.setState({ finished: false });
  };

  getRandomDeceleration = () => {
    const ppp = 0.999 + randomNumber(60, 70) / 100000;
    return ppp;
  }

  goWheel() {
    const { spinToken } = this.props;
    const { playWheel } = this.state;

    if (playWheel || spinToken < 1) { return; }
    this.props.addSpin(REDUCE_MEGA_SPIN);
    this.setState({ playWheel: true });
    const wheelSpeed = -2000;
    Animated.decay(this._angle, {
      velocity: wheelSpeed / 1000,
      deceleration: this.getRandomDeceleration(), // 0.999 ~ 0.9999 Random
      useNativeDriver: true,
    }).start(() => {
      this._angle.setValue(this.angle % oneTurn);
      const snapTo = snap(oneTurn / numberOfSegments);
      Animated.timing(this._angle, {
        toValue: snapTo(this.angle),
        duration: 700,
        useNativeDriver: true,
      }).start(() => {
        const winnerIndex = this._getWinnerIndex();
        this.setState({
          enabled: true,
          finished: true,
          playWheel: false,
          winner: this._wheelPaths[winnerIndex].value,
        });
      });
      // do something here;
    });
  }

  backButtonPress() {
    const { navigation } = this.props;
    navigation.goBack(null);
  }

  componentDidMount() {
    this._angle.addListener((event) => {
      if (this.state.enabled) {
        this.setState({
          enabled: false,
          finished: false,
        });
      }
      this.angle = event.value;
    });
  }

  _getWinnerIndex = () => {
    const deg = Math.abs(Math.round(this.angle % oneTurn));
    return Math.floor(deg / angleBySegment);
  };

  render() {
    const { spinToken } = this.props;
    const { finished, winner } = this.state;
    return (
      <View
        style={styles.container}
      >
        <GameHeaderBar />
        <View style={styles.headerTitleSection}>
          <RNText style={styles.headerTopTitle}>MEGA SPINS:</RNText>
          <RNText style={styles.headerTopCount}>{spinToken}</RNText>
        </View>
        <View style={styles.wheelContainer}>
          {this._renderSvgWheel()}
          {/* this.state.finished && this.state.enabled && this._renderWinner() */}
        </View>
        <View style={styles.winnerTextContainer}>
          <RNText style={styles.winnerText}>
            MEGA SPIN NEEDED: 1
          </RNText>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.backButtonPress()}
        >
          <RNImage source={AppMocData.game.icon.arrow} style={styles.backButtonImage} />
        </TouchableOpacity>
        <Modal
          isVisible={finished}
        >
          <View style={{
            width: wp('90'),
            height: hp('20'),
            backgroundColor: '#181818',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            borderRadius: 10,
          }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            >
              <RNText style={{
                fontSize: wp('7'),
                fontFamily: 'Antonio-Bold',
                paddingRight: wp('2'),
                color: 'white',
              }}>
                YOU GOT
              </RNText>
              <RNImage
                source={this.ImageArray[Object.keys(this.ImageArray)[winner]]}
                style={{
                  width: wp('10'),
                  resizeMode: 'contain',
                }}
              />
              <RNText style={{
                fontSize: wp('7'),
                fontFamily: 'Antonio-Bold',
                paddingLeft: wp('2'),
                color: 'white',
              }}>
                SPIN!
              </RNText>
            </View>

            <TouchableOpacity
              onPress={this.closeDialog}
              style={{
                position: 'absolute',
                bottom: 20,
                right: 50,
              }}
            >
              <RNText style={{
                color: '#5C7FFF',
                fontFamily: 'Antonio-Bold',
                fontSize: wp('5'),
              }}>
                OK
              </RNText>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }

  _renderKnob = () => {
    const knobSize = 30;
    // [0, numberOfSegments]
    const YOLO = Animated.modulo(
      Animated.divide(
        Animated.modulo(Animated.subtract(this._angle, angleOffset), oneTurn),
        new Animated.Value(angleBySegment),
      ),
      1,
    );

    return (
      <Animated.View
        style={{
          width: knobSize,
          height: knobSize * 2,
          justifyContent: 'flex-end',
          zIndex: 1,
          transform: [
            {
              rotate: YOLO.interpolate({
                inputRange: [-1, -0.5, -0.0001, 0.0001, 0.5, 1],
                outputRange: [
                  '0deg',
                  '0deg',
                  '35deg',
                  '-35deg',
                  '0deg',
                  '0deg',
                ],
              }),
            },
          ],
        }}
      >
        <Svg
          width={knobSize}
          height={(knobSize * 100) / 57}
          viewBox="0 0 57 100"
          style={{ transform: [{ translateY: 8 }] }}
        >
          <Path
            d="M28.034,0C12.552,0,0,12.552,0,28.034S28.034,100,28.034,100s28.034-56.483,28.034-71.966S43.517,0,28.034,0z   M28.034,40.477c-6.871,0-12.442-5.572-12.442-12.442c0-6.872,5.571-12.442,12.442-12.442c6.872,0,12.442,5.57,12.442,12.442  C40.477,34.905,34.906,40.477,28.034,40.477z"
            fill={knobFill}
          />
        </Svg>
      </Animated.View>
    );
  };

  _renderSvgWheel = () => (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    }}
    >
      {/* this._renderKnob() */}
      <Animated.View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          transform: [
            {
              rotate: this._angle.interpolate({
                inputRange: [-oneTurn, 0, oneTurn],
                outputRange: [`-${oneTurn}deg`, '0deg', `${oneTurn}deg`],
              }),
            },
          ],
        }}
      >
        <Svg
          width={wheelSize}
          height={wheelSize}
          viewBox={`0 0 ${width} ${width}`}
          style={{ transform: [{ rotate: `-${angleOffset}deg` }] }}
        >
          <G y={width / 2} x={width / 2}>
            {this._wheelPaths.map((arc, i) => {
              const [x, y] = arc.centroid;
              return (
                // eslint-disable-next-line react/no-array-index-key
                <G key={`arc-${i}`}>
                  <Path d={arc.path} fill={arc.color} />
                  <G
                    rotation={(i * oneTurn) / numberOfSegments + angleOffset}
                    origin={`${x}, ${y}`}
                  >
                    {i === 4
                      ? (
                        <Image
                          x={x - wp('7')}
                          y={y - wp('4')}
                          width={wp('15')}
                          height={hp('5')}
                          preserveAspectRatio="xMidYMid slice"
                          href={this.ImageArray[Object.keys(this.ImageArray)[i]]}
                        />
                      ) : (
                        <Image
                          x={x - wp('4')}
                          y={y - wp('4')}
                          width={wp('8')}
                          height={wp('8')}
                          preserveAspectRatio="xMidYMid slice"
                          href={this.ImageArray[Object.keys(this.ImageArray)[i]]}
                      />
                      )}
                  </G>
                </G>
              );
            })}
          </G>
        </Svg>
      </Animated.View>
      <TouchableOpacity
        style={styles.wheelBackgroundContainer}
        onPress={() => this.goWheel()}
      >
        <RNImage source={AppMocData.wheel.background.first} style={styles.wheelBackground} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#181818',
  },
  wheelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingTop: hp('5'),
    paddingBottom: hp('5'),
  },
  backButton: {
    position: 'absolute',
    zIndex: 3,
    top: hp('15'),
    left: 0,
    paddingLeft: wp('3'),
    paddingTop: hp('1.1'),
    paddingBottom: hp('1.1'),
    paddingRight: hp('3'),
    borderTopRightRadius: wp('5'),
    borderBottomRightRadius: wp('5'),
    backgroundColor: '#242424',
  },
  backButtonImage: {
    transform: [
      {
        scaleX: -1,
      },
    ],
    width: wp('2.5'),
    height: wp('5'),
    resizeMode: 'contain',
  },
  headerTitleSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: hp('5'),
  },
  headerTopTitle: {
    color: 'white',
    opacity: 0.3,
    fontFamily: 'Antonio',
    fontSize: wp('7.5'),
  },
  headerTopCount: {
    color: 'white',
    fontFamily: 'Antonio-Bold',
    fontSize: wp('7.7'),
    paddingLeft: wp('1'),

  },
  winnerTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: hp('5'),
  },
  winnerText: {
    color: 'white',
    opacity: 0.5,
    fontFamily: 'Antonio',
    fontSize: wp('5.6'),
  },
  wheelBackgroundContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  wheelBackground: {
    width: wp('45'),
    resizeMode: 'contain',
  },
});

const mapStateToProps = (state) => ({
  spinToken: state.game.score.megaSpin,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  ...bindActionCreators({
    addSpin,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MegaSpinWheel);
