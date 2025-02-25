import { db } from "../connect.js";


export const getUser = (req, res) => {
    const q = "SELECT * FROM users WHERE id = ?";

    db.query(q, [req.query.userId], (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
}