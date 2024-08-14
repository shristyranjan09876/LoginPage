import React, { useState } from 'react';
import axios from 'axios';
import '../Style/Signup.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPs = () => {
    const [userDetails, setUserDetails] = useState({
        email: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = "";

        if (name === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                error = "Email is required.";
            } else if (!emailPattern.test(value)) {
                error = "Please enter a valid email address.";
            }
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        validateField('email', userDetails.email);

       
        if (errors.email) {
            toast.error("Please fix the errors before submitting.");
            return;
        }

        if (!userDetails.email) {
            toast.error("Email cannot be empty.");
            return;
        }

        try {
            const response = await axios.put('http://localhost:8082/users/resend_otp', {
                email: userDetails.email,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('API Response:', response.data); 
            if (response.data.code === 200) {
                toast.success("OTP has been sent to your email.");
                localStorage.setItem('fEmail', response.data.result.email);
                navigate('/Otp');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Request error:', error.response ? error.response.data : error.message);
            toast.error("Failed to send OTP. Please try again.");
        }
    };

    return (
        <>
            <h1>Email Verification</h1>
            <div className="form-container">
                <form onSubmit={handleFormSubmit} noValidate>
                    <label>Email:
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </label>
                    <input type="email" name="email" value={userDetails.email} onChange={handleInputChange} placeholder='Enter your email'  required   />
                    <br />
                    <button type="submit">Verify</button>
                </form>
                <ToastContainer />
            </div>
        </>
    );
};

export default ForgetPs;
