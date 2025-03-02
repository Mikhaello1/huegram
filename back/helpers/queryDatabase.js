import { db } from "../connect.js";

export const queryDatabase = (query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};