import { createReducer, on } from '@ngrx/store';
import { changeTheme } from './themeSwitcher.actions';

export const initialState = 0;

const _themeSwitcherReducer = createReducer(
  initialState,
  on(changeTheme, (state) => state)
);

export function themeSwitcherReducer(state, action) {
  return _themeSwitcherReducer(state, action);
}