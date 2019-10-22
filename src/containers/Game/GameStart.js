import React from "react";
import {
  Container,
  Content
} from "native-base";
import { styles } from "./styles";

import GamePlay from "./gameEngine";

export default class GameStart extends React.Component {

  componentDidMount() {
    // this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    //   this.goBack(); // works best when the goBack is async
    //   return true;
    // });
    //handleAndroidBackButton(()=>this.goPage('GameJoin'));
  }

  componentWillUnmount() {
    //removeAndroidBackButtonHandler();
  }

  goPage = (pageName) => {
    //this.props.navigation.goBack(null);
    this.props.navigation.navigate(pageName);
    // if (pageName === "GameJoin") {
    //   this.props.navigation.navigate(pageName);
    // } else
    //   this.props.navigation.replace(pageName);
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <GamePlay backPage={this.goPage}/>
        </Content>
      </Container>
    );
  }
}