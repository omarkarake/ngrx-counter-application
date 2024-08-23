import { createReducer, on } from '@ngrx/store';
import {
  addHistory,
  clearHistory,
  getHistorySum,
  getLastHistoryElement,
  undo,
} from '../actions/counter-history.actions';

export interface CounterHistoryState {
  history: number[];
  historySum: number;
  lastElement: number;
}

export const initialHistoryState: CounterHistoryState = {
  history: [0],
  historySum: 0,
  lastElement: 0,
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
    historySum: 0,
  })),

  on(undo, (state) => ({
    ...state,
    history: state.history.slice(0, -1),
  })),
  on(getHistorySum, (state) => {
    const lastIndexOfZero = state.history.lastIndexOf(0);
    const slicedHistory = state.history.slice(lastIndexOfZero);
    const historySum = slicedHistory.reduce((acc, curr) => acc + curr, 0);
    return {
      ...state,
      historySum,
    };
  }),
  on(getLastHistoryElement, (state) => ({
    ...state,
    lastElement: state.history.slice(-1)[0],
  }))
);
