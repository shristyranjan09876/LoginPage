import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/Signup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token){
            navigate("/home")
            }
    },[])

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "email":
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    error = "Email is required.";
                } else if (!emailPattern.test(value)) {
                    error = "Please enter a valid email address.";
                }
                break;
            case "password":
                if (!value) {
                    error = "Password is required.";
                } else if (value.length < 6) {
                    error = "Password must be at least 6 characters long.";
                }
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let valid = true;
        Object.keys(userDetails).forEach(key => {
            validateField(key, userDetails[key]);
            if (!userDetails[key] || errors[key]) {
                valid = false;
            }
        });

        if (!valid) {
            toast.error("Please fix the errors before submitting.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8082/users/user_signin', userDetails, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.code === 200) {
                console.log("response login", response)
                toast.success("Login successfully!");
                localStorage.setItem('fEmail', response.data.result.email);
                localStorage.setItem('token', response.data.result.jwtToken);
                navigate('/home');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Request error:', error.response ? error.response.data : error.message);
            toast.error("Failed to login. Please try again.");
        }
    };

    return (
        <>
            <h1>Log-In</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} noValidate>
                    <label>Email: <span style={{ color: 'red' }}>*</span>
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </label>
                    <input type="email" name="email" value={userDetails.email} onChange={handleInput}
                    />
                    <br />
                    <label>Password: <span style={{ color: 'red' }}>*</span>
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </label>
                    <input type="password" name="password" value={userDetails.password} onChange={handleInput} />
                    <br />
                    <button type="submit">Log In</button>
                    <p>Forget Password? <Link to='/ForgetPs'>Change Password</Link> <Link to='/'>Sign-Up</Link></p>
                </form>
                <ToastContainer />
            </div>
        </>
    );
};

export default Login;
