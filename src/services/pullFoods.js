import { db } from '../config/db';

export const pullFoods = () => {
    db.ref("/food").on("value", snapshot => {
        console.log(snapshot.val());
    });
    console.log("pulling data for map...")
};