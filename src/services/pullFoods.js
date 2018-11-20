import { db } from '../config/db';

export const readItem = () => {
    db.ref("/items").val();
};