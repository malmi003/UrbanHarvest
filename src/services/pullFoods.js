import { db } from '../config/db';

export const readItem = () => {
    db.ref("/items").val()
    // function(error) {
    //     if (error) {
    //         console.log("food pull failed")
    //     } else {
    //         console.log("data pulled!")
    //     };
    // };
};