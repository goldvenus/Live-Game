import React from "react";
import {
  StyleSheet,
  View,
  Text as RNText,
  Animated,
  TouchableOpacity,
  Image as RNImage, Alert
} from "react-native";
import * as d3Shape from "d3-shape";
import color from "randomcolor";
import { snap } from "@popmotion/popcorn";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { connect } from "react-redux";

import Svg, { Path, G, Image, Line } from "react-native-svg";
import Images from "../../../../MocData";
import GameHeaderBar from "../components/GameHeaderBar";
import { bindActionCreators } from "redux";
import { setFlareToken } from "../../../redux/action/game";
import Modal from "react-native-modal";
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from "../../../services/BackPress";

const width = wp("100");
const numberOfSegments = 10;
const numberOfWheelLine = 80;
const wheelSize = wp("85");
const oneTurn = 360;
const angleBySegment1 = oneTurn / numberOfWheelLine;
const angleBySegment = oneTurn / numberOfSegments;
const angleOffset1 = angleBySegment1 / 2;
const angleOffset = angleBySegment / 2;
const knobFill = color({ hue: "purple" });

const makeWheel = (count) => {
  const data = Array.from({ length: count }).fill(1);
  const arcs = d3Shape.pie()(data);
  const colors = color({
    luminosity: "dark",
    count: numberOfSegments
  });

  return arcs.map((arc, index) => {
    const instance = d3Shape
      .arc()
      .padAngle(0.01) // padding arc
      .outerRadius(wp("50"))
      .innerRadius(wp("30"));

    return {
      path: instance(arc),
      color: "#181818",//colors[index], // set arc background color
      value: index,//Math.round(Math.random() * 10 + 1) * 200, //[200, 2200]
      centroid: instance.centroid(arc)
    };
  });
};

class FlareSpinWheel extends React.Component {
  _wheelPaths = makeWheel(numberOfSegments);
  _wheelLinePaths = makeWheel(numberOfWheelLine);
  _angle = new Animated.Value(0);
  angle = 0;

  state = {
    enabled: true,
    finished: false,
    winner: 2,
    playWheel: false
  };

  ImageArray = Images.wheel.mega;

  WheelData = [
    {
      type: "image",
      url: Images.wheel.mega.first
    },
    {
      type: "text",
      num: "75"
    },
    {
      type: "image",
      url: Images.wheel.mega.third
    },
    {
      type: "text",
      num: "150"
    },
    {
      type: "text",
      num: "200"
    },
    {
      type: "image",
      url: Images.wheel.mega.second
    },
    {
      type: "text",
      num: "45"
    },
    {
      type: "text",
      num: "100"
    },
    {
      type: "text",
      num: "15"
    },
    {
      type: "text",
      num: "30"
    }
  ];

  getRandomDeceleration() {
    return 0.999 + (Math.floor(Math.random() * 100) % 60) / 100000;
  }

  goWheel() {
    const m_speed = -2000;
    if (this.state.playWheel || this.props.flareSpin < 1 )
      return;
    const { setFlareToken, flareSpin } = this.props;
    setFlareToken(flareSpin - 1);
    this.setState({ playWheel: true });
    Animated.decay(this._angle, {
      velocity: m_speed / 1000,
      deceleration: this.getRandomDeceleration(), //0.999 ~ 0.9999 Random
      useNativeDriver: true
    }).start(() => {
      this._angle.setValue(this.angle % oneTurn);
      const snapTo = snap(oneTurn / numberOfSegments);
      Animated.timing(this._angle, {
        toValue: snapTo(this.angle),
        duration: 700,
        useNativeDriver: true
      }).start(() => {
        const winnerIndex = this._getWinnerIndex();
        this.setState({
          enabled: true,
          finished: true,
          playWheel: false,
          winner: this._wheelPaths[winnerIndex].value
        });
      });
      // do something here;
    });
  }
  closeDialog = () => {
    this.setState({finished: false});
  };
  backButtonPress() {
    this.props.navigation.goBack(null);
  }

