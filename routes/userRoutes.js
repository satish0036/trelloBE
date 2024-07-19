import express from 'express';
import { getAllUsers, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.delete('/:userId', deleteUser);

export default router;
