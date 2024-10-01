import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/App.css';

function App() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedJob, setSelectedJob] = useState(0);
  const [workExperiences, setWorkExperiences] = useState([]);
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

  // Placeholder data for projects
  const featuredProjects = [
    {
      title: "Featured Project 1",
      description: "This is a description of the first featured project. It showcases various technologies and skills.",
      technologies: ["React", "Node.js", "MongoDB"],
      image: "/path/to/project1-image.jpg",
      github: "https://github.com/yourusername/project1",
      external: "https://project1-demo.com"
    },
    {
      title: "Featured Project 2",
      description: "This is a description of the second featured project. It demonstrates different aspects of web development.",
      technologies: ["Vue.js", "Express", "PostgreSQL"],
      image: "/path/to/project2-image.jpg",
      github: "https://github.com/yourusername/project2",
      external: "https://project2-demo.com"
    }
  ];

  const moreProjects = [
    {
      title: "Project 3",
      description: "A brief description of Project 3.",
      technologies: ["Python", "Django", "React"],
      github: "https://github.com/yourusername/project3",
      external: "https://project3-demo.com"
    },
    {
      title: "Project 4",
      description: "A brief description of Project 4.",
      technologies: ["JavaScript", "Three.js", "WebGL"],
      github: "https://github.com/yourusername/project4",
      external: "https://project4-demo.com"
    },
    {
      title: "Project 5",
      description: "A brief description of Project 5.",
      technologies: ["TypeScript", "Angular", "Firebase"],
      github: "https://github.com/yourusername/project5",
      external: "https://project5-demo.com"
    }
  ];

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
          
          <div className="featured-projects">
            <h3>Featured Projects</h3>
            {featuredProjects.map((project, index) => (
              <div key={index} className={`featured-project ${index % 2 === 0 ? 'even' : 'odd'}`}>
                <div className="project-content">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="technologies">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      {/* Placeholder for GitHub logo */}
                      <span className="icon github-icon">GitHub</span>
                    </a>
                    <a href={project.external} target="_blank" rel="noopener noreferrer">
                      {/* Placeholder for external link logo */}
                      <span className="icon external-link-icon">External</span>
                    </a>
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
              {moreProjects.slice(0, showMoreProjects ? moreProjects.length : 2).map((project, index) => (
                <div key={index} className="project-card">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="technologies">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      {/* Placeholder for GitHub logo */}
                      <span className="icon github-icon">GitHub</span>
                    </a>
                    <a href={project.external} target="_blank" rel="noopener noreferrer">
                      {/* Placeholder for external link logo */}
                      <span className="icon external-link-icon">External</span>
                    </a>
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