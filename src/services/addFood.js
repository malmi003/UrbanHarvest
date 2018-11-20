import { db } from '../config/db';

export const addFood = (item) => {
    db.ref('/items').push({
        newFood: item
    }, function (error) {
        if (error) {
            console.log("addition failed")
        } else {
            console.log("data saved!")
        };
    });
}