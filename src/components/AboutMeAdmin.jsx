import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/AdminComponents.css';

function AboutMeAdmin() {
  const [welcomeContent, setWelcomeContent] = useState({
    greeting: '',
    name: '',
    title: '',
    description: ''
  });
  const [aboutContent, setAboutContent] = useState({
    title: '',
    description: '',
    skills: [],
    profileImageUrl: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAboutMeData();
  }, []);

  const fetchAboutMeData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/aboutMe`);
      setWelcomeContent(response.data.welcomeContent);
      setAboutContent(response.data.aboutContent);
    } catch (err) {
      console.error('Error fetching AboutMe data:', err);
      setError('Failed to fetch AboutMe data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_URL}/api/aboutMe`, 
        { welcomeContent, aboutContent },
        { headers: { 'x-auth-token': token } }
      );
      alert('Changes saved successfully!');
    } catch (err) {
      console.error('Error updating AboutMe data:', err);
      setError('Failed to update AboutMe data');
    }
  };

  const handleWelcomeChange = (e) => {
    setWelcomeContent({ ...welcomeContent, [e.target.name]: e.target.value });
  };

  const handleAboutChange = (e) => {
    if (e.target.name === 'skills') {
      setAboutContent({ ...aboutContent, skills: e.target.value.split(',').map(skill => skill.trim()) });
    } else {
      setAboutContent({ ...aboutContent, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="about-me-admin">
      <h2>Edit Welcome and About Me</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <h3>Welcome Section</h3>
        <div>
          <label htmlFor="greeting">Greeting:</label>
          <input
            id="greeting"
            name="greeting"
            value={welcomeContent.greeting}
            onChange={handleWelcomeChange}
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            value={welcomeContent.name}
            onChange={handleWelcomeChange}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            value={welcomeContent.title}
            onChange={handleWelcomeChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={welcomeContent.description}
            onChange={handleWelcomeChange}
          />
        </div>

        <h3>About Me Section</h3>
        <div>
          <label htmlFor="aboutTitle">About Title:</label>
          <input
            id="aboutTitle"
            name="title"
            value={aboutContent.title}
            onChange={handleAboutChange}
          />
        </div>
        <div>
          <label htmlFor="aboutDescription">About Description:</label>
          <textarea
            id="aboutDescription"
            name="description"
            value={aboutContent.description}
            onChange={handleAboutChange}
          />
        </div>
        <div>
          <label htmlFor="skills">Skills (comma-separated):</label>
          <input
            id="skills"
            name="skills"
            value={aboutContent.skills.join(', ')}
            onChange={handleAboutChange}
          />
        </div>
        <div>
          <label htmlFor="profileImageUrl">Profile Image URL:</label>
          <input
            id="profileImageUrl"
            name="profileImageUrl"
            value={aboutContent.profileImageUrl}
            onChange={handleAboutChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default AboutMeAdmin;