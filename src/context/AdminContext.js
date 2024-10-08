import { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [welcomeContent, setWelcomeContent] = useState({
    greeting: "Hi, my name is",
    name: "Shams Kadri.",
    title: "Computer/Software Engineer.",
    description: "I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences."
  });

  const [aboutContent, setAboutContent] = useState({
    title: "About Me",
    description: "Hello! My name is Brittany and I enjoy creating things that live on the internet. My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!",
    skills: ["JavaScript", "React", "Node.js", "Python", "SQL"]
  });

  const updateWelcomeAndAbout = (newWelcome, newAbout) => {
    setWelcomeContent(newWelcome);
    setAboutContent(newAbout);
  };

  return (
    <AdminContext.Provider value={{ welcomeContent, aboutContent, updateWelcomeAndAbout }}>
      {children}
    </AdminContext.Provider>
  );
};