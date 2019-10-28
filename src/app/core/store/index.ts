import { ActionReducerMap } from '@ngrx/store';
import * as fromApp from './reducers/app.reducer';

export interface State {
  [fromApp.appFeatureKey]: fromApp.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromApp.appFeatureKey]: fromApp.reducer
};
