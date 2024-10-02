import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/AdminComponents.css';

function ResumeUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResumeUrl();
  }, []);

  const fetchResumeUrl = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/resume/url');
      // Construct the full URL
      setResumeUrl(`http://localhost:3000${response.data.url}`);
    } catch (error) {
      console.error('Error fetching resume URL:', error);
      setError('Failed to fetch resume URL');
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token
        }
      });
      setError('');
      setSelectedFile(null);
      fetchResumeUrl(); // Fetch the new URL after successful upload
    } catch (error) {
      console.error('Error uploading resume:', error);
      setError('Failed to upload resume');
    }
  };

  return (
    <div className="resume-upload">
      <h2>Resume Upload</h2>
      <form onSubmit={handleUpload}>
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept=".pdf"
        />
        <button type="submit" disabled={!selectedFile}>
          Upload Resume
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {resumeUrl && (
        <div>
          <h3>Current Resume</h3>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;