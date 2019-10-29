import { createFeatureSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './route.serializer';
import * as fromApp from './index';

export const selectRouterState = createFeatureSelector<
  fromApp.State,
  RouterReducerState<RouterStateUrl>
>(fromApp.routerKey);
