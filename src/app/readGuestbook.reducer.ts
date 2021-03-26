import { Action, createReducer, on } from '@ngrx/store';
import * as ReadGuestbookActions from './readGuestbook.actions';

export interface ReadGuestbookState {
  id: string | null;
}

export const initialState: ReadGuestbookState = {
  id: null
};

export const readGuestbookReducer = createReducer(
  initialState,
  on(ReadGuestbookActions.readGuestbook, ( state, action ) => {
    //console.log('ReadGuestbook.readGuestbookReducer: ReadGuestbookActions.readGuestbook: state: ',state,' action: ',action);
    return {
      ...state,
      action: action
    }
  }),
  on(ReadGuestbookActions.readGuestbookSuccess, ( state, action ) => {
    //console.log('ReadGuestbook.readGuestbookReducer: ReadGuestbookActions.readGuestbookSuccess: state: ',state,' action: ',action);
    return {
      ...state,
      action: action
    }
  }),
  on(ReadGuestbookActions.readGuestbookFailure, ( state, action ) => {
    //console.log('ReadGuestbook.readGuestbookReducer: ReadGuestbookActions.readGuestbookFailure: state: ',state,' action: ',action);
    return {
      ...state,
      action: action
    }
  })
);

export function reducer(state: ReadGuestbookState | undefined, action: Action) {
  return readGuestbookReducer(state, action);
}
