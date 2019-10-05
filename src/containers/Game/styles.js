import {
  StyleSheet,
} from 'react-native';

import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
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
    height: 50,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ffffff2b'
  },
  time_count_down: {
    fontSize: 28,
    display: 'flex',
    color: '#2EC760',
    borderRadius: 5,
    textShadowColor: '#2EC760',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 16,
    paddingLeft: 30,
    opacity: 1,
    transform: [
      {scaleX: 0.6},
      {scaleY: 1}
    ],
    letterSpacing: 2,
  },
  mark_text: {
    fontSize: 28,
    display: 'flex',
    color: '#ffffff',
    opacity: 0.5,
    transform: [
      {scaleX: 0.6},
      {scaleY: 1}
    ],
    letterSpacing: 2,
    marginLeft: 10
  },
  game_mark: {
    fontSize: 28,
    fontWeight: 'bold',
    display: 'flex',
    color: '#ffffff',
    transform: [
      { scaleX: 0.6 },
      { scaleY: 1 }
    ],
    marginLeft: -30,
    letterSpacing: 2,
    opacity: 1
  },
  header_view: {
    width: '100%',
    display: 'flex',
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: 'black',
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff3b',
    justifyContent: 'space-between'
  },
  header_arrow_btn: {
    width: 30,
    height: 30
  },
  header_middle_view: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  game_mark_icon: {
    width: 60,
    height: 60
  },
  game_header_title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    transform: [
      { scaleX: 0.7 },
      { scaleY: 1 }
    ],
    marginLeft: -30,
    letterSpacing: 2,
  },
  header_user_img: {
    width: 30,
    height: 30
  },
  game_dashboard_view: {
    width: '95%',
    height: vh(35),
    position: 'absolute',
    top: 80,
    left: '2.5%',
    backgroundColor: '#292929',
    borderRadius: 10
  },
  game_dashboard_top_view: {
    display: 'flex',
    height: '40%',
    flexDirection: 'row',
    borderBottomColor: '#ffffff2b',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20
  },
  game_wavescore_view: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: '#ffffff2b',
    borderRightWidth: 1,
    marginTop: 20,
    marginBottom: 20,

  },
  game_wavescore_text: {
    color: 'white',
    paddingLeft: 15,
    fontWeight: 'bold',
    fontSize: 32
  },
  game_wavescore: {
    width: 28,
    height: 28
  },
  game_play_passed_view: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  game_play_passed_num: {
    color: 'white',
    paddingLeft: 15,
    fontWeight: 'bold',
    fontSize: 32
  },
  game_play_passed_title: {
    color: 'white',
    opacity: 0.3,
    fontSize: 14,
    paddingLeft: 15
  },
  game_dashboard_bottom_view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%'
  },
  game_spin_coins_title: {
    fontSize: 32,
    color: 'white',
    opacity: 0.3,
    transform: [
      { scaleX: 0.7 },
      { scaleY: 1 }
    ]
  },
  game_spin_coins: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    transform: [
      { scaleX: 0.7 },
      { scaleY: 1 }
    ]
  }
});


export default styles;
