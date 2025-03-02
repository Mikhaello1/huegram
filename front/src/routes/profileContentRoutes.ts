import { Login } from "../components/Login/Login"
import { Registration } from "../components/Registration/Registration"



const profileContentRoutes = [
    {
        path: "",
        Element: Login
    },
    {
        path: "saved",
        Element: Registration
    },
    {
        path: "tagged",
        Element: Login
    },
];

export default profileContentRoutes