  componentDidMount() {
    handleAndroidBackButton(()=>{this.props.navigation.goBack(null)})
    this._angle.addListener(event => {
      if (this.state.enabled) {
        this.setState({
          enabled: false,
          finished: false
        });
      }
      this.angle = event.value;
    });
  }

  componentWillUnmount() {
    removeAndroidBackButtonHandler();
  }

  _getWinnerIndex = () => {
    const deg = Math.abs(Math.round(this.angle % oneTurn));
    return Math.floor(deg / angleBySegment);
  };

  render() {
    const {winner} = this.state;
    return (
      <View
        style={styles.container}>
        <GameHeaderBar/>
        <View style={styles.headerTitleSection}>
          <RNText style={styles.headerTopTitle}>FLARE SPINS:</RNText>
          <RNText style={styles.headerTopCount}>{this.props.flareSpin}</RNText>
        </View>
        <View style={styles.wheelContainer}>
          {this._renderSvgWheel()}
          {/*this.state.finished && this.state.enabled && this._renderWinner()*/}
        </View>
        <View style={styles.winnerTextContainer}>
          <RNText style={styles.winnerText}>
            MEGA CREDITS CREDITS: 9
          </RNText>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.backButtonPress()}>
          <RNImage source={Images.game.icon.arrow} style={styles.backButtonImage}/>
        </TouchableOpacity>
        <Modal
          isVisible={this.state.finished}>
          <View style={{
            width: wp('90'),
            height: hp('20'),
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            borderRadius: 10,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <RNText style={{
                fontSize: wp('7'),
                fontFamily: 'Antonio-Bold',
                paddingRight: wp('2')
              }}>YOU GOT </RNText>
              {
                (winner===0 || winner===2 || winner===5)?
                  <RNImage source={this.ImageArray[Object.keys(this.ImageArray)[winner]]}
                           style={{
                             width: wp('10'),
                             resizeMode: 'contain'
                           }}/> :
                  <RNText style={{
                    fontSize: wp('8'),
                    fontFamily: 'Antonio-Bold',
                    color: '#f00'
                  }}>{this.WheelData[winner].num}</RNText>
              }
              <RNText style={{
                fontSize: wp('7'),
                fontFamily: 'Antonio-Bold',
                paddingLeft: wp('2')
              }}>SPIN!</RNText>
            </View>

            <TouchableOpacity onPress={this.closeDialog}>
              <RNText style={{
                color: '#5C7FFF',
                fontFamily: 'Antonio-Bold',
                fontSize: wp('4'),
                paddingTop: hp('5')
              }}>OK</RNText>
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
        new Animated.Value(angleBySegment)
      ),
      1
    );

    return (
      <Animated.View
        style={{
          width: knobSize,
          height: knobSize * 2,
          justifyContent: "flex-end",
          zIndex: 1,
          transform: [
            {
              rotate: YOLO.interpolate({
                inputRange: [-1, -0.5, -0.0001, 0.0001, 0.5, 1],
                outputRange: [
                  "0deg",
                  "0deg",
                  "35deg",
                  "-35deg",
                  "0deg",
                  "0deg"
                ]
              })
            }
          ]
        }}>
        <Svg
          width={knobSize}
          height={(knobSize * 100) / 57}
          viewBox={`0 0 57 100`}
          style={{ transform: [{ translateY: 8 }] }}>
          <Path
            d="M28.034,0C12.552,0,0,12.552,0,28.034S28.034,100,28.034,100s28.034-56.483,28.034-71.966S43.517,0,28.034,0z   M28.034,40.477c-6.871,0-12.442-5.572-12.442-12.442c0-6.872,5.571-12.442,12.442-12.442c6.872,0,12.442,5.57,12.442,12.442  C40.477,34.905,34.906,40.477,28.034,40.477z"
            fill={knobFill}
          />
        </Svg>
      </Animated.View>
    );
  };

