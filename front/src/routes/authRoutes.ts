import { Login } from "../components/Login/Login";
import { Registration } from "../components/Registration/Registration";

// const authRoutePath = "/auth"

const authRoutes = [
    {
        path: "/auth/login",
        Element: Login
    },
    {
        path: "/auth/registration",
        Element: Registration
    }
]

export default authRoutes
// .map(el => {
//     return {
//         path: authRoutePath + el.path,
//         Element: el.Element
//     }
// })