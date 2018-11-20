import { db } from '../config/db';

export const addFood = item => {
    // add food to total food record
    db.ref('/food/' ).push({
        newFood: item,
    }, function (error) {
        if (error) {
            console.log("addition failed")
        } else {
            console.log("data saved!")
        };
    });
// add food to user specific list
// console.log(item.userId, "id here")
    db.ref('/users/' + item.userId ).push({
        Food: item
    }, function (error) {
        if (error) {
            console.log("addition failed")
        } else {
        };
    });
};