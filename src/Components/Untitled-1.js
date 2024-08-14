
import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import '../Style/Signup.css';

const ForgetPs = () => {
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    });


    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8082/users/resend_otp', {
                email: userDetails.email,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                alert("Login Succefully.");
                localStorage.setItem('fEmail', response.data.result.email)
                console.log(response.data);
                Navigate('/otp')
            } else {
                alert("Unexpected response status: " + response.status);
            }
        } catch (error) {
            console.error('Request error:', error.response ? error.response.data : error.message);
            alert("Failed to Login. Please try again.");
        }
    };


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:8082/users/user_signin', {
    //             email: userDetails.email,
    //             password: userDetails.password
    //         }, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
           
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error('Error during login:', error);
    //     }
      
    // };

    return (
        <>
        <h1>Log-In</h1>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>Email:<span style={{color:'red'}}>*</span></label>
                <input type="email" name="email" value={userDetails.email} onChange={handleInput} required />
                <br />
                <label>Password:<span style={{color:'red'}}>*</span></label>
                <input type="password" name="password" value={userDetails.password} onChange={handleInput} required/>
                <br />
                <button type="submit">Log In</button>
                <p>Forget Password <Link to='/ForgetPs'>Change Password</Link>    <Link  to='/'>Sign-Up</Link></p>
            </form>
        </div>
        </>
    );
};

export default ForgetPs;