  _renderSvgWheel = () => {
    return (
      <View style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
      }}>
        {/*{this._renderKnob()}*/}
        <Animated.View
          style={{
            alignItems: "center",
            justifyContent: "center",
            transform: [
              {
                rotate: this._angle.interpolate({
                  inputRange: [-oneTurn, 0, oneTurn],
                  outputRange: [`-${oneTurn}deg`, `0deg`, `${oneTurn}deg`]
                })
              }
            ]
          }}>
          <View style={{
            position: "absolute"
          }}>
            <Svg
              width={wheelSize}
              height={wheelSize}
              viewBox={`0 0 ${width} ${width}`}
              style={{ transform: [{ rotate: `-${angleOffset1}deg` }] }}>
              <G y={width / 2} x={width / 2}>
                {
                  this._wheelLinePaths.map((arc, i) => {
                    const [x, y] = arc.centroid;
                    const removeLine = i % 8;
                    if (removeLine < 2 || removeLine === (7))
                      return;
                    return (
                      <G key={`arc-${i}`}>
                        <G
                          rotation={(i * oneTurn) / numberOfWheelLine + angleOffset1}
                          origin={`${x}, ${y}`}>
                          <Line
                            x1={x}
                            y1={y}
                            x2={x}
                            y2={y - wp("3")}
                            stroke="#47494C"
                            strokeWidth="2"
                          />
                        </G>
                      </G>
                    );
                  })
                }
              </G>
            </Svg>
          </View>
          <Svg
            width={wheelSize}
            height={wheelSize}
            viewBox={`0 0 ${width} ${width}`}
            style={{ transform: [{ rotate: `-${angleOffset}deg` }] }}>
            <G y={width / 2} x={width / 2}>
              {
                this._wheelPaths.map((arc, i) => {
                  const [x, y] = arc.centroid;
                  const number = arc.value.toString();

                  return (
                    <G key={`arc-${i}`}>
                      <G
                        rotation={(i * oneTurn) / numberOfSegments + angleOffset}
                        origin={`${x}, ${y}`}>
                        <Image
                          x={x - (i === 2 ? wp("7") : wp("3"))}
                          y={y - wp("6")}
                          width={i === 2 ? wp("14") : wp("7")}
                          height={i === 2 ? wp("12") : wp("7")}
                          preserveAspectRatio="xMidYMid slice"
                          href={this.ImageArray[Object.keys(this.ImageArray)[i]]}
                        />
                      </G>
                    </G>
                  );
                })
              }

            </G>
          </Svg>
        </Animated.View>
        <TouchableOpacity style={styles.wheelBackgroundContainer}
                          onPress={() => this.goWheel()}>
          <RNImage source={Images.wheel.background.second} style={styles.wheelBackground}/>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#181818"
  },
  wheelContainer: {
    padding: hp("5"),
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row"
  },
  backButton: {
    position: "absolute",
    zIndex: 3,
    top: hp("15"),
    left: 0,
    paddingLeft: wp("3"),
    paddingTop: hp("1.1"),
    paddingBottom: hp("1.1"),
    paddingRight: hp("3"),
    borderTopRightRadius: wp("5"),
    borderBottomRightRadius: wp("5"),
    backgroundColor: "#242424"
  },
  backButtonImage: {
    transform: [
      {
        scaleX: -1
      }
    ],
    width: wp("2.5"),
    height: wp("5"),
    resizeMode: "contain"
  },
  headerTitleSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: hp("10")
  },
  headerTopTitle: {
    color: "white",
    opacity: 0.3,
    fontFamily: "Antonio",
    fontSize: wp("7.5")
  },
  headerTopCount: {
    color: "white",
    fontFamily: "Antonio-Bold",
    fontSize: wp("7.7"),
    paddingLeft: wp("1")

  },
  winnerTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingBottom: hp("6")
  },
  winnerText: {
    color: "white",
    opacity: 0.5,
    fontFamily: "Antonio",
    fontSize: wp("5.6")
  },
  wheelBackgroundContainer: {
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row"
  },
  wheelBackground: {
    width: wp("60"),
    resizeMode: "contain"
  }
});

const mapStateToProps = state => {
  return {
    flareSpin: state.game.spinToken.flareSpin
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({
      setFlareToken: setFlareToken
    }, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FlareSpinWheel);