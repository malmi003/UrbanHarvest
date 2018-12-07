import { db } from '../config/db';
import GeoFire from 'geofire';
// ** remove RSVP from package.json and re-npm install if don't end up using anywhere
import RSVP from 'rsvp';
const geoFire = new GeoFire(db.ref("/geoFire/"));
const geoRef = geoFire.ref();


export const addFood = item => {
    // NEW APPROACH get a new key for the food
    let newFoodKey = db.ref().child("/currentFood/").push().key;
    // add key property that holds onto key value
    item.key = newFoodKey;

    let updates = {};
    updates['/currentFood/' + newFoodKey] = item;
    updates['/users/' + item.userId + "/currentFood/" + newFoodKey] = item;

    geoFire.set(item.key, [parseFloat(item.lat), parseFloat(item.lng)])
    .then(console.log("saved to geoFire!"));

    return db.ref().update(updates);
};