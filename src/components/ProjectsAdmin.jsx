import { useState } from 'react';

function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '' });

  const handleAddProject = (e) => {
    e.preventDefault();
    setProjects([...projects, newProject]);
    setNewProject({ title: '', description: '' });
  };

  return (
    <div className="projects-admin">
      <h2>Edit Projects</h2>
      <form onSubmit={handleAddProject}>
        <input
          value={newProject.title}
          onChange={(e) => setNewProject({...newProject, title: e.target.value})}
          placeholder="Project Title"
        />
        <textarea
          value={newProject.description}
          onChange={(e) => setNewProject({...newProject, description: e.target.value})}
          placeholder="Project Description"
        />
        <button type="submit">Add Project</button>
      </form>
      <div>
        {projects.map((project, index) => (
          <div key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsAdmin;