/**
 * An image represents comment made by a user
 */

import { uuid } from '../util/uuid';

export class Guestbook {

    id: string;
    guestbookid: number;
    title: string;
    content: string;
    createdAt: string;

    constructor(obj?: any) {

        this.id = obj && obj.id || uuid();
        this.guestbookid = obj && obj.guestbookid || 0;
        this.title = obj && obj.title || null;
        this.content = obj && obj.content || null;
        this.createdAt = obj && obj.createdAt || null;

    }

}
