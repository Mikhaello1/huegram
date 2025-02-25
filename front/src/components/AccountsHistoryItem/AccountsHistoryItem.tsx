import { Avatar } from "../Avatar/Avatar";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { SearchHistoryItem } from "../../models/SearchHistoryItem";
import { useAddSearchAccountHistoryMutation, useDeleteFromSearchAccountHistoryMutation } from "../../store/reducers/SearchApi";
import { memo, useCallback } from "react";

interface AccountsHistoryItemProps{
    searchedUser: SearchHistoryItem;
}

export const AccountsHistoryItem: React.FC<AccountsHistoryItemProps> = memo(({searchedUser}) => {

    const {username, profilePic, fullname, userId, } = searchedUser;
    console.log(`РЕНДЕР HISTORYITEM id = ${userId}`)
    const [addSearchAccountHistory] = useAddSearchAccountHistoryMutation();
    const [deleteSearchAccountHistory] = useDeleteFromSearchAccountHistoryMutation();

    const deleteItemFromHistory = useCallback((userId: number) => {
        console.log("FUNCTION RERENDER!!!")
        deleteSearchAccountHistory({
            searcherId: 1,
            searchedId: userId
        })
    }, []);

    const handleLinkClick = () => {
        addSearchAccountHistory({searcherId: 1, searchedId: userId})
    }

  return (
    <div className="relative">
        <Link to={`/profile/${username}`} className="flex items-center w-100 border" onClick={handleLinkClick}>
            <div>
                <Avatar url={profilePic} size={`40`}/>
            </div>
            <div className="flex flex-col">
                <div>{username}</div>
                <div>{fullname}</div>
            </div>
        </Link>
        <div className="ml-auto absolute right-0 top-1/3" onClick={() => deleteItemFromHistory(userId)}>
                <MdOutlineCancel className=""/>
        </div>
    </div>
  )
})
