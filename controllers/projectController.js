import Project from '../models/projectModel.js';

export const createProject = (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;

  if (!name || !description) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  Project.create(name, description, userId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating project', error: err });
    }
    res.status(201).json({ message: 'Project created successfully', projectId: result.insertId });
  });
};

export const getProjectsByUser = (req, res) => {
  const userId = req.user.id;

  Project.findAllByUserId(userId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching projects', error: err });
    }
    res.status(200).json(results);
  });
};

export const getProjectById = (req, res) => {
  const { projectId } = req.params;

  Project.findById(projectId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching project', error: err });
    }
    res.status(200).json(result);
  });
};

export const updateProject = (req, res) => {
  const { projectId } = req.params;
  const { name, description } = req.body;
  const userId = req.user.id;

  if (!name || !description) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Check if the user owns the project
  Project.findByIdAndUserId(projectId, userId, (err, project) => {
    
    if (err) {
      return res.status(500).json({ message: 'Error fetching project', error: err });
    }
    if (!project || project.length===0) {
      return res.status(403).json({ message: 'Unauthorized to update this project' });
    }

    Project.update(projectId, name, description, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating project', error: err });
      }
      res.status(200).json({ message: 'Project updated successfully' });
    });
  });
};

export const deleteProject = (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.id;

  // Check if the user owns the project
  Project.findByIdAndUserId(projectId, userId, (err, project) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching project', error: err });
    }
    if (!project) {
      return res.status(403).json({ message: 'Unauthorized to delete this project' });
    }

    Project.deleteById(projectId, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting project', error: err });
      }
      res.status(200).json({ message: 'Project deleted successfully' });
    });
  });
};
