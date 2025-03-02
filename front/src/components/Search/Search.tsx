import { MdOutlineCancel } from "react-icons/md";
import { AccountsHistoryList } from "../AccountsHistoryList/AccountsHistoryList";
import { useCallback, useEffect, useState } from "react";
import { useGetSearchHistoryQuery, useGetSearchUsersByUsernameQuery } from "../../store/reducers/api/SearchApi";
import { SearchHistoryItem } from "../../models/SearchHistoryItem";
import { useAppSelector } from "../../hooks/redux";

export const Search = () => {
    
    const [accountsSearchHistory, setAccountsSearchHistory] = useState<SearchHistoryItem[] | undefined>([]);
    const [inputValue, setInputValue] = useState<string>("");

    const myUserId = useAppSelector(state => state.user.userData.id)

    const { data: history, isLoading: isHistoryLoading } = useGetSearchHistoryQuery(myUserId);
    
    
    const { data : foundAccounts } = useGetSearchUsersByUsernameQuery({searchQuery: inputValue, searcherId: 1}, { skip: !inputValue });
    

    useEffect(() => {
        const newHistory = !inputValue ? history : foundAccounts;
        if (accountsSearchHistory !== newHistory) {
            setAccountsSearchHistory(newHistory);
        }
    }, [inputValue, history, foundAccounts]);



    const handleEraseText = useCallback(() => {
        setInputValue("");
    }, []);

    const handleClearHistory = useCallback(() => {
        // setAccountsSearchHistory([]);
    }, []);


    if (isHistoryLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="px-5 border max-h-full flex flex-col">
            <h1 className="my-5">Поисковой запрос</h1>
            <div className="flex justify-center border items-center rounded-lg">
                <input 
                    className="border-none outline-none p-2" 
                    value={inputValue} 
                    onChange={(event) => { setInputValue(event.target.value); }}
                />
                <div onClick={handleEraseText}>
                    <MdOutlineCancel />
                </div>
            </div>
            <hr className="my-5" />
            <div className="flex justify-between">
                <h1>Недавнее</h1>
                <h1 onClick={handleClearHistory} className="hover:cursor-pointer select-none">Очистить все</h1>
            </div>
            <AccountsHistoryList searchHistory={accountsSearchHistory} />
            
        
        </div>
    );
};