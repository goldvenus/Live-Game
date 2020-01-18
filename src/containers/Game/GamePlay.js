import React from 'react';
import {
  Container,
  Content,
} from 'native-base';
import { styles } from './styles';

import GameEnginePlay from './gameEngine';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../../services/BackPress';

export default class GamePlay extends React.Component {
  componentDidMount() {
    handleAndroidBackButton(() => false);
  }

  componentWillUnmount() {
    removeAndroidBackButtonHandler();
  }

  goPage = (pageName, param) => {
    const { navigation } = this.props;
    navigation.navigate(pageName, { param });
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <GameEnginePlay backPage={this.goPage} navigation={navigation} />
        </Content>
      </Container>
    );
  }
}
