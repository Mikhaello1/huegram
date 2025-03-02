import { NavElement } from "../NavElement/NavElement";
import { IoHome } from "react-icons/io5";
import { Avatar } from "../Avatar/Avatar";
import { IoSearch } from "react-icons/io5";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";

interface NavigationProps {
  isSearchModal: boolean;
  setIsSearchModal: Dispatch<SetStateAction<boolean>>;
  handleSearchModal: () => void; 
}

export const Navigation: React.FC<NavigationProps> = ({
  isSearchModal,
  setIsSearchModal,
  handleSearchModal
}) => {

  const [myUsername, setMyUsername] = useState<string>('')

  const username = useAppSelector(state => state.user.userData.username)

  useEffect(() => {
    setMyUsername(username)
  })

  return (
    <div>
      <NavElement
        img={<IoHome size={25} />}
        text="Главная"
        path="/"
        isSearchModal={isSearchModal}
        setIsSearchModal={setIsSearchModal}
      />
      <NavElement
        img={<IoSearch size={25} />}
        text="Поисковой запрос"
        isSearchModal={isSearchModal}
        setIsSearchModal={setIsSearchModal}
        handleSearchModal={handleSearchModal}
      />
      <NavElement
        img={
          <Avatar
            url="https://sun9-45.userapi.com/impf/c629123/v629123551/efc6/tNqzMrCl5AY.jpg?size=500x278&quality=96&sign=617ee745b3c77d334856035ed90f5b73&type=album"
            size={30}
          />
        }
        text="Профиль"
        path={`/profile/${myUsername}`}
        isSearchModal={isSearchModal}
        setIsSearchModal={setIsSearchModal}
      />
    </div>
  );
};
