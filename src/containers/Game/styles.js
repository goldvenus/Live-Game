import {
  StyleSheet,
} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 0,
    margin:0
  },
  game_state_bottom_bar: {
    position: 'absolute',
    backgroundColor: '#1111112b',
    bottom:0,
    width: '100%',
    height: hp('6'),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ffffff2b'
  },
  time_count_down: {
    fontSize: wp('5'),
    fontFamily: 'Antonio',
    display: 'flex',
    color: '#2EC760',
    textShadowColor: '#2EC760',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: wp('2'),
    paddingLeft: wp('10'),
    opacity: 1,
  },
  mark_text: {
    fontSize: wp('5'),
    fontFamily: 'Antonio',
    display: 'flex',
    color: '#ffffff',
    opacity: 0.5,
    paddingLeft: wp('15')
  },
  game_mark: {
    fontSize: wp('5'),
    fontFamily: 'Antonio-Bold',
    display: 'flex',
    color: '#ffffff',
    paddingLeft: wp('2')
  },
  header_view: {
    width: '100%',
    display: 'flex',
    position: 'absolute',
    zIndex: 10,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
    backgroundColor: 'black',
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff3b',
    justifyContent: 'space-between'
  },
  header_arrow_btn: {
    width: wp('5'),
    height: wp('5')
  },
  header_middle_view: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  game_mark_icon: {
    width: wp('9'),
    height: wp('9')
  },
  game_header_title: {
    color: '#ffffff',
    fontFamily: 'Antonio-Bold',
    fontSize: wp('4.3')
  },
  header_user_img: {
    width: wp('7'),
    height: wp('7')
  },
  game_dashboard_view: {
    width: wp('95'),
    height: hp(35),
    position: 'absolute',
    top: hp('10'),
    left: wp('2.5'),
    backgroundColor: '#292929',
    borderRadius: wp('3')
  },
  game_dashboard_top_view: {
    display: 'flex',
    height: hp('17'),
    flexDirection: 'row',
    borderBottomColor: '#ffffff2b',
    borderBottomWidth: 1,
    marginLeft: wp('4'),
    marginRight: wp('4')
  },
  game_wavescore_view: {
    width: wp('47'),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: '#ffffff2b',
    borderRightWidth: 1,
    marginTop: wp('2'),
    marginBottom: wp('2'),

  },
  game_wavescore_text: {
    color: 'white',
    fontFamily: 'Antonio-Bold',
    fontSize: wp('7'),
    paddingLeft: wp('3')
  },
  game_wavescore: {
    width: wp('6'),
    height: wp('6')
  },
  game_play_passed_view: {
    width: wp('47'),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  game_play_passed_num: {
    color: 'white',
    fontFamily: 'Antonio-Bold',
    fontSize: wp('7')
  },
  game_play_passed_title: {
    color: 'white',
    opacity: 0.3,
    fontSize: wp('3'),
    paddingLeft: wp('3'),
    fontFamily: 'Antonio'
  },
  game_dashboard_bottom_view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('18')
  },
  game_spin_coins_title: {
    fontSize: wp('6'),
    color: 'white',
    opacity: 0.3,
    fontFamily: 'Antonio'
  },
  game_spin_coins: {
    color: 'white',
    fontSize: wp('9'),
    fontFamily: 'Antonio-Bold',
  },

});
export const joinStyles = StyleSheet.create( {
  bodyContainer: {
    flex: 1,
    height: hp('50'),
    paddingTop: hp('10'),
    backgroundColor: '#181818'
  },
  join_top_view: {
    display: 'flex',
    height: hp('30'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  join_bottom_view: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: hp('10'),
    marginTop: hp('2')
  },
  flare_border: {
    width: wp('10'),
    height: hp('24')
  },
  flare_border_right: {
    width: wp('10'),
    height: hp('24'),
    transform: [
      {
        scaleX: -1,
      },
      {
        scaleY: 1
      }
    ]
  },
  flareNumber: {
    fontSize: wp('20'),
    color: 'white',
  },
  game_setting: {
    flex: 1,
    borderTopWidth: 1
  },
  setting_JoinItem: {
    height: hp('8.6'),
    backgroundColor: '#0a0a0a',
    borderTopWidth: 1,
    borderTopColor: '#ffffff1f',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: wp('5'),
    paddingRight: wp('5')
  },
  joinButton: {
    backgroundColor: 'white',
    borderRadius:7,
    borderWidth: 1,
    borderColor: '#0a0a0a'
  },
  joinButton_Title: {
    fontFamily: 'Antonio-Bold',
    fontSize: wp('4'),
    paddingLeft: wp('7'),
    paddingRight: wp('7'),
    paddingTop: hp('1'),
    paddingBottom: hp('1'),
    color: '#FFA451',
  },
  game_flareSpin_item: {
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
    backgroundColor: '#0a0a0a',
    borderTopWidth: 1,
    borderTopColor: '#ffffff1f',
    height: hp('8.6'),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  game_flareSpin_item_image: {
    width: wp('8'),
    height: wp('8')
  },
  setting_item_list: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: wp('3'),
    width: wp('78')
  },
  setting_item_right_textBox: {
    color: 'white',
    marginRight: wp('4'),
    paddingTop: hp('0.8'),
    paddingBottom: hp('0.8'),
    paddingLeft: wp('3'),
    paddingRight: wp('3'),
    fontSize: wp('3.8'),
    fontFamily: 'Antonio-Bold',
    backgroundColor: 'rgba(250,250,250,0.1)',
    textAlign: 'center',
    borderRadius: 5

  },
  setting_item_right_view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  flare_spins_btn: {
  },
  game_MegaSpin_item: {
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
    backgroundColor: '#0a0a0a',
    height: hp('8.6'),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  setting_mega_item_list: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: wp('3'),
    height: hp('9'),
    width: wp('78'),
    borderTopWidth: 1,
    borderTopColor: '#ffffff1f',
  },
});
export const ReadyStyles = StyleSheet.create({
  GameReady_Container: {
    height: '100%',
    paddingTop: hp('6'),
    backgroundColor: '#181818'
  },
  TopTitleView: {
    height: hp('20'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Back_Button: {
    position: 'absolute',
    left: wp('0'),
    paddingLeft: wp('3'),
    paddingTop: hp('1.1'),
    paddingBottom: hp('1.1'),
    paddingRight: hp('3'),
    borderTopRightRadius: wp('5'),
    borderBottomRightRadius: wp('5'),
    backgroundColor: '#242424'
  },
  Back_Button_Image: {
    transform: [
      {
        scaleX: -1,
      }
    ],
    width: wp('2.5'),
    height: wp('5'),
    resizeMode: 'contain'
  },
  GameReady_CountDown_View: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flare_border: {
    width: wp('10'),
    height: hp('28')
  },
  flare_border_right: {
    width: wp('10'),
    height: hp('28'),
    transform: [
      {
        scaleX: -1,
      },
      {
        scaleY: 1
      }
    ]
  },
  Game_Members_Title: {
    paddingTop: hp('10'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  Game_Members_text1: {
    fontFamily: 'Antonio-Bold',
    fontSize: wp('5.3'),
    color: '#505050'
  },
  Game_Members_text2: {
    fontFamily: 'Antonio-Bold',
    fontSize: wp('5.3'),
    color: '#ffffff',
    paddingLeft: wp('1'),
    paddingRight: wp('1')
  },
  Game_Join_users: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
export const GameGlobal = StyleSheet.create({
  h6: {
    fontFamily: 'Antonio',
    fontSize: wp('3.8'),
    color: 'white',
    opacity: 0.3
  },
  h5: {
    fontFamily: 'Antonio',
    fontSize: wp('5'),
    color: 'white',
    opacity: 0.3
  },
  h4: {
    fontFamily: 'Antonio-Bold',
    fontSize: wp('8'),
    color: 'white',
  },
  h3: {
    fontFamily: 'Antonio',
    fontSize: wp('7'),
    color: 'white',
    opacity: 0.3
  },
  h1: {
    fontFamily: 'Antonio',
    fontSize: wp('8'),
    color: 'white',
    opacity: 0.5
  }
})

