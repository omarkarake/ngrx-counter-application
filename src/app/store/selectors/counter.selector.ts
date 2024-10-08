import { CounterHistoryState } from '../reducers/counter-history.reducer';
import { InitialState } from '../reducers/counter.reducer';

export const selectCount = (state: {
  counter: InitialState;
  counterHistory: CounterHistoryState;
}) => state.counter.counter;

export const historySum = (state: {
  counter: InitialState;
  counterHistory: CounterHistoryState;
}) => state.counterHistory.historySum;

export const historyArray = (state: {
  counter: InitialState;
  counterHistory: CounterHistoryState;
}) => state.counterHistory.history;
