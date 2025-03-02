import { FC, useEffect, useState } from "react";
import { Route, Routes, Outlet, Link } from "react-router-dom";
import profileContentRoutes from "../../routes/profileContentRoutes";
import { useAppSelector } from "../../hooks/redux";

interface ProfileContentProps {
    username: string | undefined;
    isMyProfile: boolean;
}

export const ProfileContent: FC<ProfileContentProps> = ({ username, isMyProfile }) => {
    

    return (
        <div>
            <nav>
                <Link to={`/profile/${username}/`}>Публикации</Link>
                {isMyProfile && <Link to={`/profile/${username}/saved`}>Подписки</Link>}
                <Link to={`/profile/${username}/tagged`}>Информация</Link>
            </nav>
            <Routes>
                {profileContentRoutes.map(({ path, Element }) => {
                    return <Route key={path} path={path} element={<Element />} />;
                })}
            </Routes>
            <Outlet />
        </div>
    );
};
