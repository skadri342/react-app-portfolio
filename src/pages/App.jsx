import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/App.css';
import backgroundImage from '../assets/sunset-ship-image.jpeg';
import { ExternalLink, FolderOpen } from 'lucide-react';
import { SiInstagram, SiGithub, SiLinkedin, SiDiscord } from '@icons-pack/react-simple-icons';

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
          axios.get(`${import.meta.env.VITE_API_URL}/api/aboutMe`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/workExperience`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/projects`)
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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/resume/url`);
        setResumeUrl(`${import.meta.env.VITE_API_URL}${response.data.url}`);
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
      await axios.post(`${import.meta.env.VITE_API_URL}/api/messages`, contactForm);
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
                <svg className='logo' version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="999.000000pt" height="997.000000pt" viewBox="0 0 999.000000 997.000000"
                preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,997.000000) scale(0.100000,-0.100000)"
                stroke="none">
                <path d="M5000 8699 c-19 -15 -116 -75 -215 -132 -349 -201 -691 -400 -795
                -462 -158 -94 -352 -211 -475 -285 -60 -37 -182 -109 -270 -160 -88 -51 -290
                -170 -450 -265 -159 -95 -400 -236 -535 -315 -135 -79 -275 -161 -313 -184
                l-67 -41 -4 -1655 c-2 -910 -2 -1711 1 -1781 l6 -125 146 -82 c80 -45 229
                -128 331 -185 102 -56 275 -156 385 -221 226 -133 601 -354 780 -458 66 -39
                217 -128 335 -198 118 -70 292 -172 385 -227 94 -55 233 -139 310 -185 77 -47
                178 -104 224 -128 47 -23 121 -64 165 -92 l79 -49 61 32 c70 37 431 249 716
                419 107 64 254 151 325 192 370 213 544 314 1120 653 374 221 930 535 945 535
                5 0 11 6 12 13 7 55 1 3537 -6 3537 -11 0 -105 53 -416 238 -135 80 -333 197
                -440 260 -372 220 -816 485 -940 562 -195 119 -258 157 -510 305 -129 76 -291
                173 -360 215 -69 42 -179 108 -245 145 -66 37 -145 84 -175 105 -30 20 -59 39
                -65 42 -5 3 -26 -7 -45 -23z m151 -435 c63 -36 197 -116 299 -176 102 -61 239
                -142 305 -181 66 -39 163 -97 215 -130 52 -32 199 -120 325 -196 127 -75 313
                -187 415 -248 102 -61 309 -184 460 -273 151 -90 313 -188 360 -218 47 -30
                143 -83 214 -118 l128 -63 -1 -578 c-1 -318 -1 -1031 -1 -1585 0 -763 -3
                -1008 -12 -1008 -6 0 -77 -38 -157 -84 -80 -45 -213 -120 -296 -166 -82 -46
                -197 -112 -255 -148 -128 -79 -586 -347 -730 -427 -58 -32 -148 -83 -200 -115
                -52 -31 -140 -83 -195 -115 -55 -32 -134 -78 -175 -103 -41 -25 -127 -74 -190
                -110 -63 -35 -218 -127 -345 -205 -126 -77 -241 -147 -255 -155 -24 -14 -29
                -13 -90 25 -36 22 -128 74 -206 116 -77 42 -215 121 -305 175 -90 54 -218 129
                -284 167 -66 37 -219 127 -340 199 -121 73 -296 176 -390 230 -93 54 -267 156
                -385 226 -118 70 -318 187 -445 260 -126 73 -272 158 -322 188 l-93 54 0 1589
                0 1588 23 6 c27 9 259 138 382 213 50 31 143 86 208 124 66 38 185 107 265
                155 81 47 172 100 202 118 30 17 73 43 95 57 22 14 108 65 190 113 83 48 173
                101 200 118 229 139 520 309 1075 630 85 49 164 96 175 103 11 8 20 14 21 14
                1 0 53 -30 115 -66z"/>
                <path d="M4944 7987 c-45 -29 -163 -99 -263 -157 -192 -111 -412 -239 -726
                -424 -104 -62 -246 -145 -315 -186 -253 -148 -634 -375 -1027 -610 l-153 -91
                0 -1443 0 -1442 33 -12 c18 -6 91 -46 162 -88 72 -42 249 -145 395 -229 319
                -184 495 -286 780 -455 118 -70 269 -158 335 -195 66 -37 199 -115 295 -173
                96 -58 241 -140 322 -182 80 -43 169 -94 198 -115 l51 -37 67 44 c92 62 372
                228 617 368 61 34 187 106 280 160 94 53 271 155 395 225 124 71 284 163 355
                205 72 42 189 110 260 150 72 40 180 103 240 141 155 94 296 175 339 193 l36
                15 2 1413 c2 777 5 1419 8 1427 3 10 -16 25 -62 47 -70 35 -673 386 -787 458
                -36 23 -113 69 -171 102 -58 34 -258 152 -445 264 -187 111 -396 235 -465 275
                -69 39 -158 93 -198 119 -40 25 -130 78 -200 117 -70 39 -155 91 -189 115 -34
                24 -68 46 -75 48 -7 2 -50 -19 -94 -47z m148 -378 c34 -17 108 -60 164 -94 56
                -35 157 -93 224 -130 66 -36 216 -125 333 -197 185 -114 537 -324 737 -439 36
                -20 181 -106 322 -190 141 -85 294 -175 340 -201 l83 -47 -2 -1238 -1 -1238
                -44 -24 c-123 -67 -312 -176 -473 -271 -181 -107 -597 -346 -820 -471 -66 -37
                -210 -119 -320 -182 -110 -64 -249 -144 -310 -179 -60 -35 -150 -89 -200 -122
                -70 -46 -92 -56 -105 -48 -8 6 -94 55 -190 108 -96 53 -222 125 -280 159 -58
                34 -208 122 -335 195 -126 73 -261 152 -300 175 -38 24 -162 96 -275 160 -113
                65 -304 178 -425 250 -121 73 -268 158 -327 190 l-108 57 0 1246 0 1247 45 24
                c25 13 75 43 110 65 98 63 151 95 265 161 58 34 133 81 168 104 34 23 91 57
                126 75 35 19 80 45 98 60 19 14 38 26 42 26 5 0 47 24 94 53 48 30 112 69 142
                87 30 19 78 48 105 65 28 17 64 37 80 45 17 8 37 20 45 26 8 7 35 23 60 36 48
                26 132 77 190 114 19 13 58 36 86 51 29 15 85 46 125 69 41 22 117 65 169 94
                52 29 129 70 170 92 41 23 86 47 100 54 31 17 20 19 92 -17z"/>
                <path d="M4874 6842 c-77 -42 -181 -102 -230 -133 -49 -31 -120 -73 -159 -94
                -38 -20 -118 -66 -177 -101 -118 -72 -195 -108 -278 -133 -49 -15 -55 -20 -54
                -44 0 -15 1 -252 2 -527 2 -467 3 -501 20 -507 43 -14 381 -159 412 -176 31
                -17 93 -44 446 -192 113 -48 226 -99 424 -190 74 -35 146 -66 160 -70 14 -4
                80 -36 148 -71 67 -35 129 -64 137 -64 13 0 15 -38 15 -260 l0 -260 -51 -25
                c-27 -14 -79 -44 -115 -65 -35 -22 -106 -61 -157 -86 -92 -46 -172 -91 -299
                -166 l-67 -40 -33 20 c-30 19 -450 234 -595 305 l-63 31 0 151 c0 84 -3 193
                -6 243 -6 81 -9 92 -26 92 -19 0 -184 -72 -316 -137 -52 -27 -71 -41 -68 -52
                24 -79 40 -226 41 -370 l1 -164 54 -24 c30 -14 89 -38 130 -54 41 -16 115 -53
                165 -83 89 -53 128 -74 455 -245 91 -48 183 -99 206 -114 l41 -28 50 33 c28
                18 121 71 207 118 86 47 212 116 279 154 67 37 199 104 292 147 94 44 186 87
                205 97 l35 17 7 215 c4 118 7 347 5 509 l-2 295 -75 31 c-41 16 -84 35 -95 42
                -11 6 -58 27 -105 46 -47 20 -161 72 -255 117 -93 45 -220 102 -282 126 -61
                24 -152 64 -202 89 -88 44 -268 119 -422 175 -42 15 -118 50 -170 77 -52 27
                -108 54 -125 60 l-31 11 -7 273 c-7 255 -6 274 10 286 10 7 24 13 32 13 8 0
                26 9 42 20 15 11 55 34 88 52 78 43 269 155 304 179 15 11 31 19 36 19 5 0 15
                7 22 14 6 8 35 22 63 32 29 9 57 21 64 26 7 6 31 -2 70 -24 94 -53 264 -141
                475 -245 l197 -98 0 -259 c1 -242 2 -258 19 -251 35 13 259 85 315 101 l58 16
                -8 61 c-4 34 -8 173 -8 309 l0 247 -110 51 c-195 91 -442 222 -675 360 -224
                132 -294 170 -311 169 -8 0 -77 -35 -155 -77z"/>
                </g>
                </svg>
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
                          <span className="icon github-icon"><SiGithub /></span>
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
                            <span className="icon github-icon"><SiGithub /></span>
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

        <div className="social-links">
          <ul>
            <li><a href="https://github.com/skadri342" target="_blank" rel="noopener noreferrer"><SiGithub /></a></li>
            <li><a href="https://www.linkedin.com/in/shamskadri/" target="_blank" rel="noopener noreferrer"><SiLinkedin /></a></li>
            <li><a href="https://www.instagram.com/shams.kadri/" target="_blank" rel="noopener noreferrer"><SiInstagram /></a></li>
            <li><a href="" target="_blank" rel="noopener noreferrer"><SiDiscord /></a></li>
          </ul>
        </div>

        <div className="email-link">
          <a href="mailto:quadrishams342@gmail.com">quadrishams342@gmail.com</a>
        </div>

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