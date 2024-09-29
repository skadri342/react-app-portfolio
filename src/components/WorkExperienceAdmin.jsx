import { useState } from 'react';

function WorkExperienceAdmin() {
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({ title: '', company: '', duration: '', description: '' });

  const handleAddExperience = (e) => {
    e.preventDefault();
    setExperiences([...experiences, newExperience]);
    setNewExperience({ title: '', company: '', duration: '', description: '' });
  };

  return (
    <div className="work-experience-admin">
      <h2>Edit Work Experiences</h2>
      <form onSubmit={handleAddExperience}>
        <input
          value={newExperience.title}
          onChange={(e) => setNewExperience({...newExperience, title: e.target.value})}
          placeholder="Job Title"
        />
        <input
          value={newExperience.company}
          onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
          placeholder="Company"
        />
        <input
          value={newExperience.duration}
          onChange={(e) => setNewExperience({...newExperience, duration: e.target.value})}
          placeholder="Duration"
        />
        <textarea
          value={newExperience.description}
          onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
          placeholder="Job Description"
        />
        <button type="submit">Add Experience</button>
      </form>
      <div>
        {experiences.map((exp, index) => (
          <div key={index}>
            <h3>{exp.title} at {exp.company}</h3>
            <p>{exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkExperienceAdmin;