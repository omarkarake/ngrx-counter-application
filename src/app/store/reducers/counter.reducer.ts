import { createReducer, on } from '@ngrx/store';
// import { Action } from '@ngrx/store';
// import { CounterActions, INCREMENT, IncrementAction } from '../actions/counter.actions';
import {
  decrement,
  decrementBy,
  getNewValueFromUndo,
  increment,
  incrementBy,
  reset,
} from '../actions/counter.actions';

export interface InitialState {
  counter: number;
}

const initialState: InitialState = { counter: 0 };

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, action) => ({
    ...state,
    counter: state.counter + action.value,
  })),
  on(decrement, (state, action) => {
    if (state.counter - action.value < 0) {
      return state;
    } else {
      return {
        ...state,
        counter: state.counter - action.value,
      };
    }
  }),
  on(incrementBy, (state, action) => ({
    ...state,
    counter: state.counter + action.value,
  })),
  on(decrementBy, (state, action) => {
    if (state.counter - action.value < 0) {
      return state;
    } else {
      return {
        ...state,
        counter: state.counter - action.value,
      };
    }
  }),
  on(getNewValueFromUndo, (state, action) => ({
    ...state,
    counter: Math.max(0, action.value),
  })),
  on(reset, (state, action) => ({
    ...state,
    counter: action.value,
  }))
  // on(reset, (state) =>
  //   Object.assign({}, state, { counter: initialState.counter })
  // )
);

// I am using alternative way to to create reducer and handle increment action
// export function counterReducer(state = initialState, action: CounterActions | Action) {
//   if (action.type === INCREMENT) {
//     return state + (action as IncrementAction).value;
//   }
//   return state;
// }
