import { useEffect, useState } from "react";
import { useRefreshMutation } from "../store/reducers/api/AuthApi";
import { setIsAuth, setUserData } from "../store/reducers/slices/UserSlice";
import { useAppDispatch } from "./redux";

export const useCheckAuth = async () => {

    const [error, setError] = useState<string>("");

    useEffect(() => {
        try {
           
            console.log(err);
        }
    }, []);
};
