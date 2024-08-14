import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import ForgetPs from './Components/ForgetPs';
import Otp from './Components/Otp'
import Newps from './Components/Newps'
import PrivateRoute from './Router/PrivateRoute'
import HomePage from './Components/Home';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgetPs" element={<ForgetPs/>}/>
            <Route path="/otp" element={<Otp/>}/>
            <Route path="/newps" element={<Newps/>}/>
            {/* <Route path="/home" element={<PrivateRoute><HomePage/></PrivateRoute>}/> */}
            <Route element={<PrivateRoute/>}>
                <Route path="/home" element={<HomePage/>}/>
            </Route>
        </Routes>
    );
};

export default App;
