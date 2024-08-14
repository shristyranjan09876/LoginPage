import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Style/Signup.css';

const SetNewPassword = () => {
    const [passwords, setPasswords] = useState({
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setPasswords((prevPasswords) => ({
            ...prevPasswords,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (passwords.password === "") {
            setError("Password is required.");
            toast.error("Password is required.");
            return;
        }

        if (passwords.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        if (passwords.password !== passwords.confirmPassword) {
            setError("Passwords do not match.");
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const email = localStorage.getItem('fEmail');
            const response = await axios.post('http://localhost:8082/users/forgot_password', {
                password: passwords.password,
                email: email
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.code === 200) {
                toast.success("Password successfully updated.");
                console.log("successfully changed")
                setTimeout(()=>{
                   navigate('/Login'); 
                },1000)
                
            } else {
                setError(response.data.message || "Failed to update password. Please try again.");
                toast.error(response.data.message || "Failed to update password. Please try again.");
            }
        } catch (error) {
            console.error('Error during password update:', error.response ? error.response.data : error.message);
            setError("Failed to update password. Please try again.");
            toast.error("Failed to update password. Please try again.");
        }
    };

    return (
        <div className="form-container">
            <h1>Set New Password</h1>
            <form onSubmit={handleSubmit}>
                <label>New Password:</label>
                <input type="password" name="password" value={passwords.password} onChange={handleInput} placeholder="Enter new password" required />
                <br/>
                <label>Confirm Password:</label>
                <input type="password" name="confirmPassword"value={passwords.confirmPassword}onChange={handleInput} placeholder="Confirm new password" 
                    required />
                <br/>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Submit</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SetNewPassword;
