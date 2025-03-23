import React, { useEffect, useState } from 'react';

interface HeaderProps {
  isVisible: boolean;
  currentSection: string;
  onNavigate: (section: string) => void;
  isInitialTransition: boolean;
  hasInitialTransition: boolean;
}

export default function Header({ 
  isVisible, 
  currentSection, 
  onNavigate, 
  isInitialTransition, 
  hasInitialTransition 
}: HeaderProps) {
  const [prevSection, setPrevSection] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);

  useEffect(() => {
    if (!currentSection || currentSection === prevSection) {
      return;
    }

    if (prevSection) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPrevSection(currentSection);
      }, 900);
      return () => clearTimeout(timer);
    } else {
      setPrevSection(currentSection);
      // For initial transition, delay showing the header title
      if (!hasInitialTransition) {
        const timer = setTimeout(() => {
          setShowHeaderTitle(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [currentSection, prevSection, hasInitialTransition]);

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-40
        bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-sm
        transform transition-all duration-700 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-3 items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">John Doe</h1>
            <span className="text-blue-400 text-sm">Web Developer</span>
          </div>

          <div className="flex justify-center relative h-8 overflow-hidden">
            {/* Previous title */}
            {isTransitioning && hasInitialTransition && (
              <h2 
                className="text-2xl font-bold text-white absolute left-1/2 -translate-x-1/2 animate-header-title-slide-right-exit"
              >
                {prevSection.charAt(0).toUpperCase() + prevSection.slice(1)}
              </h2>
            )}
            
            {/* Current title */}
            {currentSection && (showHeaderTitle || hasInitialTransition) && (
              <h2 
                key={currentSection}
                className={`
                  text-2xl font-bold text-white absolute left-1/2 -translate-x-1/2
                  ${!isVisible ? 'opacity-0' : ''}
                  ${isInitialTransition ? 'animate-title-to-header' : ''}
                  ${!isInitialTransition && !hasInitialTransition ? 'animate-header-title-in' : ''}
                  ${!isInitialTransition && hasInitialTransition && isTransitioning ? 'animate-header-title-slide-left-enter' : ''}
                  ${!isInitialTransition && hasInitialTransition && !isTransitioning ? 'opacity-100' : ''}
                `}
              >
                {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
              </h2>
            )}
          </div>

          <nav className="flex justify-end">
            <div className="bg-white/10 backdrop-blur-sm shadow-lg rounded-full p-2">
              <ul className="flex space-x-2">
                {['about', 'projects', 'contact'].map((section) => (
                  <li key={section}>
                    <button
                      onClick={() => onNavigate(section)}
                      className={`
                        px-6 py-2 rounded-full transition-all duration-300
                        ${currentSection === section 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-300 hover:text-white hover:bg-blue-600/50'
                        }
                      `}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
