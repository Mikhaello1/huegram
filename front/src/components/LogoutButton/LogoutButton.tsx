import { FC } from "react";
import { useLogoutMutation } from "../../store/reducers/AuthApi";


export const LogoutButton: FC = () => {

    const [logout, _] = useLogoutMutation();

    const handleLogout = async () => {
        try{
            await logout();
            localStorage.removeItem("access");
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