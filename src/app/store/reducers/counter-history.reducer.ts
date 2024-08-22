import { createReducer, on } from '@ngrx/store';
import { addHistory, clearHistory } from '../actions/counter-history.actions';

export interface CounterHistoryState {
  history: number[];
}

export const initialHistoryState: CounterHistoryState = {
  history: []
};

export const counterHistoryReducer = createReducer(
  initialHistoryState,
  on(addHistory, (state, { value }) => ({
    ...state,
    history: [...state.history, value]
  })),
  on(clearHistory, state => ({
    ...state,
    history: []
  }))
);