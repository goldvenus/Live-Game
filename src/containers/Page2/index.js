import React from 'react';
import {
  Container,
  Content,
  Text,
} from 'native-base';

import styles from './styles';


const Page2 = () => (
  <Container style={styles.container}>
    <Content contentContainerStyle={styles.content}>
      <Text style={styles.text}>Page2</Text>
    </Content>
  </Container>
);

export default Page2;
