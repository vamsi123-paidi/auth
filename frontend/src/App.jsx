// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;