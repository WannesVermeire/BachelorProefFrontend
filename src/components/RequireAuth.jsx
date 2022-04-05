import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from 'jwt-decode';
import axios from "axios";

const RequireAuth = ({allowedRoles}) => {
    const { auth } = useAuth();
    const location = useLocation();

    let roles = null;
    if(localStorage.getItem('access_token') !== 'undefined'){
        let expTime_at = localStorage.getItem('access_token_expired');
        let expTime_rt = localStorage.getItem('refresh_token_expired');
        let curTime = new Date().getTime();
        console.log("atexp: " + expTime_at +"\n" + "rtexp: " + expTime_rt + "\n" + "curTi: " + curTime);
        if(expTime_at>curTime){
            const decoded = jwt_decode(JSON.parse(localStorage.getItem('access_token')));
            if(decoded != null) roles = decoded.roles;
        }
        else if(expTime_rt>curTime){
            let config = {
                method: 'get',
                url: 'http://localhost:8081/authentication/token/refresh',
                headers:{
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('refresh_token'))
                }
            }
            axios(config).then(function(res){
                localStorage.setItem("access_token", JSON.stringify(res.data.access_token));
                let time = new Date().getTime();//getTime gives the amount of millieseconds that have passed since January 1st 1970
                let access_token_expired = new Date(time + 40*60*1000).getTime();
                localStorage.setItem("access_token_expired", JSON.stringify(access_token_expired));
            }).catch(function (error) {
            });
            const decoded = jwt_decode(JSON.parse(localStorage.getItem('access_token')));
            if(decoded != null) roles = decoded.roles;
        }
        console.log(roles);
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