import { createAction, props } from '@ngrx/store';

export const addHistory = createAction(
  '[Counter History] Add History',
  props<{ value: number }>()
);

export const clearHistory = createAction('[Counter History] Clear History');
