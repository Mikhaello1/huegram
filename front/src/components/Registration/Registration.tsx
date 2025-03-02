import { useRef, useState } from "react";
import { Logo } from "../Logo/Logo";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../store/reducers/api/AuthApi";
import { IRegisterCredentials } from "../../types/UserDataTypes";


export const Registration = () => {
    const passInpRef = useRef<HTMLInputElement>(null);
    const emailInpRef = useRef<HTMLInputElement>(null);
    const usernameInpRef = useRef<HTMLInputElement>(null);
    const fullNameInpRef = useRef<HTMLInputElement>(null);

    const [isDisableRegister, setIsDisableLogin] = useState<boolean>(true);
    const [registerError, setRegisterError] = useState<string>('');
    const [register, {isLoading, error}] = useRegisterMutation();

    const handleInputChange = () => {
        const isFilled = passInpRef.current?.value && emailInpRef.current?.value && usernameInpRef.current?.value && fullNameInpRef.current?.value;

        
        setIsDisableLogin(!isFilled);
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try{
            if (passInpRef.current?.value && emailInpRef.current?.value && usernameInpRef.current?.value && fullNameInpRef.current?.value){
                const registerData: IRegisterCredentials = {
                    email: emailInpRef.current?.value,
                    username: usernameInpRef.current?.value,
                    fullname: fullNameInpRef.current?.value,
                    password: passInpRef.current?.value
                }
                const tokens = await register(registerData).unwrap();
                console.log(tokens)
                localStorage.setItem("access", tokens.accessToken);
            }
            
        }
        catch(err: any){
            setRegisterError(err.message && err.message)
        }
    };

    return (
        <div className="flex flex-col mt-20">
            <form className="border border-black flex flex-col items-center px-6" onSubmit={handleRegister}>
                <Logo styles="w-52 mt-10 mb-20" />
                {error && <p style={{ color: 'red' }}>{registerError}</p>}
                <input
                    type="text"
                    onChange={handleInputChange}
                    ref={emailInpRef}
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
                <input
                    type="text"
                    onChange={handleInputChange}
                    ref={fullNameInpRef}
                    placeholder="Имя и фамилия"
                    className="border-2 border-solid border-black rounded-md w-72 h-10 pl-2 mb-3 text-sm"
                />
                <input
                    type="text"
                    onChange={handleInputChange}
                    ref={usernameInpRef}
                    placeholder="Имя пользователя"
                    className="border-2 border-solid border-black rounded-md w-72 h-10 pl-2 mb-3 text-sm"
                />

                <button className="rounded-lg bg-blue-500 w-72 h-8 disabled:opacity-75 mt-2 mb-5 hover:bg-blue-400 text-white" disabled={isDisableRegister} type="submit">
                    {isLoading ? "Загрузка" : "Зарегистрироваться"}
                </button>

                <span className="text-sm text-center mb-10">
                    Люди, которые пользуются нашим сервисом,
                    <br /> могли загрузить вашу контактную информацию
                    <br /> в Huegram.{" "}
                    <a className="text-blue-500" href="https://www.google.com/search?q=idi+naxuy">
                        Подробнее
                    </a>
                    <br />
                    <br /> Регистрируясь, вы принимаете наши{" "}
                    <a className="text-blue-500" href="https://www.google.com/search?q=idi+naxuy">
                        Условия
                    </a>
                    ,<br />
                    <a className="text-blue-500" href="https://www.google.com/search?q=idi+naxuy">
                        Политику конфиденциальности
                    </a>{" "}
                    и{" "}
                    <a className="text-blue-500" href="https://www.google.com/search?q=idi+naxuy">
                        Политику в<br /> отношении файлов cookie
                    </a>
                    .
                </span>
            </form>
            <div className="border border-black flex justify-center mt-2 mb-5">
                <div className="m-5">
                    <span>Есть аккаунт? </span>
                    <Link to="/auth/login" className="font-semibold text-blue-500">
                        Вход
                    </Link>
                </div>
            </div>
        </div>
    );
};
