import { useAppSelector } from "../../hooks/redux"


export const Home = () => {

    const user = useAppSelector(state => state.user.userData)

    return (
        <div>
            {JSON.stringify(user)}
        </div>
    )
}