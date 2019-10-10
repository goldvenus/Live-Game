import React from "react";
import {
  Container,
  Content,
  Text
} from "native-base";
import {
  View,
  Image
} from "react-native";
import { styles } from "./styles";
import GameHeaderBar from "./components/GameHeaderBar";
import { heightPercentageToDP as hp, widthPercentageToDP as wp }
  from "react-native-responsive-screen";

class GameCountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { downTime: 10 };
  }

  componentDidMount() {
    this.clockCountDown = setInterval(() => {
      this.decrementClock();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.clockCountDown);
  }

  decrementClock = () => {
    if (this.state.downTime < 1) {
      clearInterval(this.clockCountDown);
      //this.props.navigation.goBack(null);
      this.props.navigation.navigate("GameStart");
    }
    else
      this.setState((prevstate) => ({ downTime: prevstate.downTime - 1 }));
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <GameHeaderBar/>
          <View style={{
            display: "flex",
            justifyContent: "center",
            height: hp("45"),
            flexDirection: 'row'
          }}>
            <Image source={require("../../../assets/images/game/target_50.png")} style={{
              width: wp('40'),
              height: wp('40')
            }}/>
            <Text style={{
              position: 'absolute',
              fontSize: wp('24'),
              marginTop: hp('-1'),
              fontFamily: 'Antonio-Bold',
              color: 'white'
            }}>50</Text>
          </View>
          <View style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            height: hp('30')
          }}>
            <Text style={{
              fontSize: wp('8'),
              color: 'white',
              opacity: 0.4,
              paddingRight: wp('1'),
              fontFamily: 'Antonio'
            }}>FLARE SCORES</Text>
            <Text style={{
              fontSize: wp('8'),
              color: 'white',
              fontFamily: 'Antonio-Bold'
            }}>50 POINTS</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default GameCountDown;
