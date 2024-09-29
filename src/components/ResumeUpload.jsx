import { useState } from 'react';
import '../css/AdminComponents.css';

function ResumeUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    // Here you would typically send the file to your backend
    console.log('Uploading file:', selectedFile);
    // Reset the form after upload
    setSelectedFile(null);
    event.target.reset();
  };

  const handleVisibilityToggle = () => {
    setIsVisible(!isVisible);
    // Here you would typically update the visibility status in your backend
    console.log('Resume visibility toggled:', !isVisible);
  };

  return (
    <div className="resume-upload">
      <h2>Resume Upload</h2>
      <form onSubmit={handleUpload}>
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept=".pdf,.doc,.docx"
        />
        <button type="submit" disabled={!selectedFile}>
          Upload Resume
        </button>
      </form>
      <div className="resume-visibility">
        <h3>Resume Visibility</h3>
        <label>
          <input 
            type="checkbox" 
            checked={isVisible} 
            onChange={handleVisibilityToggle}
          />
          Make Resume Visible
        </label>
      </div>
      {/* You can add a list of uploaded resumes here in the future */}
    </div>
  );
}

export default ResumeUpload;