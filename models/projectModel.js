import db from '../config/database.js';

const Project = {
  create: (name, description, userId, callback) => {
    const sql = 'INSERT INTO projects (name, description, user_id) VALUES (?, ?, ?)';
    db.query(sql, [name, description, userId], callback);
  },
  findAllByUserId: (userId, callback) => {
    const sql = 'SELECT * FROM projects WHERE user_id = ?';
    db.query(sql, [userId], callback);
  },
  findById: (projectId, callback) => {
    const sql = 'SELECT * FROM projects WHERE id = ?';
    db.query(sql, [projectId], callback);
  },
  update: (projectId, name, description, callback) => {
    const sql = 'UPDATE projects SET name = ?, description = ? WHERE id = ?';
    db.query(sql, [name, description, projectId], callback);
  },
  deleteById: (projectId, callback) => {
    const sql = 'DELETE FROM projects WHERE id = ?';
    db.query(sql, [projectId], callback);
  },
  findByIdAndUserId: (projectId, userId, callback) => {
    console.log("projectId",projectId)
    console.log("userId",userId)

    const sql = 'SELECT * FROM projects WHERE id = ? AND user_id = ?';
    db.query(sql, [projectId, userId], callback);
  }
};

export default Project;
