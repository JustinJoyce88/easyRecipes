import global, { GlobalState } from './global';
import persist, { PersistState } from './persist';

import { combineReducers } from 'redux';

export interface RootState {
  global: GlobalState;
  persist: PersistState;
}

const rootReducer = combineReducers<RootState>({
  global,
  persist,
});

export default rootReducer;
