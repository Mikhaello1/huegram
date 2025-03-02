import { FC } from "react";
import { useLogoutMutation } from "../../store/reducers/api/AuthApi";
import { useAppDispatch } from "../../hooks/redux";
import { setIsAuth, setUserData } from "../../store/reducers/slices/UserSlice";
import { IUserData } from "../../types/UserDataTypes";
import { useNavigate } from "react-router-dom";


export const LogoutButton: FC = () => {

    const navigate = useNavigate()

    const [logout, _] = useLogoutMutation();

    const dispatch = useAppDispatch()

    const handleLogout = async () => {
        try{
            await logout();
            dispatch(setIsAuth(false));
            dispatch(setUserData({} as IUserData))
            localStorage.removeItem("access");
            console.log(localStorage.getItem("access"))
            navigate("/auth/login")

        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}