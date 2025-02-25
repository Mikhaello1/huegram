import { AccountsHistoryItem } from "../AccountsHistoryItem/AccountsHistoryItem";
import { SearchHistoryItem } from "../../models/SearchHistoryItem";
import { memo } from "react";

interface AccountsHistoryListProps{
  searchHistory: SearchHistoryItem[] | undefined;
}

export const AccountsHistoryList: React.FC<AccountsHistoryListProps> = memo(({searchHistory}) => {

  console.log(`РЕНДЕР HISTORYLIST`)
  return (
    <div className="overflow-auto border">

        {searchHistory && searchHistory.length ? searchHistory.map((user => 
          <AccountsHistoryItem
            searchedUser={user}
            key={user.id}/>
        )) : (<span>Unluck</span>)}

        
    </div>
  )
})
