import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Style/Signup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token){
            navigate("/home")
            }
    },[])

    const handleChange = (e) => {
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
            case "firstName":
                if (!value) {
                    error = "First name is required.";
                } else if (value.length < 3) {
                    error = "First name must be at least 3 characters long.";
                }
                break;
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
            case "phone":
                const phonePattern = /^[0-9]+$/;
                if (!value) {
                    error = "Phone number is required.";
                } else if (!phonePattern.test(value)) {
                    error = "Phone number must contain only digits.";
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
            const response = await axios.post('http://localhost:8082/users/user_signup', {
                email: userDetails.email,
                password: userDetails.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data);
            toast.success("User created successfully!");
        } catch (error) {
            console.error('Error during signup:', error);
            toast.error("Failed to create user. Please try again.");
        }
    };

    return (
        <>
            <h1>Sign-Up</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} noValidate>
                    <label>First Name: <span style={{color:'red'}}>*</span>
                        {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </label>
                    <input type="text" name="firstName" value={userDetails.firstName} onChange={handleChange}/>
                    <br/>
                    <label>Last Name:</label>
                    <input type="text"  name="lastName" value={userDetails.lastName} onChange={handleChange}/>
                    <br/>
                    <label>Email: <span style={{color:'red'}}>*</span>
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </label>
                    <input type="email" name="email" value={userDetails.email} onChange={handleChange} />
                    <br/>
                    <label>Password: <span style={{color:'red'}}>*</span>
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </label>
                    <input type="password" name="password" value={userDetails.password} onChange={handleChange}/>
                    <br/>
                    <label>Phone: <span style={{color:'red'}}>*</span>
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </label>
                    <input type="text" name="phone" value={userDetails.phone} onChange={handleChange} 
                    />
                    <br/>
                    <button type="submit">Sign-Up</button> 
                    <p>Don't have an account? <Link to="/login">Login</Link></p>
                </form>
                <ToastContainer />
            </div>
        </>
    );
};

export default Signup;
