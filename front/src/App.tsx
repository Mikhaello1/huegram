import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { Profile } from "./pages/Profile/Profile";
import { Home } from "./pages/Home/Home";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Search } from "./components/Search/Search";
import { useEffect, useState } from "react";
import { useAppSelector } from "./hooks/redux";
// import { useGetSearchHistoryQuery } from './store/reducers/SearchAPI'
import { IUser } from "./models/IUser";
import axios from "axios";
import { Auth } from "./pages/Auth/Auth";

function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const accessToken = localStorage.getItem('access')
    console.log(accessToken)
    if(!accessToken) navigate('/auth/login')

    const isAuthRoute = location.pathname.startsWith("/auth");

    const [isSearchModal, setIsSearchModal] = useState<boolean>(false);

    const handleSearchModal = () => {
        setIsSearchModal(!isSearchModal);
    };

    return (
        <div className="flex h-screen">
            {
              !isAuthRoute && 
                <Sidebar handleSearchModal={handleSearchModal} isSearchModal={isSearchModal} setIsSearchModal={setIsSearchModal} />
            }
            

            {isSearchModal && <Search />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/auth/:authType" element={<Auth />} />
            </Routes>
        </div>
    );
}

export default App;
