import { CounterHistoryState } from '../reducers/counter-history.reducer';
import { InitialState } from '../reducers/counter.reducer';

export const selectCount = (state: {
  counter: InitialState;
  counterHistory: CounterHistoryState;
}) => state.counter.counter;
