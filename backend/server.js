// server.js
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./Config/db');
const authRoutes = require('./routes/authRoute');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: 'https://auth-red-three.vercel.app', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);

// Database Connection
connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));