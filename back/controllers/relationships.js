
import { queryDatabase } from "../helpers/queryDatabase.js";

export const getFollowers = async (req, res) => {
    try {
        const { id } = req.query; 

        const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";
        const subs = await queryDatabase(q, id);

        console.log("cerf-----------", subs);

        if (!subs.length) return res.json([]);

        const followerIds = subs.map(sub => sub.followerUserId);

        const findFollowersQuery = "SELECT id, username, email, fullname, profilePic, about FROM users WHERE id IN (?)"; 
        const followersData = await queryDatabase(findFollowersQuery, [followerIds]);

        return res.json(followersData);

    } catch (err) {
        return res.status(400).json(err.message);
    }
};

export const getFollowed = async (req, res) => {
    try {
        const { id } = req.query;

        const q = "SELECT followedUserId FROM relationships WHERE followerUserId = ?";
        const subs = await queryDatabase(q, id);

        if (!subs.length) {
            return res.json([]);
        }

        const followedIds = subs.map(sub => sub.followedUserId);

        const findFollowedQuery = "SELECT id, username, email, fullname, profilePic, about FROM users WHERE id IN (?)";
        const followedData = await queryDatabase(findFollowedQuery, [followedIds]);

        return res.status(200).json(followedData);
        
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

export const unfollow = async (req, res) => {
    try{
        const {followerId, followedId} = req.body;

        const existingQuery = "SELECT * FROM relationships WHERE followerUserId = ? AND followedUserId = ?";

        const existingRelationship = await queryDatabase(existingQuery, [followerId, followedId]);

        if(!existingRelationship.length) throw new Error('no such relation')

        const q = "DELETE FROM relationships WHERE followerUserId = ? AND followedUserId = ?"

        const deleteRelationship = await queryDatabase(q, [followerId, followedId])

        if(deleteRelationship) res.status(200).json("deleted");
        
    }
    catch(err){
        return res.error(err.message)
    }
}

export const follow = async (req, res) => {
    try{
        const {followerId, followedId} = req.body;

        const existingQuery = "SELECT * FROM relationships WHERE followerUserId = ? AND followedUserId = ?";

        const existingRelationship = await queryDatabase(existingQuery, [followerId, followedId]);

        if(existingRelationship.length) throw new Error('relationship is already exist')

        const q = "INSERT INTO relationships (followerUserId, followedUserId) VALUES (?, ?)"

        const newRelationship = await queryDatabase(q, [followerId, followedId])

        if(newRelationship) res.status(201).json(newRelationship);
        else throw new Error('no such relationship')
    }
    catch(err){
        return res.json(err.message)
    }
}


