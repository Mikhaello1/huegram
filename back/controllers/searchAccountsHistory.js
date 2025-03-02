import { db } from "../connect.js";

export const getSearchAccountsHistory = (req, res) => {
    const q = "SELECT * FROM search_accounts_history WHERE searcherId = ?";

    db.query(q, [req.query.searcherId], (err, searchAccountsHistoryItems) => {
        if (err) return res.status(500).json(err);
        
        if (searchAccountsHistoryItems.length) {
            const userQueries = searchAccountsHistoryItems.map(item => {
                return new Promise((resolve, reject) => {
                    const userQuery = "SELECT * FROM users WHERE id = ?";
                    db.query(userQuery, [item.searchedId], (err, users) => {
                        if (err) return reject(err);
                        if (users.length) {
                            const { id, username, fullname, profilePic } = users[0];
                            const userId = id;
                            resolve({ id: item.id, username, fullname, profilePic, userId });
                        } else {
                            resolve(null);
                        }
                    });
                });
            });

            Promise.all(userQueries)
                .then(users => {
                    const filteredUsers = users.filter(user => user !== null);
                    return res.json(filteredUsers);
                })
                .catch(err => {
                    return res.status(500).json(err);
                });
        } else {
            return res.json([]);
        }
    });
};

export const addToSearchAccountsHistory = (req, res) => {
    let q = "SELECT * FROM search_accounts_history WHERE searcherId = ? AND searchedId = ?";
    const values = [req.body.searcherId, req.body.searchedId];

    console.log("----------", values)

    let isExists;
    db.query(q, values, (err, data) => {
        if(err) return res.json(err)
        isExists = data[0] ? true : false;
        if (!isExists){
            q = "INSERT INTO search_accounts_history (searcherId, searchedId) VALUES (?, ?)";
            db.query(q, values, (err, _) => {
                if (err) return res.status(500).json(err);
                return res.send(data);
            });
        }
    })


    
};

export const deleteFromSearchAccountsHistory = (req, res) => {
    const q = "DELETE FROM search_accounts_history WHERE searcherId = ? AND searchedId = ?";
    const values = [req.query.searcherId, req.query.searchedId];

    db.query(q, values, (err, data) => {
        if(err) return res.status(500).json(err);
        return res.json("History cleared successfully.")
    })
}

const filterFoundUsers = (foundUsers, filter) => {

    const users = foundUsers.map(({id, username, fullname, profilePic}) => (
        {
            userId: id, username, fullname, profilePic
        }
    ))
    
    return users.filter(user => user.id !== filter)
    
        

}

export const getSearchAccounts = (req, res) => {
    const q = "SELECT * FROM users WHERE username LIKE ? LIMIT 5";
    const value = `${req.query.searchQuery}%`

    db.query(q, value, (err, foundUsers) => {
        if (err) return res.status(500).json(err);

        if (foundUsers.length) {
            res.json(filterFoundUsers(foundUsers, req.query.searcherId))
            
        }
        else {
            const q = "SELECT * FROM users WHERE fullname LIKE ? LIMIT 5";
            db.query(q, value, (err, foundUsers) => {
                if (err) return res.status(500).json(err);
                if (foundUsers.length){
                    res.json(filterFoundUsers(foundUsers, req.query.searcherId))
                    
                }
                return res.json([]);
            })
        }
    })
}