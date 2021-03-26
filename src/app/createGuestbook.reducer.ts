import { Action, createReducer, on } from '@ngrx/store';
import * as CreateGuestbookActions from './createGuestbook.actions';

export interface CreateGuestbookState {
  id: string | null;
}

export const initialState: CreateGuestbookState = {
  id: null
};

export const createGuestbookReducer = createReducer(
  initialState,
  on(CreateGuestbookActions.createGuestbook, ( state, action ) => {
    //console.log('CreateGuestbook.createGuestbookReducer: CreateGuestbookActions.createGuestbook: state: ',state,' action: ',action);
    return {
      ...state,
      action: action
    }
  }),
  on(CreateGuestbookActions.createGuestbookSuccess, ( state, action ) => {
    //console.log('CreateGuestbook.createGuestbookReducer: CreateGuestbookActions.createGuestbookSuccess: state: ',state,' action: ',action);
    return {
      ...state,
      action: action
    }
  }),
  on(CreateGuestbookActions.createGuestbookFailure, ( state, action ) => {
    //console.log('CreateGuestbook.createGuestbookReducer: CreateGuestbookActions.createGuestbookFailure: state: ',state,' action: ',action);
    return {
      ...state,
      action: action
    }
  })
);

export function reducer(state: CreateGuestbookState | undefined, action: Action) {
  return createGuestbookReducer(state, action);
}
