import { useState, useEffect } from 'react';
import axios from 'axios';

function WorkExperienceAdmin() {
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({ title: '', company: '', duration: '', descriptionPoints: [''] });
  const [editingExperience, setEditingExperience] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/workExperience`);
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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/workExperience`, newExperience, {
        headers: { 'x-auth-token': token }
      });
      console.log('New experience added:', response.data);
      setNewExperience({ title: '', company: '', duration: '', descriptionPoints: [''] });
      fetchExperiences();
    } catch (error) {
      console.error('Error adding work experience:', error.response?.data || error.message);
      setError('Failed to add work experience');
    }
  };

  const handleUpdateExperience = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_URL}/api/workExperience/${editingExperience._id}`, editingExperience, {
        headers: { 'x-auth-token': token }
      });
      setEditingExperience(null);
      fetchExperiences();
    } catch (error) {
      console.error('Error updating work experience:', error.response?.data || error.message);
      setError('Failed to update work experience');
    }
  };

  const handleDeleteExperience = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/workExperience/${id}`, {
        headers: { 'x-auth-token': token }
      });
      fetchExperiences();
    } catch (error) {
      console.error('Error deleting work experience:', error.response?.data || error.message);
      setError('Failed to delete work experience');
    }
  };

  const handleAddDescriptionPoint = () => {
    if (editingExperience) {
      setEditingExperience({
        ...editingExperience,
        descriptionPoints: [...editingExperience.descriptionPoints, '']
      });
    } else {
      setNewExperience({
        ...newExperience,
        descriptionPoints: [...newExperience.descriptionPoints, '']
      });
    }
  };

  const handleDescriptionPointChange = (index, value) => {
    if (editingExperience) {
      const updatedPoints = [...editingExperience.descriptionPoints];
      updatedPoints[index] = value;
      setEditingExperience({ ...editingExperience, descriptionPoints: updatedPoints });
    } else {
      const updatedPoints = [...newExperience.descriptionPoints];
      updatedPoints[index] = value;
      setNewExperience({ ...newExperience, descriptionPoints: updatedPoints });
    }
  };

  return (
    <div className="work-experience-admin">
      <h2>Edit Work Experiences</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={editingExperience ? handleUpdateExperience : handleAddExperience}>
        <input
          value={editingExperience ? editingExperience.title : newExperience.title}
          onChange={(e) => editingExperience ? setEditingExperience({...editingExperience, title: e.target.value}) : setNewExperience({...newExperience, title: e.target.value})}
          placeholder="Job Title"
          required
        />
        <input
          value={editingExperience ? editingExperience.company : newExperience.company}
          onChange={(e) => editingExperience ? setEditingExperience({...editingExperience, company: e.target.value}) : setNewExperience({...newExperience, company: e.target.value})}
          placeholder="Company"
          required
        />
        <input
          value={editingExperience ? editingExperience.duration : newExperience.duration}
          onChange={(e) => editingExperience ? setEditingExperience({...editingExperience, duration: e.target.value}) : setNewExperience({...newExperience, duration: e.target.value})}
          placeholder="Duration"
          required
        />
        {(editingExperience ? editingExperience.descriptionPoints : newExperience.descriptionPoints).map((point, index) => (
          <input
            key={index}
            value={point}
            onChange={(e) => handleDescriptionPointChange(index, e.target.value)}
            placeholder={`Description Point ${index + 1}`}
            required
          />
        ))}
        <button type="button" onClick={handleAddDescriptionPoint}>Add Description Point</button>
        <button type="submit">{editingExperience ? 'Update Experience' : 'Add Experience'}</button>
        {editingExperience && <button type="button" onClick={() => setEditingExperience(null)}>Cancel Edit</button>}
      </form>
      <div className='experience-jobs-container'>
        {experiences.map((exp) => (
          <div className='experience-job' key={exp._id}>
            <h3>{exp.title} at {exp.company}</h3>
            <p>{exp.duration}</p>
            <ul>
              {exp.descriptionPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <button onClick={() => setEditingExperience(exp)}>Edit</button>
            <button onClick={() => handleDeleteExperience(exp._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkExperienceAdmin;