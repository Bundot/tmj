import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInViewSection } from '../../hooks/useInViewSection';
import { MenuIcon, XIcon } from 'lucide-react';

/**
 * Header Component
 *
 * Sticky header with navigation links.
 * Includes mobile responsive navigation menu.
 * Uses IntersectionObserver to highlight the active section.
 *
 * @returns {JSX.Element} The Header component
 */
export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useInViewSection();
  const { scrollY } = useScroll();

  // Transform header background opacity based on scroll position
  const headerBgOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const headerShadowOpacity = useTransform(scrollY, [0, 50], [0, 0.1]);

  // Define navigation links
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#music', label: 'Music' },
    { href: '#about', label: 'About' },
    { href: '#events', label: 'Events' },
    // { href: '#community', label: 'Community' },
    { href: '#merch', label: 'Merch' },
    { href: '#media', label: 'Media' },
    { href: '#contact', label: 'Contact' }
  ];

  // Close mobile menu when a link is clicked or when window is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle smooth scrolling to section when nav link is clicked
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 flex items-center justify-between"
      style={{
        backgroundColor: `rgba(var(--color-background-rgb), ${headerBgOpacity.get()})`,
        backdropFilter: 'blur(8px)',
        boxShadow: `0 1px 3px rgba(0, 0, 0, ${headerShadowOpacity.get()})`
      }}
    >
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      {/* Logo/Brand */}
      <motion.a
        href="#home"
        className="text-xl font-bold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => handleNavClick(e, '#home')}
      >
        TMJ
      </motion.a>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-1">
        <ul className="flex space-x-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3 py-2 text-sm rounded-md transition-colors hover:text-primary ${
                  activeSection === link.href.substring(1) ? 'text-primary' : ''
                }`}
                aria-current={activeSection === link.href.substring(1) ? 'page' : undefined}
              >
                {link.label}
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation Toggle */}
      <div className="flex items-center md:hidden">
        <button
          className="ml-2 p-2 rounded-md hover:bg-muted"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 top-[68px] z-40 bg-background md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <nav className="flex flex-col p-4">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <motion.li
                key={link.href}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block px-3 py-2 text-lg ${
                    activeSection === link.href.substring(1) ? 'text-primary font-medium' : ''
                  }`}
                  aria-current={activeSection === link.href.substring(1) ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </motion.header>
  );
};
