import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/App.css';

function App() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedJob, setSelectedJob] = useState(0);
  const [workExperiences, setWorkExperiences] = useState([]);

  useEffect(() => {
    const fetchWorkExperiences = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/workExperience');
        setWorkExperiences(response.data);
      } catch (error) {
        console.error('Error fetching work experiences:', error);
      }
    };

    fetchWorkExperiences();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > 100) {
        setIsHeaderVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const smoothScroll = (e, target) => {
    e.preventDefault();
    const element = document.querySelector(target);
    element.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="app">
      <header className={`app-header ${isHeaderVisible ? 'visible' : 'hidden'}`}>
        <nav>
          <ul>
            <li><a href="#about" onClick={(e) => smoothScroll(e, '#about')}>About</a></li>
            <li><a href="#experience" onClick={(e) => smoothScroll(e, '#experience')}>Work Experience</a></li>
            <li><a href="#projects" onClick={(e) => smoothScroll(e, '#projects')}>Projects</a></li>
            <li><a href="#contact" onClick={(e) => smoothScroll(e, '#contact')}>Contact</a></li>
            <li><a href="#resume" onClick={(e) => smoothScroll(e, '#resume')}>Resume</a></li>
            <li><Link to="/admin">Admin Login</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="welcome" className="welcome-section">
          <h1>sdagdfshdsfjdsjfsjgsgjsfdgjfdj</h1>
          <p>Hi</p>
        </section>

        <section id="about" className="about-section">
          <div className="bio">
            <h2>About Me</h2>
            <p>A more detailed biography goes here.</p>
          </div>
          <div className="profile-image">
            <img src="/path/to/your/image.jpg" alt="Your Name" />
          </div>
        </section>

        <section id="experience" className="experience-section">
          <h2>Work Experience</h2>
          <div className="experience-container">
            <div className="experience-selector">
              {workExperiences.map((job, index) => (
                <div 
                  key={index} 
                  className={`job-selector ${selectedJob === index ? 'active' : ''}`}
                  onClick={() => setSelectedJob(index)}
                >
                  {job.company}
                </div>
              ))}
            </div>
            {workExperiences.length > 0 && (
              <div className="experience-details">
                <h3>{workExperiences[selectedJob].company}</h3>
                <h4>{workExperiences[selectedJob].title}</h4>
                <p className="duration">{workExperiences[selectedJob].duration}</p>
                <p>{workExperiences[selectedJob].description}</p>
              </div>
            )}
          </div>
        </section>

        <section id="projects" className="projects-section">
          <h2>My Projects</h2>
          <div className="project">
            <h3>Project Title</h3>
            <p>Project description</p>
          </div>
          {/* Add more project divs as needed */}
        </section>

        <section id="contact" className="contact-section">
          <h2>Get in Touch</h2>
          <form>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;