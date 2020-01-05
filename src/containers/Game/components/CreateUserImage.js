import React from 'react';
import {
  Image,
  View,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

class CreateUserImage extends React.Component {
  render() {
    const { userImage, userFlag } = this.props;
    return (
      <View>
        <Image
          source={userImage}
          style={{
            width: wp('24'),
            height: wp('24'),
            margin: wp('2'),
            resizeMode: 'contain',
          }}
        />
        <Image
          source={userFlag}
          style={{
            width: wp('10'),
            height: wp('10'),
            position: 'absolute',
            marginLeft: wp('9'),
            marginTop: wp('19'),
          }}
        />
      </View>
    );
  }
}


export default CreateUserImage;
