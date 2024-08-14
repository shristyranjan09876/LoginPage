import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import '../Style/Signup.css';

const OtpVerification = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            let ff = localStorage.getItem('fEmail');

           
            if (!ff) {
                toast.error("Email not found. Please try again.");
                return;
            }

            const response = await axios.post('http://localhost:8082/users/verify_otp', {
                otp: otp,
                email: ff 
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

           
            if (response && response.data) {
                if (response.data.code === 200) {
                    toast.success("OTP successfully verified.");
                    console.log(response.data);
                    navigate('/Newps'); 
                } else {
                    toast.error(response.data.message || "Verification failed.");
                }
            } else {
                toast.error("Unexpected response format from the server.");
            }
        } catch (error) {
            console.error('Error during OTP verification:', error.response ? error.response.data : error.message);
            toast.error("OTP verification failed. Please try again.");
        }
    };

    return (
        <div className="form-container">
            <h1>Verify OTP</h1>
            <form onSubmit={handleOtpSubmit}>
                <label>OTP:</label>
                <input type="text" name="otp" value={otp} onChange={handleOtpChange} maxLength="6" placeholder="Enter 6-digit OTP" required />
                <br/>
                <button type="submit">Verify</button>
            </form>
            <ToastContainer /> 
        </div>
    );
};

export default OtpVerification;
