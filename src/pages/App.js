import React from "react";
import Home from "./Home";
import {Route, Routes} from "react-router-dom";
import Register from "./Register";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </div>
    );
}

export default App;
