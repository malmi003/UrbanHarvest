import { db } from '../config/db';

export const pullFoods = () => {
    db.ref("/food").on("value", function(snapshot) {
        console.log(snapshot.val());
    });

    console.log("pulling data for map")
    // function(error) {
    //     if (error) {
    //         console.log("food pull failed")
    //     } else {
    //         console.log("data pulled!")
    //     };
    // };
};