import React from 'react';
import {
  Container,
  Content,
  Text,
} from 'native-base';

import styles from './styles';

class Home extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <Text style={styles.text}>Home</Text>
        </Content>
      </Container>
    );
  }
}

export default Home;
