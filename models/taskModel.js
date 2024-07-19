import db from '../config/database.js';

const Task = {
  create: (name, description, status, tags, dueDate, assignedUser, projectId, userId, callback) => {
    const sql = 'INSERT INTO tasks (name, description, status, tags, due_date, assigned_user, project_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, description, status, tags, dueDate, assignedUser, projectId, userId], callback);
  },
  findAllByProjectId: (projectId, callback) => {
    const sql = 'SELECT * FROM tasks WHERE project_id = ?';
    db.query(sql, [projectId], callback);
  },
  findAllByUserId: (userId, callback) => {
    const sql = 'SELECT * FROM tasks WHERE assigned_user = ?';
    db.query(sql, [userId], callback);
  },
  findById: (taskId, callback) => {
    const sql = 'SELECT * FROM tasks WHERE id = ?';
    db.query(sql, [taskId], callback);
  },
  update: (taskId, name, description, status, tags, dueDate, assignedUser, callback) => {
    const sql = 'UPDATE tasks SET name = ?, description = ?, status = ?, tags = ?, due_date = ?, assigned_user = ? WHERE id = ?';
    db.query(sql, [name, description, status, tags, dueDate, assignedUser, taskId], callback);
  },
  updateStatus: (taskId, status, callback) => {
    const sql = 'UPDATE tasks SET status = ? WHERE id = ?';
    db.query(sql, [status, taskId], callback);
  },
  deleteById: (taskId, callback) => {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.query(sql, [taskId], callback);
  },
  findByIdAndUserId: (taskId, userId, callback) => {
    const sql = 'SELECT * FROM tasks WHERE id = ? AND (user_id = ? Or assigned_user = ?)';
    db.query(sql, [taskId, userId, userId], callback);
  }
};

export default Task;
