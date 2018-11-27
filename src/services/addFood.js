import { db } from '../config/db';

export const addFood = item => {
    // previous approach
    // add food to currentFood list to display on map
    // db.ref('/currentFood/').push({
    //     newFood: item,
    // }, function (error) {
    //     if (error) {
    //         console.log("addition failed")
    //     } else {
    //         console.log("data saved!")
    //     };
    // });
// add food to user specific list
    // db.ref('/users/' + item.userId).push({
    //     currentFood: item
    // }, function (error) {
    //     if (error) {
    //         console.log("addition failed")
    //     } else {
    //     };
    // });

    // NEW APPROACH get a new key for the food
    let newFoodKey = db.ref().child("/currentFood/").push().key;
    // add key property that holds onto key value
    item.key = newFoodKey;

    let updates = {};
    updates['/currentFood/' + newFoodKey] = item;
    updates['/users/' + item.userId + "/currentFood/" + newFoodKey] = item;
    
    return db.ref().update(updates);
};