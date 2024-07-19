import express from 'express';
import { createProject, getProjectsByUser, getProjectById, updateProject, deleteProject } from '../controllers/projectController.js';

const router = express.Router();

router.post('/', createProject);
router.get('/', getProjectsByUser);
router.get('/:projectId', getProjectById);
router.put('/:projectId', updateProject);
router.delete('/:projectId', deleteProject);

export default router;
