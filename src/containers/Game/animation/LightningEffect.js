/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

export default class LightningEffect extends React.Component {
  static propTypes = {
    lightw: PropTypes.number,
    lighth: PropTypes.number,
    mx: PropTypes.number,
    my: PropTypes.number
  };

  static defaultProps = {
    lightw: 0,
    lighth: 0,
    mx: 0,
    my: 0
  };

  constructor(props) {
    super(props);
    this.images = [
      require('@assets/images/game/lightning/lightning1.png'),
      require('@assets/images/game/lightning/lightning2.png'),
      require('@assets/images/game/lightning/lightning3.png'),
      require('@assets/images/game/lightning/lightning4.png'),
    ];
    this.state = { index: 0 };
    this.disableInternal = null;
  }

  componentDidMount() {
    this.next();
  }

  componentWillUnmount() {
    clearInterval(this.disableInternal);
  }

  next() {
    this.disableInternal = setInterval(() => {
      this.setState({ index: Math.floor(Math.random() * 10) % 4 });
    }, 300);
  }

  render() {
    const { lightw, lighth, mx, my } = this.props;
    const { index } = this.state;
    return (
      <Image
        style={{
          position: 'absolute',
          marginLeft: mx,
          marginTop: my,
          width: lightw,
          height: lighth,
          left: 0,
          resizeMode: 'contain',
        }}
        source={this.images[index]}
      />
    );
  }
}
