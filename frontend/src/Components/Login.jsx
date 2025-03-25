// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await axios.post(
                'https://auth-epv2.onrender.com/api/auth/login',
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            if (res.status === 200) {
                // Store authentication state
                localStorage.setItem('isAuthenticated', 'true');
                // Store user data if available
                if (res.data.user) {
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                }
                console.log("user logeed in sucessfully") // Redirect to protected route
            }
        } catch (err) {
            setError(
                err.response?.data?.message || 
                err.response?.data?.error || 
                'Login failed. Please check your credentials.'
            );
            console.error('Login error:', err.response?.data || err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Login to Your Account</h2>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="submit-button"
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            
            <div className="auth-footer">
                Don't have an account? 
                <button 
                    onClick={() => navigate('/register')} 
                    className="link-button"
                >
                    Register here
                </button>
            </div>
        </div>
    );
};

export default Login;