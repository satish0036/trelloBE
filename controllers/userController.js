import User from '../models/userModel.js';

export const getAllUsers = (req, res) => {
  User.getAllUsers((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching users', error: err });
    }
    res.status(200).json(results);
  });
};

export const deleteUser = (req, res) => {
  const { userId } = req.params;

  User.deleteById(userId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting user', error: err });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  });
};
