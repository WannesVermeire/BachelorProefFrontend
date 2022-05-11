import jwt_decode from "jwt-decode";


const isRole = (r)=>{
    let roles = null;
    if(localStorage.getItem('access_token')!=='undefined'){
        const decoded = jwt_decode(JSON.parse(localStorage.getItem('access_token')));
        roles = decoded.roles;
        for(let i = 0; i < roles.length; i++){
            if(r===roles[i])return true;
        }
    }
    return false;
}
export default isRole;