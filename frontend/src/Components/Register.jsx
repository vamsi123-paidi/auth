import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
      });
      const [error, setError] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const navigate = useNavigate();
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
    
        try {
          const response = await axios.post(
            'https://auth-epv2.onrender.com/api/auth/register',
            formData,
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              timeout: 10000 // 10 second timeout
            }
          );
    
          if (response.status === 201) {
            navigate('/login');
          }
        } catch (err) {
          if (err.code === 'ECONNABORTED') {
            setError('Request timeout. Please try again.');
          } else if (err.response) {
            // Server responded with error status
            setError(err.response.data?.message || 'Registration failed');
          } else if (err.request) {
            // Request was made but no response
            setError('Network error. Please check your connection.');
          } else {
            setError('An unexpected error occurred');
          }
          console.error('Registration error:', err);
        } finally {
          setIsLoading(false);
        }
      };
    

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <a href="/login">Login here</a>
            </p>
        </div>
    );
};

export default Register;