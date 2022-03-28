import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from 'jwt-decode';

const RequireAuth = ({allowedRoles}) => {
    const { auth } = useAuth();
    const location = useLocation();

    let roles = null;
    if(localStorage.getItem('access_token') != 'undefined'){
        const decoded = jwt_decode(JSON.parse(localStorage.getItem('access_token')));
        if(decoded != null) roles = decoded.roles;
    }


    return (
        roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet/>
            : roles
                //We kunnen knoppen verbergen waarvoor users niet geauthorized zijn maar
                //moesten users pagina's proberen te vinden via url is dit wel nodig
                ? <Navigate to ="/unauthorized" state={{ from: location}} replace />
                : <Navigate to={"/login"} state={{from: location}} replace />
    );
}

export default RequireAuth;