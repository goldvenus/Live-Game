import { combineReducers } from 'redux';

import NavigationReducer from './Navigation';
import GameReducer from './game';

const reducers = combineReducers({
  navigation: NavigationReducer,
  game: GameReducer,
});

export default reducers;
