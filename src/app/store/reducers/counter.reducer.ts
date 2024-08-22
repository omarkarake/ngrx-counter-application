import { createReducer, on } from '@ngrx/store';
// import { Action } from '@ngrx/store';
// import { CounterActions, INCREMENT, IncrementAction } from '../actions/counter.actions';
import { decrement, increment, reset } from '../actions/counter.actions';
const initialState = 0;
export const counterReducer = createReducer(
  initialState,
  on(increment, (state, action) => state + action.value),
  on(decrement, (state, action) => state - action.value),
  on(reset, (state) => (state = initialState))
);

// I am using alternative way to to create reducer and handle increment action
// export function counterReducer(state = initialState, action: CounterActions | Action) {
//   if (action.type === INCREMENT) {
//     return state + (action as IncrementAction).value;
//   }
//   return state;
// }
