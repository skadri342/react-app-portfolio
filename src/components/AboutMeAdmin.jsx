import { useState, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import '../css/AdminComponents.css';

function AboutMeAdmin() {
  const { welcomeContent, aboutContent, updateWelcomeAndAbout } = useContext(AdminContext);
  
  const [welcomeForm, setWelcomeForm] = useState(welcomeContent);
  const [aboutForm, setAboutForm] = useState(aboutContent);
  const [profileImage, setProfileImage] = useState('/path/to/your/image.jpg');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateWelcomeAndAbout(welcomeForm, aboutForm);
    alert('Changes saved successfully!');
  };

  const handleWelcomeChange = (e) => {
    setWelcomeForm({ ...welcomeForm, [e.target.name]: e.target.value });
  };

  const handleAboutChange = (e) => {
    if (e.target.name === 'skills') {
      setAboutForm({ ...aboutForm, skills: e.target.value.split(',').map(skill => skill.trim()) });
    } else {
      setAboutForm({ ...aboutForm, [e.target.name]: e.target.value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="about-me-admin">
      <h2>Edit Welcome and About Me</h2>
      <form onSubmit={handleSubmit}>
        <h3>Welcome Section</h3>
        <div>
          <label htmlFor="greeting">Greeting:</label>
          <input
            id="greeting"
            name="greeting"
            value={welcomeForm.greeting}
            onChange={handleWelcomeChange}
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            value={welcomeForm.name}
            onChange={handleWelcomeChange}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            value={welcomeForm.title}
            onChange={handleWelcomeChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={welcomeForm.description}
            onChange={handleWelcomeChange}
          />
        </div>

        <h3>About Me Section</h3>
        <div>
          <label htmlFor="aboutTitle">About Title:</label>
          <input
            id="aboutTitle"
            name="title"
            value={aboutForm.title}
            onChange={handleAboutChange}
          />
        </div>
        <div>
          <label htmlFor="aboutDescription">About Description:</label>
          <textarea
            id="aboutDescription"
            name="description"
            value={aboutForm.description}
            onChange={handleAboutChange}
          />
        </div>
        <div>
          <label htmlFor="skills">Skills (comma-separated):</label>
          <input
            id="skills"
            name="skills"
            value={aboutForm.skills.join(', ')}
            onChange={handleAboutChange}
          />
        </div>
        <div>
          <label htmlFor="profileImage">Profile Image:</label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {profileImage && (
          <div className="image-preview">
            <img src={profileImage} alt="Profile Preview" />
          </div>
        )}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default AboutMeAdmin;