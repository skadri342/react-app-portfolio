import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/App.css';
import backgroundImage from '../assets/sunset-ship-image.jpeg';
import logo from '../assets/logo.svg';
import { Github, ExternalLink, FolderOpen } from 'lucide-react';

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
    document.body.style.overflow = isMenuOpen ? 'visible' : 'hidden';
  };

  const closeMenu = (e) => {
    if (isMenuOpen && e.target.classList.contains('menu-overlay')) {
      setIsMenuOpen(false);
      document.body.style.overflow = 'visible';
    }
  };

  const educationData = [
    {
      institution: "Toronto Metropolitan University",
      duration: "2020 - 2025",
      major: "Bachelor of Engineering in Computer Engineering - Co-op",
      description: "Focused on software engineering, microcontrollers, system design and data structures. Participated in various labs with practical hands on experience. Completed capstone project on Medical Image Diagnosis Tool using AI and Machine Learning."
    },
    {
      institution: "Cisco Networking Academy",
      duration: "2018 - 2020",
      major: "Switching, Routing, Wireless Essentials, Enterprise Networking, Security, and Automation",
      description: "Learned the fundamentals and theory of switch programming and computer networks. Completed an exam to earn the CCNA certification."
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

    // Clean up the body overflow style when component unmounts
    return () => {
      document.body.style.overflow = 'visible';
    };
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
    setIsMenuOpen(false);
    document.body.style.overflow = 'visible';
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
    <div className={`app ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="background"></div>
      <div className="content">
        <header className={`app-header ${isHeaderVisible ? 'visible' : 'hidden'} ${isScrolled ? 'scrolled' : ''}`}>
          <div className="header-content">
            <div className='header-logo'>
              <Link to="/" className="logo-link">
                <img src={logo} alt="Logo" className="logo" />
              </Link>
            </div>
            <div className='header-items'>
              <nav className={isMenuOpen ? 'open' : ''}>
                <ul>
                  <li><a href="#about" onClick={(e) => smoothScroll(e, '#about')}>About</a></li>
                  <li><a href="#experience" onClick={(e) => smoothScroll(e, '#experience')}>Experience</a></li>
                  <li><a href="#education" onClick={(e) => smoothScroll(e, '#education')}>Education</a></li>
                  <li><a href="#projects" onClick={(e) => smoothScroll(e, '#projects')}>Projects</a></li>
                  <li><a href="#contact" onClick={(e) => smoothScroll(e, '#contact')}>Contact</a></li>
                  <li className='resume-button'>{resumeUrl ? (<a href={resumeUrl} target="_blank" rel="noopener noreferrer">Resume</a>) : (<span>Resume</span>)}</li>
                  <li className='admin-button'><Link to="/admin-panel">Admin</Link></li>
                </ul>
              </nav>
              
              <button className="menu-toggle" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </header>

        <div className="menu-overlay" onClick={closeMenu}></div>

        <main>
          <section id="welcome" className="welcome-section fade-section">
            <p className='greeting'>{welcomeContent.greeting}</p>
            <h1 className='big-heading'>{welcomeContent.name}</h1>
            <h1 className='medium-heading'>{welcomeContent.title}</h1>
            <p className='small-heading'>{welcomeContent.description}</p>
          </section>

          <section id="about" className="about-section fade-section">
            <div className="bio">
              <h2>{aboutContent.title}</h2>
              <p>{aboutContent.description}</p>
              <p>Here are a few technologies I&apos;ve been working with recently:</p>
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
                  <h4>{workExperiences[selectedJob].title} @</h4>
                  <h3>{workExperiences[selectedJob].company}</h3>
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
            <h2>Things I&apos;ve Built</h2>
            
            <div className="featured-projects">
              {projects.filter(project => project.isFeatured).map((project, index) => (
                <div key={project._id} className={`featured-project ${index % 2 === 0 ? 'even' : 'odd'}`}>
                  <div className={`project-content ${index % 2 === 0 ? 'align-right' : 'align-left'}`}>
                    <h4>Featured project</h4>
                    <h3>{project.title}</h3>
                    <p className='project-description'>{project.description}</p>
                    <div className="technologies">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <div className="featured-project-links">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <span className="icon github-icon"><Github /></span>
                        </a>
                      )}
                      {project.external && (
                        <a href={project.external} target="_blank" rel="noopener noreferrer">
                          <span className="icon external-link-icon"><ExternalLink /></span>
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="project-image">
                    <div className='image-overlay'>
                      <img src={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id='project' className='projects-section'>
            <div className="more-projects">
              <h2>More Projects</h2>
              <div className="archive-link">
                <Link to="/archive">View Full Project Archive</Link>
              </div>
              <div className="projects-grid">
                {projects.filter(project => !project.isFeatured).slice(0, showMoreProjects ? projects.length : 3).map((project) => (
                  <div key={project._id} className="project-card">
                    <div className="project-links">
                      <div className='folder-icon'><FolderOpen size={48} /></div>
                      <div className='link-icon'>
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <span className="icon github-icon"><Github /></span>
                          </a>
                        )}
                        {project.external && (
                          <a href={project.external} target="_blank" rel="noopener noreferrer">
                            <span className="icon external-link-icon"><ExternalLink /></span>
                          </a>
                        )}
                      </div>
                    </div>
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                    <div className="technologies">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {projects.filter(project => !project.isFeatured).length > 3 && (
                <button onClick={() => setShowMoreProjects(!showMoreProjects)} className="show-more-btn">
                  {showMoreProjects ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          </section>

          <section id="contact" className="contact-section fade-section">
            <h2>Get in Touch</h2>
            <form className='contact-form' onSubmit={handleContactSubmit}>
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

        <footer>
          <div id = "footer" className='app-footer'>
            <p><a href='https://github.com/skadri342/react-app-portfolio'>Designed and Built by Shams Kadri</a></p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;