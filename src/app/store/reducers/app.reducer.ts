import { ActionReducerMap, combineReducers } from '@ngrx/store';
import { counterReducer, InitialState } from './counter.reducer';
import {
  counterHistoryReducer,
  CounterHistoryState,
} from './counter-history.reducer';

export interface AppState {
  counter: InitialState;
  counterHistory: CounterHistoryState;
}

export const reducers: ActionReducerMap<AppState> = {
  counter: counterReducer,
  counterHistory: counterHistoryReducer,
};

export const rootReducer = combineReducers({
  counter: counterReducer,
  counterHistory: counterHistoryReducer,
});
