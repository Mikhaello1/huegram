import { Navigation } from "../Navigation/Navigation";
import { Logo } from "../Logo/Logo";
import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

interface SidebarProps{
  handleSearchModal: () => void;
  isSearchModal: boolean;
  setIsSearchModal: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({handleSearchModal, isSearchModal, setIsSearchModal}) => {

  return (
    <div className={`border pt-5 px-5`}>
        
        {!isSearchModal && 
          (<Link to="/">
            <Logo styles="w-52"/>
          </Link>)
        }
        

        <Navigation isSearchModal={isSearchModal} setIsSearchModal={setIsSearchModal} handleSearchModal={handleSearchModal}/>
        
        <div>

        </div>
    </div>
  )
}
