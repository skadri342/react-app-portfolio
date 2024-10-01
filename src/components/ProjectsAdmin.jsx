import { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    image: '',
    github: '',
    external: '',
    isFeatured: false
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to fetch projects');
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const projectData = { ...newProject, technologies: newProject.technologies.split(',').map(tech => tech.trim()) };
      const response = await axios.post('http://localhost:3000/api/projects', projectData, {
        headers: { 'x-auth-token': token }
      });
      console.log('New project added:', response.data);
      setNewProject({
        title: '',
        description: '',
        technologies: '',
        image: '',
        github: '',
        external: '',
        isFeatured: false
      });
      fetchProjects();
    } catch (error) {
      console.error('Error adding project:', error.response?.data || error.message);
      setError('Failed to add project');
    }
  };

  const handleUpdateProject = async (id, updatedProject) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:3000/api/projects/${id}`, updatedProject, {
        headers: { 'x-auth-token': token }
      });
      console.log('Project updated:', response.data);
      fetchProjects();
    } catch (error) {
      console.error('Error updating project:', error.response?.data || error.message);
      setError('Failed to update project');
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/projects/${id}`, {
        headers: { 'x-auth-token': token }
      });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error.response?.data || error.message);
      setError('Failed to delete project');
    }
  };

  return (
    <div className="projects-admin">
      <h2>Edit Projects</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleAddProject} className="project-form">
        <input
          value={newProject.title}
          onChange={(e) => setNewProject({...newProject, title: e.target.value})}
          placeholder="Project Title"
          required
        />
        <textarea
          value={newProject.description}
          onChange={(e) => setNewProject({...newProject, description: e.target.value})}
          placeholder="Project Description"
          required
        />
        <input
          value={newProject.technologies}
          onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
          placeholder="Technologies (comma-separated)"
          required
        />
        <input
          value={newProject.image}
          onChange={(e) => setNewProject({...newProject, image: e.target.value})}
          placeholder="Image URL"
        />
        <input
          value={newProject.github}
          onChange={(e) => setNewProject({...newProject, github: e.target.value})}
          placeholder="GitHub URL"
        />
        <input
          value={newProject.external}
          onChange={(e) => setNewProject({...newProject, external: e.target.value})}
          placeholder="External URL"
        />
        <label>
          <input
            type="checkbox"
            checked={newProject.isFeatured}
            onChange={(e) => setNewProject({...newProject, isFeatured: e.target.checked})}
          />
          Featured Project
        </label>
        <button type="submit">Add Project</button>
      </form>
      <div className="projects-list">
        {projects.map((project) => (
          <div key={project._id} className="project-item">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Technologies: {project.technologies.join(', ')}</p>
            <p>Featured: {project.isFeatured ? 'Yes' : 'No'}</p>
            <button onClick={() => handleUpdateProject(project._id, { ...project, isFeatured: !project.isFeatured })}>
              Toggle Featured
            </button>
            <button onClick={() => handleDeleteProject(project._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsAdmin;