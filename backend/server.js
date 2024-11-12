import dotenv from 'dotenv';
// Load environment variables from .env 
dotenv.config({ path: new URL('./.env', import.meta.url) });

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import connectToDatabase from './config/config.js'; // Import the connection function

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

app.use('/api', postRoutes); // Use postRoutes for API endpoints

// Connect to MongoDB before starting the server
connectToDatabase()
  .then(() => {
    // Set the port and start the server after successful connection
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit the process with an error code
  });