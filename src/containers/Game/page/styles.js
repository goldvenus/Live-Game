import {
  StyleSheet,
} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  megaRoundParent: {
    flex: 1,
    backgroundColor: "#181818"
  },
  topSection: {
    flex: 1,
    height: hp('30')
  },
  topCirclebgImage: {
    position: 'absolute',
    top: hp('7'),
    width: wp('50'),
    height: wp('50'),
    right: 0
  },
  topCirclebgNikiImage: {
    position: 'absolute',
    top: hp('7'),
    width: wp('60'),
    height: wp('60'),
    right: wp('-10')
  },
  topMarkImage: {
    width: wp('50'),
    resizeMode: 'contain',
    marginLeft: wp('10'),
    marginTop: hp('11'),
  },
  topSectionTitle: {
    fontFamily: 'Expo-Bold',
    fontSize: wp('8'),
    color: '#267ADE',
    marginTop: hp('-3'),
    paddingLeft: wp('10')
  },
  roundLocktxt: {
    fontFamily: 'Antonio-Bold',
    fontSize: wp('4'),
    paddingTop: hp('1'),
    paddingLeft: wp('10'),
    color: 'white'
  },
  megaUnlockImage: {
    position: 'absolute',
    right: wp('-5'),
    top: hp('-5'),
    width: wp('50'),
    height: hp('50'),
    zIndex: 3,
  },
  nikiUnlockImage: {
    position: 'absolute',
    right: wp('-10'),
    top: hp('10'),
    resizeMode: 'contain',
    width: wp('80'),
    zIndex: 3,
  },
  bottomRoundSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingTop: hp('35')
  },
  bottomRoundText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  roundTitletext: {
    fontSize: wp('4'),
    fontFamily: 'Antonio',
    color: 'white',
    opacity: 0.4,
    paddingBottom: hp('4')
  },
  roundTitleBoldtext: {
    fontSize: wp('4'),
    fontFamily: 'Antonio-Bold',
    color: 'white'
  },
  roundPannel: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  roundImage: {
    width: wp('30'),
    height: wp('30'),
    marginTop: hp('-1'),
    resizeMode: 'contain'
  },
  roundlock: {
    position: 'absolute',
    top: hp('5.7'),
    left: wp('12'),
    width: wp('6'),
    height: wp('6')
  },
  roundImageUnlockView: {
    width: wp('18'),
    height: wp('18'),
    marginLeft: wp('6'),
    marginRight: wp('6'),
    backgroundColor: '#292929',
    borderRadius: wp('9')
  },
  roundlockImage: {
    position: 'absolute',
    top: hp('3.3'),
    left: wp('6'),
    width: wp('6'),
    height: wp('6'),
    resizeMode: 'contain'
  },
  topTitleNiki: {
    fontFamily: 'Expo-Bold',
    color: 'white',
    marginTop: hp('10'),
    paddingLeft: wp('10'),
    fontSize: wp('15')
  },
  topSTitleNiki: {
    fontFamily: 'Expo-Bold',
    color: '#941228',
    marginTop: wp('-4'),
    paddingLeft: wp('10'),
    fontSize: wp('10')
  }
});
