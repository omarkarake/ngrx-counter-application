import { createReducer, on } from '@ngrx/store';
import {
  addHistory,
  clearHistory,
  getHistorySum,
  undo,
} from '../actions/counter-history.actions';

export interface CounterHistoryState {
  history: number[];
  historySum: number;
}

export const initialHistoryState: CounterHistoryState = {
  history: [],
  historySum: 0,
};

export const counterHistoryReducer = createReducer(
  initialHistoryState,
  on(addHistory, (state, { value }) => ({
    ...state,
    history: [...state.history, value],
  })),
  on(clearHistory, (state) => ({
    ...state,
    history: [],
  })),
  on(undo, (state) => ({
    ...state,
    history: state.history.slice(0, -1),
  })),
  on(getHistorySum, (state) => ({
    ...state,
    historySum: state.history.reduce((acc, curr) => acc + curr, 0),
  }))
);
