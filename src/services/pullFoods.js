import { db } from '../config/db';

export const pullFoods = () => {
    db.ref("/currentFood").on("value", snapshot => {
        // console.log(snapshot.val())
        return snapshot.val();
    });
    console.log("pulling data for map...")
};