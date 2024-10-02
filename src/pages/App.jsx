import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/App.css';

function App() {
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
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedJob, setSelectedJob] = useState(0);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutMeResponse, workExperienceResponse, projectsResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/aboutMe'),
          axios.get('http://localhost:3000/api/workExperience'),
          axios.get('http://localhost:3000/api/projects')
        ]);

        setWelcomeContent(aboutMeResponse.data.welcomeContent);
        setAboutContent(aboutMeResponse.data.aboutContent);
        setWorkExperiences(workExperienceResponse.data);
        setProjects(projectsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/messages', contactForm);
      setSubmitStatus('success');
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    }
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
            <img src={aboutContent.profileImageUrl} alt="Profile" />
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
          <form onSubmit={handleContactSubmit}>
            <input
              type="text"
              name="name"
              value={contactForm.name}
              onChange={handleContactChange}
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              value={contactForm.email}
              onChange={handleContactChange}
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              value={contactForm.message}
              onChange={handleContactChange}
              placeholder="Your Message"
              required
            />
            <button type="submit">Send Message</button>
          </form>
          {submitStatus === 'success' && <p>Message sent successfully!</p>}
          {submitStatus === 'error' && <p>Error sending message. Please try again.</p>}
        </section>
      </main>
    </div>
  );
}

export default App;