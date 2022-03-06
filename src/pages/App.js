import React from "react";
import Home from "./Home";
import {Route, Routes} from "react-router-dom";
import Register from "./Register";
import Error from "./Error";

function App() {
    return (
        <div className="App">
            <div style={{textAlign: "center"}}><h1>Master Tool</h1></div>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='*' element={<Error/>}/>
            </Routes>
        </div>
    );
}

export default App;
