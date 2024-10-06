import { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({
    title: '',
    description: '',
    technologies: '',
    image: '',
    github: '',
    external: '',
    isFeatured: false
  });
  const [isEditing, setIsEditing] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const projectData = { 
      ...currentProject, 
      technologies: currentProject.technologies.split(',').map(tech => tech.trim()) 
    };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:3000/api/projects/${currentProject._id}`, projectData, {
          headers: { 'x-auth-token': token }
        });
        console.log('Project updated');
      } else {
        await axios.post('http://localhost:3000/api/projects', projectData, {
          headers: { 'x-auth-token': token }
        });
        console.log('New project added');
      }
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error.response?.data || error.message);
      setError(`Failed to ${isEditing ? 'update' : 'add'} project`);
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

  const handleEditClick = (project) => {
    setCurrentProject({
      ...project,
      technologies: project.technologies.join(', ')
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setCurrentProject({
      title: '',
      description: '',
      technologies: '',
      image: '',
      github: '',
      external: '',
      isFeatured: false
    });
    setIsEditing(false);
  };

  return (
    <div className="projects-admin">
      <h2>{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit} className="project-form">
        <input
          value={currentProject.title}
          onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
          placeholder="Project Title"
          required
        />
        <textarea
          value={currentProject.description}
          onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
          placeholder="Project Description"
          required
        />
        <input
          value={currentProject.technologies}
          onChange={(e) => setCurrentProject({...currentProject, technologies: e.target.value})}
          placeholder="Technologies (comma-separated)"
          required
        />
        <input
          value={currentProject.image}
          onChange={(e) => setCurrentProject({...currentProject, image: e.target.value})}
          placeholder="Image URL"
        />
        <input
          value={currentProject.github}
          onChange={(e) => setCurrentProject({...currentProject, github: e.target.value})}
          placeholder="GitHub URL"
        />
        <input
          value={currentProject.external}
          onChange={(e) => setCurrentProject({...currentProject, external: e.target.value})}
          placeholder="External URL"
        />
        <label>
          <input
            type="checkbox"
            checked={currentProject.isFeatured}
            onChange={(e) => setCurrentProject({...currentProject, isFeatured: e.target.checked})}
          />
          Featured Project
        </label>
        <button type="submit">{isEditing ? 'Update Project' : 'Add Project'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <h3>Existing Projects</h3>
      <div className="projects-list">
        {projects.map((project) => (
          <div key={project._id} className="project-item">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Technologies: {project.technologies.join(', ')}</p>
            <p>Featured: {project.isFeatured ? 'Yes' : 'No'}</p>
            <button onClick={() => handleEditClick(project)}>Edit</button>
            <button onClick={() => handleDeleteProject(project._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsAdmin;