import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
 const logout = ()=>{
    // localStorage.removeItem('token');
    localStorage.clear()
    navigate("/login")

 }

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page after a successful login.</p>
            <button onClick={logout} type='button'>Logout</button>
        </div>
    );
};

export default HomePage;
