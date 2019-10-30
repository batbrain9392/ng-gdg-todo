import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './route.serializer';
import * as fromApp from './index';

const selectRouterState = createFeatureSelector<
  fromApp.State,
  RouterReducerState<RouterStateUrl>
>(fromApp.routerKey);

export const selectQueryParams = createSelector(
  selectRouterState,
  routerState => routerState.state.queryParams
);
export const selectQueryParam = (param: string) =>
  createSelector(
    selectRouterState,
    routerState => routerState.state.queryParams[param]
  );
export const selectRouteParams = createSelector(
  selectRouterState,
  routerState => routerState.state.params
);
export const selectRouteParam = (param: string) =>
  createSelector(
    selectRouterState,
    routerState => routerState.state.params[param]
  );
// export const selectRouteData = createSelector(
//   selectRouterState,
//   routerState => routerState.state
// );
export const selectUrl = createSelector(
  selectRouterState,
  routerState => routerState.state.url
);

export const selectReturnUrl = selectQueryParam('returnUrl');
