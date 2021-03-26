import { createAction, props } from '@ngrx/store';
import { Guestbook } from './my-guestbook/guestbook.model';

export const createGuestbook = createAction(
    '[CreateGuestbook] CreateGuestbook API Request',
    props<{title: string, content: string}>()
);

export const createGuestbookSuccess = createAction(
    '[CreateGuestbook] CreateGuestbook API Request Success',
    props<any>()
);

export const createGuestbookFailure = createAction(
    '[CreateGuestbook] CreateGuestbook API Request Failure',
    props<{message: string}>()
);
