import { useState } from 'react';
import { Link } from 'react-router-dom';
import AboutMeAdmin from '../components/AboutMeAdmin';
import WorkExperienceAdmin from '../components/WorkExperienceAdmin';
import ProjectsAdmin from '../components/ProjectsAdmin';
import MessagesAdmin from '../components/MessagesAdmin';
import ResumeUpload from '../components/ResumeUpload';
import '../css/AdminPanel.css';

function AdminPanel() {
  const [selectedSection, setSelectedSection] = useState('about');

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

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <Link to="/" className="user-view-button">Back to User View</Link>
      </header>
      <div className="admin-content">
        <nav className="admin-nav">
          <button onClick={() => setSelectedSection('about')}>About Me</button>
          <button onClick={() => setSelectedSection('experience')}>Work Experiences</button>
          <button onClick={() => setSelectedSection('projects')}>Projects</button>
          <button onClick={() => setSelectedSection('messages')}>Messages</button>
          <button onClick={() => setSelectedSection('resume')}>Resume</button>
        </nav>
        <main className="admin-main">
          {renderAdminComponent()}
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;