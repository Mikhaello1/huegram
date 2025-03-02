import { createSlice } from "@reduxjs/toolkit";
import { IUser, IUserData } from "../../../types/UserDataTypes";

interface UserState {
    userData: IUserData;
    isAuth: boolean

}

const initialState: UserState = {
    userData: {
        id: 0,
        email: "",
        username: "",
        fullname: "",
        profilePic: "",
        about: ""
    },
    isAuth: false
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setUserData: (state, { payload }) => {
            state.userData = payload;
        },

    }
})

export const { setIsAuth, setUserData } = UserSlice.actions;
export default UserSlice;