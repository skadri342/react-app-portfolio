import { useState, useEffect } from 'react';
import axios from 'axios';

function WorkExperienceAdmin() {
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({ title: '', company: '', duration: '', description: '' });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/workExperience');
      setExperiences(response.data);
    } catch (error) {
      console.error('Error fetching work experiences:', error);
    }
  };

  const handleAddExperience = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/workExperience', newExperience);
      setNewExperience({ title: '', company: '', duration: '', description: '' });
      fetchExperiences();
    } catch (error) {
      console.error('Error adding work experience:', error);
    }
  };

  const handleDeleteExperience = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/workExperience/${id}`);
      fetchExperiences();
    } catch (error) {
      console.error('Error deleting work experience:', error);
    }
  };

  return (
    <div className="work-experience-admin">
      <h2>Edit Work Experiences</h2>
      <form onSubmit={handleAddExperience}>
        <input
          value={newExperience.title}
          onChange={(e) => setNewExperience({...newExperience, title: e.target.value})}
          placeholder="Job Title"
          required
        />
        <input
          value={newExperience.company}
          onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
          placeholder="Company"
          required
        />
        <input
          value={newExperience.duration}
          onChange={(e) => setNewExperience({...newExperience, duration: e.target.value})}
          placeholder="Duration"
          required
        />
        <textarea
          value={newExperience.description}
          onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
          placeholder="Job Description"
          required
        />
        <button type="submit">Add Experience</button>
      </form>
      <div>
        {experiences.map((exp) => (
          <div key={exp._id}>
            <h3>{exp.title} at {exp.company}</h3>
            <p>{exp.duration}</p>
            <p>{exp.description}</p>
            <button onClick={() => handleDeleteExperience(exp._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkExperienceAdmin;