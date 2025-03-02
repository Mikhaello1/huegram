import { Avatar } from "../Avatar/Avatar";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { SearchHistoryItem } from "../../models/SearchHistoryItem";
import { useAddSearchAccountHistoryMutation, useDeleteFromSearchAccountHistoryMutation } from "../../store/reducers/api/SearchApi";
import { memo, useCallback } from "react";
import { useAppSelector } from "../../hooks/redux";

interface AccountsHistoryItemProps{
    searchedUser: SearchHistoryItem;
}

export const AccountsHistoryItem: React.FC<AccountsHistoryItemProps> = memo(({searchedUser}) => {

    const {username, profilePic, fullname, userId, } = searchedUser;
    const [addSearchAccountHistory] = useAddSearchAccountHistoryMutation();
    const [deleteSearchAccountHistory] = useDeleteFromSearchAccountHistoryMutation();

    const myUserId = useAppSelector(state => state.user.userData.id)

    const deleteItemFromHistory = useCallback((userId: number) => {
        deleteSearchAccountHistory({
            searcherId: myUserId,
            searchedId: userId
        })
    }, [deleteSearchAccountHistory]);

    const handleLinkClick = useCallback(() => {
        addSearchAccountHistory({searcherId: myUserId, searchedId: userId})
    }, [addSearchAccountHistory])

  return (
    <div className="relative">
        <Link to={`/profile/${username}`} className="flex items-center w-100 border" onClick={handleLinkClick}>
            <div>
                <Avatar url={profilePic} size={40}/>
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
