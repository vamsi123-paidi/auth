// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Corrected URL: Use /api/auth/user instead of /api/auth/dashboard
                const res = await axios.get('http://localhost:5000/api/auth/user', { withCredentials: true });
                setUser(res.data); // Set the user data in state
            } catch (err) {
                // Redirect to login if not authenticated
                navigate('/login');
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            // Log out the user
            await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
            navigate('/login'); // Redirect to login after logout
        } catch (err) {
            console.error(err.response?.data?.message || 'Logout failed');
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            {user && (
                <div>
                    <p>Welcome, {user.username}!</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;