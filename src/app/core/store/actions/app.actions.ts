import { createAction, props } from '@ngrx/store';

export const loadStart = createAction('[App Load] Load Start');
export const loadEnd = createAction('[App Load] Load End');
export const loadEndError = createAction(
  '[App Load] Load End Error',
  props<{ err: string }>()
);
