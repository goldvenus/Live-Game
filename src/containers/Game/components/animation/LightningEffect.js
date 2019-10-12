import React from "react";
import { Image } from "react-native";

export default class LightningEffect extends React.Component {
  constructor(props) {
    super(props);
    this.images = [
      require("../../../../../assets/images/game/lightning/lightning1.png"),
      require("../../../../../assets/images/game/lightning/lightning2.png"),
      require("../../../../../assets/images/game/lightning/lightning3.png"),
      require("../../../../../assets/images/game/lightning/lightning4.png")
    ];
    this.next = this.next.bind(this);
    this.state = { index: 0 };
  }
  componentDidMount() {
    this.next();
  }

  next() {
    setTimeout(() => {
      this.setState({ index: Math.floor(Math.random() * 10) % 4});
      this.next();
    }, 300);
  }

  render() {
    const { lightw, lighth, mx, my } = this.props;
    return (
      <Image
        style={{
          position: "absolute",
          marginLeft: mx,
          marginTop: my,
          width: lightw,
          height: lighth,
          left:0,
          resizeMode: "contain"
        }}
        source={this.images[this.state.index]}
      />
    );
  }
}