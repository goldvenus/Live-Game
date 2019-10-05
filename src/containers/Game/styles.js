import {
  PixelRatio,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
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
    fontSize: 29,
    lineHeight: 29,
    display: 'flex',
    color: '#2EC760',
    borderRadius: 5,
    textShadowColor: '#2EC760',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 16,
    paddingLeft: 30,
    opacity: 1,
    transform: [
      {scaleX: 0.8},
      {scaleY: 1}
    ]
  },
  mark_text: {
    fontSize: 29,
    lineHeight: 29,
    display: 'flex',
    color: '#ffffff',
    paddingLeft: 30,
    opacity: 0.5,
    transform: [
      {scaleX: 0.8},
      {scaleY: 1}
    ],
    letterSpacing: -3
  },
  game_mark: {
    fontSize: 29,
    lineHeight: 29,
    fontWeight: 'bold',
    display: 'flex',
    color: '#ffffff',
    transform: [
      {scaleX: 0.8},
      {scaleY: 1}
    ],
    paddingLeft: 10,
    opacity: 1
  }
});


export default styles;
