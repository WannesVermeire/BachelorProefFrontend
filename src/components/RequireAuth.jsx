import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({allowedRoles}) => {
    const { auth } = useAuth();
    const location = useLocation();


    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet/>
            : auth?.email
                //We kunnen knoppen verbergen waarvoor users niet geauthorized zijn maar
                //moesten users pagina's proberen te vinden via url is dit wel nodig
                ? <Navigate to ="/unauthorized" state={{ from: location}} replace />
                : <Navigate to={"/login"} state={{from: location}} replace />
    );
}

export default RequireAuth;