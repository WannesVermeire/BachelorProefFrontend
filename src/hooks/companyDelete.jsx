import backendURL from "../backendURL";
const axios = require("axios");
const companyDelete =(id)=>{
    let axios = require('axios');
    let config = {
        method: 'delete',
        url: backendURL + '/userManagement/company/' + id,
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
        },
    };
    axios(config)
        .then(function (response) {
        })
        .catch(function (error) {
            console.log(error);
        });
}
export default companyDelete;