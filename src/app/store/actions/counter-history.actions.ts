import { createAction, props } from '@ngrx/store';

export const addHistory = createAction(
  '[Counter History] Add History',
  props<{ value: number }>()
);

export const undo = createAction('[History] Undo');
export const getHistorySum = createAction('[Counter History] Get History Sum');
export const getLastHistoryElement = createAction(
  '[Counter History] Get Last History Element'
);
export const clearHistory = createAction('[Counter History] Clear History');
