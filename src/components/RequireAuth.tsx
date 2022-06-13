import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../data-manage/hooks";
type AllowedRole = {
    allowedRoles: number[]
}

const RequireAuth = ({ allowedRoles }: AllowedRole) => {
    const { loggedIn, user, role } = useAppSelector(state => state.login)
    const location = useLocation();   

    return (
        loggedIn && allowedRoles.find(authRole => authRole === role) !== undefined ? <Outlet /> : user ?
            <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace /> 
    );
}

export default RequireAuth;