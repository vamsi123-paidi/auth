// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post(
                'https://auth-epv2.onrender.com/api/auth/login',
                { email, password },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            if (res.status === 200) {
                // Store token or user data if needed
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/dashboard'); // Redirect to protected route
            }
        } catch (err) {
            setError(
                err.response?.data?.message || 
                'Login failed. Please check your credentials.'
            );
            console.error('Login error:', err.response?.data || err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;