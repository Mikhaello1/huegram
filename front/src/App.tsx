import { Route, Routes, useLocation } from "react-router-dom";
import styles from './App.module.scss'

import { Sidebar } from "./components/Sidebar/Sidebar";
import { Search } from "./components/Search/Search";
import { useEffect, useState } from "react";

import { Auth } from "./pages/Auth/Auth";

import { protectedRoutes } from "./routes/protectedRoutes";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useRefreshMutation } from "./store/reducers/api/AuthApi";

import { useAppDispatch } from "./hooks/redux";
import { setIsAuth, setUserData } from "./store/reducers/slices/UserSlice";

function App() {
    const location = useLocation();

    const isAuthRoute = location.pathname.startsWith("/auth");

    const [isSearchModal, setIsSearchModal] = useState<boolean>(false);

    const [refresh, _] = useRefreshMutation();
    const dispatch = useAppDispatch();

    const handleSearchModal = () => {
        setIsSearchModal(!isSearchModal);
    };

    useEffect(() => {
        console.log("access = ", localStorage.getItem("access"))
        if (!localStorage.getItem("access")) return;
        const checkAuth = async () => {
            console.log(1)
            const response = await refresh().unwrap();
            localStorage.setItem("access", response.accessToken);
            dispatch(setIsAuth(true));
            console.log(response)
            const { id, email, username, about, profilePic, accessToken } = response;
            console.log({ id, email, username, about, profilePic, accessToken })
            dispatch(setUserData({ id, email, username, about, profilePic }));
        };

        checkAuth();

    }, []);

    return (
        <div className={styles.App}>
            {!isAuthRoute && <Sidebar handleSearchModal={handleSearchModal} isSearchModal={isSearchModal} setIsSearchModal={setIsSearchModal} />}

            {isSearchModal && <Search />}

            <div className={styles.mainContent}>   
                <Routes>
                    <Route path="/auth/:authType" element={<Auth />} />

                    {/* {authRoutes.map(({path, Element}) => {
                        return (
                            <Route key={path} path={path} element={
                                <Element />
                            }/>
                        )
                    })} */}
                    {protectedRoutes.map(({ path, Element }) => {
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    <ProtectedRoute>
                                        <Element />
                                    </ProtectedRoute>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </div>
    );
}

export default App;
