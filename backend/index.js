const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');  

const app = express();

app.use(express.json({ limit: '10mb' }));  
app.use(express.urlencoded({ limit: '10mb', extended: true })); 

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));
app.use(cookieParser());

app.use("/api", router);          

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on " + PORT);
    });
});
