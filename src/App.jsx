import React, { useEffect, useState } from 'react';
import './App.css';
import StarsCanvas from './StarsCanvas';

function App() {
  const [isProjectsPaused, setIsProjectsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const projectsData = [
    { id: 1, title: 'Vrishti - Weather System', link: 'https://github.com/Thejuskalyadan/weatherbuddy', desc: 'IoT-based real-time weather monitoring and microclimate analysis system using ESP32 & ThingSpeak. Showcased at KSCSTE.' },
    { id: 2, title: 'Hush Baby - Cry Alert', link: 'https://github.com/Thejuskalyadan/baby_cry', desc: 'IoT-based baby cry detection system for hearing-impaired parents with real-time wearable notifications.' },
    { id: 3, title: 'Lumora - Stargazing', link: 'https://github.com/ThejusKalyadan', desc: 'Portable IoT-enabled stargazing system with laser-based celestial tracking. Presented to IUCAA faculty.' },
    { id: 4, title: 'Full Stack Integration', link: 'https://github.com/ThejusKalyadan', desc: 'Scalable MERN stack and REST API development engineered for high performance data transmission and hardware syncing.' },
    { id: 5, title: 'Blood Bank System', link: 'https://github.com/Thejuskalyadan/bloodbank', desc: 'A comprehensive blood bank management platform built to streamline blood donation, tracking securely, and managing recipient requests.' },
    { id: 6, title: 'Furniture Shop App', link: 'https://github.com/Thejuskalyadan/furniture-shop', desc: 'A responsive and interactive online furniture shopping E-commerce application featuring advanced UI components and dynamic state management.' }
  ];

  // Duplicated twice to create a seamless infinite scroll illusion
  const duplicatedProjects = [...projectsData, ...projectsData];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    });
    
    // Select all hidden elements to animate them on scroll
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
    
    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Determine active section for bot
  const [activeSection, setActiveSection] = useState('home');
  const [isBotFlipping, setIsBotFlipping] = useState(false);

  const handleBotClick = () => {
    if (isBotFlipping) return;
    setIsBotFlipping(true);
    setTimeout(() => setIsBotFlipping(false), 600); // 600ms for an agile flip
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'objective', 'education', 'skills', 'experience', 'projects'];
      let current = 'home';
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2.5) {
            current = section;
          }
        }
      }
      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const getBotMessage = () => {
    switch(activeSection) {
      case 'home': return "Hi there!  I'm your guide! Scroll down to explore My portfolio!";
      case 'objective': return "Thejus is highly skilled in MERN stack and IoT real-time apps! ";
      case 'education': return "Postgraduate Master's & Bachelor's from Kannur University! ";
      case 'skills': return "Wow, so many skills! React, Node.js, ESP32, and more! ";
      case 'experience': return "Building scalable apps and designing REST APIs at IOTRICS LLP! ";
      case 'projects': return "My favorite part! Click a running project block to pause and read! ";
      default: return "Hi there! Scroll down to explore!";
    }
  };

  return (
    <>
      <StarsCanvas />

      {/* Loading Screen */}
      <div className={`loader-overlay ${isLoaded ? 'fade-out' : ''}`}>
        <div className="loader-content">
          <h1 className="glitch" data-text="Thejus K">Thejus K</h1>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
      
      {/* Floating Pill Navigation */}
      <nav className={`pill-nav ${isLoaded ? 'show' : ''} hidden`}>
        <a href="#home" className="nav-item">Home</a>
        <a href="#objective" className="nav-item">About</a>
        <a href="#experience" className="nav-item">Experience</a>
        <a href="#projects" className="nav-item">Work</a>
      </nav>

      <div className={`portfolio-app ${isLoaded ? 'loaded' : ''}`}>
      {/* Hero Section */}
      <header className="hero-section hidden" id="home">
        <div className="status-badge">
          <span className="status-dot"></span> Available for work
        </div>
        <h1 className="glitch" data-text="THEJUS K">THEJUS K</h1>
        <h2 className="subtitle">Full Stack Developer & IoT Engineer | Kannur, Kerala</h2>
        <div className="contact-info">
          <a href="mailto:thejanthejus@gmail.com">thejanthejus@gmail.com</a>
          <a href="tel:+919745414871">+91 9745414871</a>
          <a href="https://linkedin.com/in/ThejusKalyadan" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/ThejusKalyadan" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </header>

      {/* Career Objective */}
      <section className="section hidden" id="objective">
        <h2 className="section-title">Career Objective</h2>
        <div className="glass-card">
          <p>
            Computer Science postgraduate with hands-on experience in full stack development, backend systems, and IoT-based real-time applications. Skilled in MERN stack development, REST API design, database management, and system integration. Seeking an entry-level Full Stack Developer, Backend Developer, or IoT Engineer role to contribute to scalable and impactful real-world solutions.
          </p>
        </div>
      </section>

      {/* Education */}
      <section className="section hidden" id="education">
        <h2 className="section-title">Education</h2>
        <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
          <h3>M.Sc. Computer Science</h3>
          <p className="sub-text">Kannur University • 2023 - 2025</p>
        </div>
        <div className="glass-card">
          <h3>B.Sc. Computer Science</h3>
          <p className="sub-text">Kannur University • 2020 - 2023</p>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="section hidden" id="skills">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {['JavaScript', 'Python', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'REST APIs', 'HTML', 'CSS', 'Tailwind CSS', 'ESP32', 'Sensors', 'ThingSpeak', 'Git', 'GitHub', 'VS Code', 'Machine Learning'].map(skill => (
            <div key={skill} className="skill-tag">{skill}</div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="section hidden" id="experience">
        <h2 className="section-title">Experience</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="glass-card">
              <h3>Full Stack Developer (Associate)</h3>
              <p className="sub-text">IOTRICS LLP (Startup under KU-IIF) • May 2025 - Present</p>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.6' }}>
                <li>Developed scalable full stack web applications using the MERN stack.</li>
                <li>Designed and implemented RESTful APIs using Node.js and Express.js.</li>
                <li>Managed MongoDB database schemas and backend logic.</li>
                <li>Assisted in machine learning model development and optimization.</li>
                <li>Contributed to rapid prototyping in a startup-driven R&D environment.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section hidden" id="projects">
        <h2 className="section-title">Projects</h2>
        <div 
          className="marquee-container" 
          onClick={() => setIsProjectsPaused(!isProjectsPaused)}
        >
          <div className={`marquee-content ${isProjectsPaused ? 'paused' : ''}`}>
            {duplicatedProjects.map((project, index) => (
              <div key={`${project.id}-${index}`} className="glass-card project-card running-block">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn" onClick={(e) => { e.stopPropagation(); }}>View Project</a>
              </div>
            ))}
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          * Click the running blocks to {isProjectsPaused ? 'resume' : 'pause'} scrolling
        </p>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} THEJUS K. All rights reserved.</p>
      </footer>
      
      {/* Animated Companion Bot */}
      <div className={`companion-bot-container ${isLoaded ? 'show' : 'hidden'}`}>
        <div style={{ transform: 'scale(1.25)', transformOrigin: 'top right', display: 'flex', flexDirection: 'column-reverse', alignItems: 'flex-end', gap: '1.5rem' }}>
          <div className={`bot-speech-bubble visible`}>
            {getBotMessage()}
          </div>
          <div className="bot-float-wrapper">
            <div className={`bot-character ${isBotFlipping ? 'bot-flip' : ''}`} onClick={handleBotClick}>
              <div className="bot-head">
                <div className="bot-eyes">
                  <div className="bot-eye"></div>
                  <div className="bot-eye"></div>
                </div>
              </div>
              <div className="bot-arm-left"></div>
              <div className="bot-body"></div>
              <div className="bot-arm-right"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
