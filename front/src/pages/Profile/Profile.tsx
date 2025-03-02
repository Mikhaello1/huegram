import { Outlet, useParams } from "react-router-dom";
import { Avatar } from "../../components/Avatar/Avatar";
import styles from "./Profile.module.scss";
import { ProfileContent } from "../../components/ProfileContent/ProfileContent";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";

export const Profile = () => {
    const { username } = useParams();
    const [isMyProfile, setIsMyProifle] = useState<boolean>(false);
    const myUsername = useAppSelector((state) => state.user.userData.username);

    useEffect(() => {
        if (username == myUsername) setIsMyProifle(true);
        else setIsMyProifle(false);
    });
    console.log(username)

    return (
        <div className={styles.profilePage}>
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

                            {isMyProfile ? <button>Edit Profile</button> : <button>Подписаться</button>}
                            {isMyProfile ? <button>Settings</button> : <button>Отправить сообщение</button>}

                            
                        </div>
                        <div className="flex gap-10">
                            <div>posts</div>
                            <div>subs</div>
                            <div>podpisok</div>
                        </div>
                    </div>
                </div>

                <ProfileContent username={username} isMyProfile={isMyProfile}/>
                <Outlet /> 
                
            </div>
        </div>
    );
};
