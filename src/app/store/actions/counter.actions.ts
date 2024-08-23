import { createAction, props } from '@ngrx/store';
// import { Action, createAction, props } from '@ngrx/store';

export const increment = createAction(
  '[Counter] Increment',
  props<{ value: number }>()
);

export const decrement = createAction(
  '[Counter] Decrement',
  props<{ value: number }>()
);

export const incrementBy = createAction(
  '[Counter] IncrementBy',
  props<{ value: number }>()
);

export const decrementBy = createAction(
  '[Counter] DecrementBy',
  props<{ value: number }>()
);

export const reset = createAction(
  '[Counter] Reset',
  props<{ value: number }>()
);
export const getNewValueFromUndo = createAction(
  '[Counter] Get New Value From Undo',
  props<{ value: number }>()
);

// export const INCREMENT = '[Counter] Increment'

// export class IncrementAction implements Action {
//   readonly type = INCREMENT;
//   constructor(public value: number) {}
// }

// export type CounterActions = IncrementAction;
