import { createReducer, on } from '@ngrx/store';
import { changeTheme } from './themeSwitcher.actions';

export const initialState = 1;

const _themeSwitcherReducer = createReducer(
  initialState,
  on(changeTheme, ( state, action ) => {
    console.log('themeSwitcher.reducer: _themeSwitcherReducer: state ',state,' action:',action);
    return action.id
  })
);

export function themeSwitcherReducer(state, action) {
  console.log('themeSwitcher.reducer: themeSwitcherReducer: state ',state,' action:',action);
  return _themeSwitcherReducer(state, action);
}