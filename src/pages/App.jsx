import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import '../css/App.css';

function App() {
  const { welcomeContent, aboutContent } = useContext(AdminContext);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedJob, setSelectedJob] = useState(0);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showMoreProjects, setShowMoreProjects] = useState(false);

  useEffect(() => {
    const fetchWorkExperiences = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/workExperience');
        setWorkExperiences(response.data);
      } catch (error) {
        console.error('Error fetching work experiences:', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchWorkExperiences();
    fetchProjects();
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
            <li><Link to="/admin-panel">Admin</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="welcome" className="welcome-section">
          <p>{welcomeContent.greeting}</p>
          <h1>{welcomeContent.name}</h1>
          <h1>{welcomeContent.title}</h1>
          <p>{welcomeContent.description}</p>
        </section>

        <section id="about" className="about-section">
          <div className="bio">
            <h2>{aboutContent.title}</h2>
            <p>{aboutContent.description}</p>
            <ul>
              {aboutContent.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
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
          
          <div className="featured-projects">
            <h3>Featured Projects</h3>
            {projects.filter(project => project.isFeatured).map((project, index) => (
              <div key={project._id} className={`featured-project ${index % 2 === 0 ? 'even' : 'odd'}`}>
                <div className="project-content">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="technologies">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <span className="icon github-icon">GitHub</span>
                      </a>
                    )}
                    {project.external && (
                      <a href={project.external} target="_blank" rel="noopener noreferrer">
                        <span className="icon external-link-icon">External</span>
                      </a>
                    )}
                  </div>
                </div>
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="more-projects">
            <h3>More Projects</h3>
            <div className="projects-grid">
              {projects.filter(project => !project.isFeatured).slice(0, showMoreProjects ? projects.length : 2).map((project) => (
                <div key={project._id} className="project-card">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="technologies">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <span className="icon github-icon">GitHub</span>
                      </a>
                    )}
                    {project.external && (
                      <a href={project.external} target="_blank" rel="noopener noreferrer">
                        <span className="icon external-link-icon">External</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowMoreProjects(!showMoreProjects)} className="show-more-btn">
              {showMoreProjects ? "Show Less" : "Show More"}
            </button>
          </div>
          
          <div className="archive-link">
            <Link to="/archive">View Full Project Archive</Link>
          </div>
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