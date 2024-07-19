import express from 'express';
import { createTask, getTasksByProject, getTasksByUser, updateTask, updateTaskStatus, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

router.post('/', createTask);
router.get('/project/:projectId', getTasksByProject);
router.get('/user', getTasksByUser);
router.put('/:taskId', updateTask);
router.put('/:taskId/status', updateTaskStatus);
router.delete('/:taskId', deleteTask);

export default router;
