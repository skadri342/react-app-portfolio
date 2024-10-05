import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/App.css';
import backgroundImage from '../assets/sunset-ship-image.jpeg';
import logo from '../assets/case-upper.png';

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
  const [resumeUrl, setResumeUrl] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const educationData = [
    {
      institution: "University of Example",
      duration: "2016 - 2020",
      major: "Bachelor of Science in Computer Science",
      description: "Focused on software engineering and data structures. Participated in various coding competitions and hackathons."
    },
    {
      institution: "Example Community College",
      duration: "2014 - 2016",
      major: "Associate's Degree in Information Technology",
      description: "Learned fundamentals of programming and computer networks. Completed a capstone project on web development."
    }
  ];

  useEffect(() => {
    document.documentElement.style.setProperty('--bg-image', `url(${backgroundImage})`);
  }, []);

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

      // New code for header transparency
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const fetchResumeUrl = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/resume/url');
        setResumeUrl(`http://localhost:3000${response.data.url}`);
      } catch (error) {
        console.error('Error fetching resume URL:', error);
      }
    };
    fetchResumeUrl();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.fade-section');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

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
      <div className="background"></div>
      <div className="content">
        <header className={`app-header ${isHeaderVisible ? 'visible' : 'hidden'} ${isScrolled ? 'scrolled' : ''}`}>
          <div className="header-content">
            <Link to="/" className="logo-link">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
            <nav className={isMenuOpen ? 'open' : ''}>
              <ul>
                <li><a href="#about" onClick={(e) => smoothScroll(e, '#about')}>About</a></li>
                <li><a href="#experience" onClick={(e) => smoothScroll(e, '#experience')}>Work Experience</a></li>
                <li><a href="#projects" onClick={(e) => smoothScroll(e, '#projects')}>Projects</a></li>
                <li><a href="#contact" onClick={(e) => smoothScroll(e, '#contact')}>Contact</a></li>
                <li>{resumeUrl ? (<a href={resumeUrl} target="_blank" rel="noopener noreferrer">Resume</a>) : (<span>Resume</span>)}</li>
                <li><Link to="/admin-panel">Admin</Link></li>
              </ul>
            </nav>
            <button className="menu-toggle" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </header>

        <main>
          <section id="welcome" className="welcome-section fade-section">
            <p>{welcomeContent.greeting}</p>
            <h1 className='big-heading'>{welcomeContent.name}</h1>
            <h1 className='medium-heading'>{welcomeContent.title}</h1>
            <p className='small-heading'>{welcomeContent.description}</p>
          </section>

          <section id="about" className="about-section fade-section">
            <div className="bio">
              <h2>{aboutContent.title}</h2>
              <p>{aboutContent.description}</p>
              <ul className='skills-list'>
                {aboutContent.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className='profile-image'>
              <div className="profile-image-wrapper">
                {aboutContent.profileImageUrl ? (
                  <img src={aboutContent.profileImageUrl} alt="Profile" />
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(100, 255, 218, 0.1)' }}></div>
                )}
              </div>
            </div>
          </section>

          <section id="experience" className="experience-section fade-section">
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
                  <ul className='experience-detail-points'>
                    {workExperiences[selectedJob].descriptionPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          <section id="education" className="education-section fade-section">
            <h2>Education</h2>
            <div className="education-container">
              {educationData.map((edu, index) => (
                <div key={index} className="education-item">
                  <h3>{edu.institution}</h3>
                  <p className="duration">{edu.duration}</p>
                  <h4>{edu.major}</h4>
                  <p>{edu.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" className="projects-section fade-section">
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
          </section>

          <section id='project' className='projects-section'>
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

          <section id="contact" className="contact-section fade-section">
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
    </div>
  );
}

export default App;