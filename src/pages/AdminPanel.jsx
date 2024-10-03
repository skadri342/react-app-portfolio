import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AboutMeAdmin from '../components/AboutMeAdmin';
import WorkExperienceAdmin from '../components/WorkExperienceAdmin';
import ProjectsAdmin from '../components/ProjectsAdmin';
import MessagesAdmin from '../components/MessagesAdmin';
import ResumeUpload from '../components/ResumeUpload';
import '../css/AdminPanel.css';

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedSection, setSelectedSection] = useState('about');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/admin');
        return;
      }

      try {
        await axios.get('http://localhost:3000/api/auth/verify', {
          headers: { 'x-auth-token': token }
        });
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('token');
        navigate('/admin');
      }
    };

    checkAuth();
  }, [navigate]);

  const renderAdminComponent = () => {
    switch (selectedSection) {
      case 'about':
        return <AboutMeAdmin />;
      case 'experience':
        return <WorkExperienceAdmin />;
      case 'projects':
        return <ProjectsAdmin />;
      case 'messages':
        return <MessagesAdmin />;
      case 'resume':
        return <ResumeUpload />;
      default:
        return <div>Select a section</div>;
    }
  };

  if (!isAuthenticated) {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <div className='admin-panel-page'>
      <div className="admin-panel">
        <header className="admin-header">
          <h1>Admin Panel</h1>
          <Link to="/" className="user-view-button">Back to User View</Link>
        </header>
        <div className="admin-content">
          <nav className="admin-nav">
            <button 
              onClick={() => setSelectedSection('about')}
              className={selectedSection === 'about' ? 'active' : ''}
            >
              About Me
            </button>
            <button 
              onClick={() => setSelectedSection('experience')}
              className={selectedSection === 'experience' ? 'active' : ''}
            >
              Work Experiences
            </button>
            <button 
              onClick={() => setSelectedSection('projects')}
              className={selectedSection === 'projects' ? 'active' : ''}
            >
              Projects
            </button>
            <button 
              onClick={() => setSelectedSection('messages')}
              className={selectedSection === 'messages' ? 'active' : ''}
            >
              Messages
            </button>
            <button 
              onClick={() => setSelectedSection('resume')}
              className={selectedSection === 'resume' ? 'active' : ''}
            >
              Resume
            </button>
          </nav>
          <main className="admin-main">
            {renderAdminComponent()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;