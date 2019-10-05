import {
  PixelRatio,
  StyleSheet,
} from 'react-native';

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
    height: 70,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ffffff2b'
  },
  time_count_down: {
    fontSize: 32,
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
    fontSize: 32,
    display: 'flex',
    color: '#ffffff',
    opacity: 0.5,
    transform: [
      {scaleX: 0.6},
      {scaleY: 1}
    ],
    marginLeft: -20,
    letterSpacing: 2
  },
  game_mark: {
    fontSize: 32,
    fontWeight: 'bold',
    display: 'flex',
    color: '#ffffff',
    transform: [
      { scaleX: 0.6 },
      { scaleY: 1 }
    ],
    marginLeft: -50,
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
  }
});


export default styles;
