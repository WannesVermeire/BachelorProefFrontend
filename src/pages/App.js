import React,{Component} from "react";
import Home from "./Home";
import {Link, Route, Routes} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Layout from "../components/Layout"
import RequireAuth from "../components/RequireAuth";
import Unauthorized from "./Unauthorized";
import Subjects from "./Subjects";
import SubjectForm from "./SubjectForm";
import StudentDetails from "./StudentDetails";
import PromotorDetails from "./PromotorDetails";
import CompanyDetails from "./CompanyDetails";
import TargetAudienceUser from "./TargetAudienceUser";
import FinalSubject from "./FinalSubject";
import UserDetails from "./UserDetails";
import TargetAudienceSubject from "./TargetAudienceSubject";


import Error from "./Error";
import UserList from "./UserList";
import axios from "axios";
import RegisterCompany from "./RegisterCompany";



class App extends Component {
    render(){
        return (
            <div className="App">
                <Routes>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path={'/unauthorized'} element={<Unauthorized/>}/>
                    <Route path="/" element={<Layout/>}>
                        <Route element={<RequireAuth allowedRoles={["ROLE_STUDENT","ROLE_ADMIN","ROLE_PROMOTOR", "ROLE_COORDINATOR", "ROLE_CONTACT"]}/>}>
                            <Route path='/' element={ <Home />}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN","ROLE_COORDINATOR"]}/>}>
                            <Route path='/userlist' element={<UserList/>}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN","ROLE_COORDINATOR"]}/>}>
                            <Route path='/registerCompany' element={<RegisterCompany/>}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN","ROLE_COORDINATOR"]}/>}>
                            <Route path='/studentDetails/:id' element={<StudentDetails/>}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN","ROLE_COORDINATOR"]}/>}>
                            <Route path='/promotorDetails/:id' element={<PromotorDetails/>}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN","ROLE_COORDINATOR"]}/>}>
                            <Route path='/companyDetails/:id' element={<CompanyDetails/>}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={["ROLE_STUDENT","ROLE_ADMIN","ROLE_PROMOTOR", "ROLE_COORDINATOR", "ROLE_CONTACT"]}/>}>
                            <Route path='/subjects' element={<Subjects />}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={["ROLE_STUDENT","ROLE_ADMIN","ROLE_PROMOTOR", "ROLE_COORDINATOR", "ROLE_CONTACT"]}/>}>
                            <Route path='/subjectForm' element={<SubjectForm />}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={["ROLE_STUDENT","ROLE_ADMIN","ROLE_COORDINATOR"]}/>}>
                            <Route path='/targetAudienceUser:id' element={<TargetAudienceUser />}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={["ROLE_STUDENT"]}/>}>
                            <Route path='/finalSubject' element={<FinalSubject />}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={["ROLE_STUDENT","ROLE_ADMIN","ROLE_PROMOTOR", "ROLE_COORDINATOR", "ROLE_CONTACT"]}/>}>
                            <Route path='/userDetails' element={<UserDetails />}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN","ROLE_PROMOTOR", "ROLE_COORDINATOR", "ROLE_CONTACT"]}/>}>
                            <Route path='/targetAudienceSubject:id' element={<TargetAudienceSubject />}/>
                        </Route>
                        <Route path='*' element={<Error/>}/>
                    </Route>
                </Routes>
            </div>
        );
    }
}

export default App;
