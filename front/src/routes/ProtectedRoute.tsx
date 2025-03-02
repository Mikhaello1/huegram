
import { Navigate } from "react-router-dom";
import { FC, ReactNode, useEffect } from "react";
import { useRefreshMutation } from "../store/reducers/api/AuthApi";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setIsAuth, setUserData } from "../store/reducers/slices/UserSlice";



interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {

    const [refresh, _] = useRefreshMutation();
    const dispatch = useAppDispatch();

    const isAuthenticated = localStorage.getItem("access")


    useEffect(() => {
        console.log("access = ", localStorage.getItem("access"))
        console.log(!localStorage.getItem("access"))
        if (!localStorage.getItem("access")){
            // setIsAuth(false)
            return;
        } 
        const checkAuth = async () => {
            console.log(1)
            const response = await refresh().unwrap();
            localStorage.setItem("access", response.accessToken);
            dispatch(setIsAuth(true));
            console.log(response)
            const { id, email, username, about, profilePic, accessToken } = response;
            console.log({ id, email, username, about, profilePic, accessToken })
            dispatch(setUserData({ id, email, username, about, profilePic }));
        };

        checkAuth();

    }, []);
    
    
    return isAuthenticated ? children : <Navigate to="/auth/login" />;
};