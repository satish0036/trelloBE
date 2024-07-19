import dotenv from 'dotenv';
import express from "express"
import cors from "cors"

import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authenticateToken from './middleware/auth.js';

const app = express();
const port = process.env.PORT


dotenv.config();

app.use(cors({
    origin: ['http://localhost:3000', '/'],
    credentials: true,
  }));



app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', authenticateToken, projectRoutes);
app.use('/api/tasks', authenticateToken, taskRoutes);
app.use('/api/users', authenticateToken, userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

