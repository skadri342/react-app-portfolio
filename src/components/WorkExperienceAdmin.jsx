import { useState, useEffect } from 'react';
import axios from 'axios';

function WorkExperienceAdmin() {
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({ title: '', company: '', duration: '', description: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/workExperience');
      setExperiences(response.data);
    } catch (error) {
      console.error('Error fetching work experiences:', error);
      setError('Failed to fetch work experiences');
    }
  };

  const handleAddExperience = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/workExperience', newExperience, {
        headers: { 'x-auth-token': token }
      });
      console.log('New experience added:', response.data);
      setNewExperience({ title: '', company: '', duration: '', description: '' });
      fetchExperiences();
    } catch (error) {
      console.error('Error adding work experience:', error.response?.data || error.message);
      setError('Failed to add work experience');
    }
  };

  const handleDeleteExperience = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/workExperience/${id}`, {
        headers: { 'x-auth-token': token }
      });
      fetchExperiences();
    } catch (error) {
      console.error('Error deleting work experience:', error.response?.data || error.message);
      setError('Failed to delete work experience');
    }
  };

  return (
    <div className="work-experience-admin">
      <h2>Edit Work Experiences</h2>
      {error && <p className="error">{error}</p>}
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
      <div className='experience-jobs-container'>
        {experiences.map((exp) => (
          <div className='experience-job' key={exp._id}>
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