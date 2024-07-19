import Task from '../models/taskModel.js';

export const createTask = (req, res) => {
  const { name, description, status, tags, dueDate, assignedUser, projectId } = req.body;
  const userId = req.user.id;

  if (!name || !description || !status || !dueDate || !assignedUser || !projectId) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  Task.create(name, description, status, tags, dueDate, assignedUser, projectId, userId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating task', error: err });
    }
    res.status(201).json({ message: 'Task created successfully', taskId: result.insertId });
  });
};

export const getTasksByProject = (req, res) => {
  const { projectId } = req.params;

  Task.findAllByProjectId(projectId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching tasks', error: err });
    }
    res.status(200).json(results);
  });
};

export const getTasksByUser = (req, res) => {
  const userId = req.user.id;

  Task.findAllByUserId(userId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching tasks', error: err });
    }
    res.status(200).json(results);
  });
};

export const updateTask = (req, res) => {
  const { taskId } = req.params;
  const { name, description, status, tags, dueDate, assignedUser } = req.body;
  const userId = req.user.id;

  if (!name || !description || !status || !dueDate || !assignedUser) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Check if the user owns the task
  Task.findByIdAndUserId(taskId, userId, (err, task) => {
    // console.log("taskId",taskId)
    // console.log("userId",userId)
    if (err) {
      return res.status(500).json({ message: 'Error fetching task', error: err });
    }
    if (!task || task.length===0) {
      return res.status(403).json({ message: 'Unauthorized to update this task' });
    }

    Task.update(taskId, name, description, status, tags, dueDate, assignedUser, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating task', error: err });
      }
      res.status(200).json({ message: 'Task updated successfully' });
    });
  });
};

export const updateTaskStatus = (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;
  const userId = req.user.id;

  if (!status) {
    return res.status(400).json({ message: 'Please provide the new status' });
  }

  // Check if the user owns the task
  Task.findByIdAndUserId(taskId, userId, (err, task) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching task', error: err });
    }
    if (!task || task.length===0) {
      return res.status(403).json({ message: 'Unauthorized to update this task status' });
    }

    Task.updateStatus(taskId, status, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating task status', error: err });
      }
      res.status(200).json({ message: 'Task status updated successfully' });
    });
  });
};

export const deleteTask = (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.id;

  // Check if the user owns the task
  Task.findByIdAndUserId(taskId, userId, (err, task) => {
     if (err) {
      return res.status(500).json({ message: 'Error fetching task', error: err });
    }
    if (!task || task.length===0) {
      return res.status(403).json({ message: 'Unauthorized to delete this task' });
    }

    Task.deleteById(taskId, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting task', error: err });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    });
  });
};
