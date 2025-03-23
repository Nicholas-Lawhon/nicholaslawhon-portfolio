// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [showHeader, setShowHeader] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasInitialTransition, setHasInitialTransition] = useState(false);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 2300);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  const handleNavigation = (section: string) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSection(section);
    setShowWelcome(false);

    if (!hasInitialTransition) {
      // First transition - animate from center
      setTimeout(() => {
        setShowHeader(true);
      }, 800);

      setTimeout(() => {
        setHasInitialTransition(true);
        setIsTransitioning(false);
      }, 1600);
    } else {
      // Subsequent transitions - instant header update
      setShowHeader(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      <Header 
        isVisible={showHeader} 
        currentSection={currentSection}
        onNavigate={handleNavigation}
        isInitialTransition={isTransitioning && !hasInitialTransition}
        hasInitialTransition={hasInitialTransition}
      />

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">
              <span className="block mb-2 clip-text animate-reveal">John Doe</span>
              <span className="text-3xl block clip-text animate-reveal-delayed">Web Developer</span>
            </h1>
          </div>
        </div>
      )}

      <div 
        className={`
          flex items-center justify-center min-h-screen 
          ${showContent ? 'opacity-100' : 'opacity-0'} 
          transition-all duration-1000
          ${showHeader ? 'mt-20' : ''}
        `}
      >
        <div className="text-center text-white w-full">
          {showWelcome && (
            <div 
              className={`transform ${showContent ? 'animate-slide-from-left' : ''}`}
              style={{ animationDelay: '0.3s' }}
            >
              <h1 className="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
              <p className="text-xl mb-8">Discover my journey, projects, and passion</p>
            </div>
          )}
          
          {!showHeader && !isTransitioning && (
            <div 
              className={`
                flex justify-center space-x-4 
                ${showContent ? 'animate-slide-from-right opacity-100' : 'opacity-0'} 
                transition-all duration-700
              `} 
              style={{ animationDelay: '0.6s' }}
            >
              <nav className="bg-white shadow-md rounded-full p-2 flex space-x-4">
                {['about', 'projects', 'contact'].map((section, index) => (
                  <button
                    key={section}
                    onClick={() => handleNavigation(section)}
                    className={`
                      px-6 py-2 rounded-full transition duration-300 
                      bg-blue-600 text-white hover:bg-blue-700 transform 
                      opacity-0 animate-fade-in
                    `}
                    style={{ 
                      animationDelay: `${0.8 + index * 0.15}s`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
          )}

          {isTransitioning && !hasInitialTransition && (
            <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
              <h2 className="text-4xl font-bold text-white animate-title-to-header">
                {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
              </h2>
            </div>
          )}

          {showHeader && !isTransitioning && (
            <div className="container mx-auto px-4">
              {currentSection === 'about' && (
                <div className="animate-content-reveal max-w-3xl mx-auto">
                  <p className="text-lg leading-relaxed mb-6">
                    I'm a passionate web developer with a keen eye for detail and a love for creating
                    beautiful, functional websites. With expertise in modern web technologies,
                    I bring ideas to life through clean code and intuitive design.
                  </p>
                  <p className="text-lg leading-relaxed">
                    My journey in web development started with a curiosity for how things work on the internet,
                    and has evolved into a professional pursuit of creating exceptional digital experiences.
                  </p>
                </div>
              )}

              {currentSection === 'projects' && (
                <div className="animate-content-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((project) => (
                    <div key={project} className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                      <h3 className="text-xl font-bold mb-2">Project {project}</h3>
                      <p className="text-gray-300">
                        Description of project {project}. Click to learn more about this exciting work.
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {currentSection === 'contact' && (
                <div className="animate-content-reveal max-w-xl mx-auto">
                  <p className="text-lg mb-8">
                    Let's work together! Feel free to reach out through any of these channels:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-4">
                      <span className="text-blue-400">Email:</span>
                      <a href="mailto:contact@johndoe.com" className="hover:text-blue-400 transition-colors">
                        contact@johndoe.com
                      </a>
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                      <span className="text-blue-400">LinkedIn:</span>
                      <a href="#" className="hover:text-blue-400 transition-colors">
                        /in/johndoe
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}