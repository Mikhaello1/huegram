import { useRef, useState } from "react";
import { Logo } from "../Logo/Logo";
import { Link } from "react-router-dom";

export const Registration = () => {
    const passInpRef = useRef<HTMLInputElement>(null);
    const emailInpRef = useRef<HTMLInputElement>(null);
    const usernameInpRef = useRef<HTMLInputElement>(null);
    const fullNameInpRef = useRef<HTMLInputElement>(null);

    const [isDisableRegister, setIsDisableLogin] = useState<boolean>(true);

    const handleInputChange = () => {
        const isFilled = !!passInpRef.current?.value && !!emailInpRef.current?.value && !!usernameInpRef.current?.value && !!fullNameInpRef.current?.value;

        console.log(isFilled);
        setIsDisableLogin(!isFilled);
    };

    const handleRegister = () => {
        console.log("clicked");
    };

    return (
        <div className="flex flex-col mt-20">
            <div className="border border-black flex flex-col items-center px-6">
                <Logo styles="w-52 mt-10 mb-20" />

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

                <button className="rounded-lg bg-blue-500 w-72 h-8 disabled:opacity-75 mt-2 mb-5 hover:bg-blue-400 text-white" disabled={isDisableRegister} onClick={handleRegister}>
                    Зарегистрироваться
                </button>

                <span className="text-sm text-center mb-10">
                    Люди, которые пользуются нашим сервисом,
                    <br /> могли загрузить вашу контактную информацию
                    <br /> в Instagram.{" "}
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
            </div>
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
