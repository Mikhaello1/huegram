import { ReactNode, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

interface NavElementProps {
  img: ReactNode;
  text: string;
  path?: string;
  isSearchModal: boolean;
  setIsSearchModal: Dispatch<SetStateAction<boolean>>;
  handleSearchModal?: () => void;
}

export const NavElement: React.FC<NavElementProps> = ({
  img,
  text,
  path,
  isSearchModal,
  setIsSearchModal,
  handleSearchModal
}) => {
  const currentPath = useLocation();

  const handleNavClick = useCallback(() => {
    handleSearchModal ? setIsSearchModal(!isSearchModal) : setIsSearchModal(false);
    console.log(isSearchModal);
  }, [isSearchModal]);

  return isSearchModal ? (
    <Link to={path ? path : currentPath}>
      <div
        className="flex items-center py-2 hover:bg-red-200 transition-all rounded-lg h-12"
        onClick={handleNavClick}
      >
        <div className="flex justify-center items-center w-14">{img}</div>
      </div>
    </Link>
  ) : (
    <Link to={path ? path : currentPath}>
      <div
        className="flex items-center py-2 hover:bg-red-200 transition rounded-lg h-12"
        onClick={handleNavClick}
      >
        <div className="flex justify-center items-center w-14">{img}</div>
        <div className="flex items-center w-100">{text}</div>
      </div>
    </Link>
  );
};
