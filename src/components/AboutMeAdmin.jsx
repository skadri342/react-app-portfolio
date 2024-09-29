import { useState } from 'react';
import '../css/AdminComponents.css';

function AboutMeAdmin() {
  const [welcomeText, setWelcomeText] = useState('Welcome to My Portfolio');
  const [briefBio, setBriefBio] = useState('A brief welcome message and introduction.');
  const [detailedBio, setDetailedBio] = useState('A more detailed biography goes here.');
  const [profileImage, setProfileImage] = useState('/path/to/your/image.jpg');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Submitted:', { welcomeText, briefBio, detailedBio, profileImage });
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
      <h2>Edit About Me</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="welcomeText">Welcome Text:</label>
          <input
            id="welcomeText"
            value={welcomeText}
            onChange={(e) => setWelcomeText(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="briefBio">Brief Bio:</label>
          <textarea
            id="briefBio"
            value={briefBio}
            onChange={(e) => setBriefBio(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="detailedBio">Detailed Bio:</label>
          <textarea
            id="detailedBio"
            value={detailedBio}
            onChange={(e) => setDetailedBio(e.target.value)}
            rows="6"
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