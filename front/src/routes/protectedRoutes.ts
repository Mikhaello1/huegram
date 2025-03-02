
import { Home } from "../pages/Home/Home";
import { Profile } from "../pages/Profile/Profile";


export const protectedRoutes = [
    {
        path: "/",
        Element: Home
    },
    {
        path: "/profile/:username/*",
        Element: Profile
    }
]