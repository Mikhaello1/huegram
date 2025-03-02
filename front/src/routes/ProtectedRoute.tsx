
import { Navigate } from "react-router-dom";
import { FC, ReactNode } from "react";


interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = localStorage.getItem("access");
    
    return isAuthenticated ? children : <Navigate to="/auth/login" />;
};