import { Outlet, useParams } from "react-router-dom";
import { Avatar } from "../../components/Avatar/Avatar";
import styles from "./Profile.module.scss";
import { ProfileContent } from "../../components/ProfileContent/ProfileContent";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useFollowMutation, useGetFollowedQuery, useGetFollowersQuery, useUnfollowMutation } from "../../store/reducers/api/RelationshipsApi";
import { IUserData } from "../../types/UserDataTypes";
import { useGetUserByUsernameQuery } from "../../store/reducers/api/UsersApi";

export const Profile = () => {
    const { username } = useParams();

    const [isMyProfile, setIsMyProfile] = useState<boolean>(false);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const myUser = useAppSelector((state) => state.user.userData);

    const { data: profileUserData } = useGetUserByUsernameQuery(username || "");

    const { data: followers, isLoading: isFollowersLoading } = useGetFollowersQuery(profileUserData?.id);
    const { data: followed, isLoading: isFollowedLoading } = useGetFollowedQuery(profileUserData?.id);

    const [follow] = useFollowMutation();
    const [unfollow] = useUnfollowMutation();

    useEffect(() => {
        if (profileUserData?.username == myUser.username) setIsMyProfile(true);
        else {
            setIsMyProfile(false);
            setIsSubscribed(false);
            console.log(followers);
            if (followers?.length) {
                for (let { username } of followers) {
                    console.log(username);
                    if (username == myUser.username) {
                        console.log("ou yes");
                        setIsSubscribed(true);
                        break;
                    }
                }
            }
        }
    }, [profileUserData, isSubscribed, isFollowersLoading, isFollowedLoading, followed, followers]);

    const handleFollowButton = () => {
        const followReqBody = { followerId: myUser.id, followedId: profileUserData?.id || 0 };
        if (!isSubscribed) {
            follow(followReqBody);
        } else {
            unfollow(followReqBody);
        }
        setIsSubscribed((prev) => !prev);
    };

    return (
        <div className={styles.profilePage}>
            {isFollowedLoading || isFollowersLoading ? (
                "Loading"
            ) : (
                <div style={{ width: "80%" }}>
                    <div className="flex">
                        <div>
                            <Avatar
                                url="https://sun9-45.userapi.com/impf/c629123/v629123551/efc6/tNqzMrCl5AY.jpg?size=500x278&quality=96&sign=617ee745b3c77d334856035ed90f5b73&type=album"
                                size={150}
                            />
                        </div>
                        <div className="ml-16">
                            <div className="flex gap-5">
                                <button>{username}</button>

                                {isMyProfile ? <button>Edit Profile</button> : <button onClick={handleFollowButton}>{!isSubscribed ? "Follow" : "Unfollow"}</button>}
                                {isMyProfile ? <button>Settings</button> : <button>Отправить сообщение</button>}
                            </div>
                            <div className="flex gap-10">
                                <div>posts</div>
                                <div>{followers?.length || 0} subs</div>
                                <div>{followed?.length || 0} podpisok</div>
                            </div>
                        </div>
                    </div>

                    <ProfileContent username={username} isMyProfile={isMyProfile} />
                    <Outlet />
                </div>
            )}
        </div>
    );
};
