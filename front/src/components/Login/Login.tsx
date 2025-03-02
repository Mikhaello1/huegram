import { FC, useCallback, useRef, useState } from "react";
import { Logo } from "../Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/reducers/api/AuthApi";
import { ILoginCredentials } from "../../types/UserDataTypes";

import { setIsAuth, setUserData } from "../../store/reducers/slices/UserSlice";
import { useAppDispatch } from "../../hooks/redux";

export const Login: FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const passInpRef = useRef<HTMLInputElement>(null);
    const logInpRef = useRef<HTMLInputElement>(null);

    const [isDisableLogin, setIsDisableLogin] = useState<boolean>(true);
    const [login, {isLoading, error}] = useLoginMutation();

    const handleInputChange = useCallback(() => {
        const isFilled = passInpRef.current?.value && logInpRef.current?.value;

        console.log(isFilled);
        setIsDisableLogin(!isFilled);
    }, [setIsDisableLogin]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            if(passInpRef.current?.value && logInpRef.current?.value){
                const loginData: ILoginCredentials = {
                    email: logInpRef.current?.value,
                    password: passInpRef.current?.value
                }
                const response = await login(loginData).unwrap();

                const {id, username, email, fullname, profilePic, about, accessToken} = response;
                
                localStorage.setItem("access", accessToken);
                dispatch(setUserData({id, username, email, fullname, profilePic, about}));
                dispatch(setIsAuth(true));
                navigate('/')
            }
        }
        catch(err){
            console.log(err)
        }
    };

    return (
        <div className="flex flex-col">
            <form className="border border-black flex flex-col items-center" onSubmit={handleLogin}>
                <Logo styles="w-52 mt-10 mb-20" />

                <input
                    type="text"
                    onChange={handleInputChange}
                    ref={logInpRef}
                    placeholder="Эл. адрес"
                    className="border-2 border-solid border-black rounded-md w-72 h-10 pl-2 mb-3 text-sm"
                />
                <input
                    type="text"
                    onChange={handleInputChange}
                    ref={passInpRef}
                    placeholder="Пароль"
                    className="border-2 border-solid border-black rounded-md w-72 h-10 pl-2 mb-3 text-sm"
                />

                <button 
                    className="rounded-lg bg-blue-500 w-72 h-8 disabled:opacity-75 mt-2 mb-5 text-white hover:bg-blue-400" 
                    disabled={isDisableLogin} 
                    type="submit">

                    {isLoading ? "Думаем..." : "Войти"}

                </button>

                <div className="mb-3 flex">
                    <hr className="w-28 mt-3 mr-3 border-black"/>
                    <span className="">ИЛИ</span>
                    <hr className="w-28 mt-3 ml-3 border-black" />
                </div>

                <Link to="/" className="mb-5 text-md">
                    Забыли пароль?
                </Link>

            </form>
            <div className="border border-black flex justify-center mt-2">
                <div className="m-5">

                    <span>У вас ещё нет аккаунта? </span>
                    <Link to="/auth/registration" className="font-semibold text-blue-500">
                        Зарегистрироваться
                    </Link>
                    
                </div>
            </div>
        </div>
    );
};
