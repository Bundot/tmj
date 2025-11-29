import React, { Children, Component } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { InstagramIcon, TwitterIcon, YoutubeIcon, AppleIcon } from 'lucide-react';
/**
 * Footer Component
 *
 * Provides site footer with social links, copyright information,
 * and other relevant links.
 *
 * @returns {JSX.Element} The Footer component
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  // Social media links
  const socialLinks = [{
    name: 'Instagram',
    icon: <InstagramIcon size={20} />,
    url: 'https://instagram.com'
  }, {
    name: 'Twitter',
    icon: <TwitterIcon size={20} />,
    url: 'https://twitter.com'
  }, {
    name: 'YouTube',
    icon: <YoutubeIcon size={20} />,
    url: 'https://youtube.com'
  }, {
    name: 'Spotify',
    icon: <div />,
    url: 'https://spotify.com'
  }, {
    name: 'Apple Music',
    icon: <AppleIcon size={20} />,
    url: 'https://music.apple.com'
  }];
  // Animation variants for staggered animation
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const item = {
    hidden: {
      opacity: 0,
      y: 10
    },
    show: {
      opacity: 1,
      y: 0
    }
  };
  return <footer className="bg-muted py-12 px-4 md:px-6">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding and Tagline */}
        <div>
          <motion.h3 className="text-2xl font-bold mb-4" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }}>
            TMJ
          </motion.h3>
          <motion.p className="text-muted-foreground mb-6" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }}>
            Nigerian singer-songwriter blending Afropop, R&B, and traditional
            Juju with socially conscious storytelling.
          </motion.p>
        </div>
        {/* Quick Links */}
        <div>
          <motion.h4 className="text-lg font-semibold mb-4" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }}>
            Quick Links
          </motion.h4>
          <motion.ul className="space-y-2" variants={container} initial="hidden" whileInView="show" viewport={{
            once: true
          }}>
            {['Music', 'Events', 'Community', 'Merch', 'Contact'].map(link => <motion.li key={link} variants={item}>
              <a href={`#${link.toLowerCase()}`} className="text-muted-foreground hover:text-foreground transition-colors">
                {link}
              </a>
            </motion.li>)}
          </motion.ul>
        </div>
        {/* Social Media */}
        <div>
          <motion.h4 className="text-lg font-semibold mb-4" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.3
          }}>
            Connect
          </motion.h4>
          <motion.div className="flex flex-wrap gap-4" variants={container} initial="hidden" whileInView="show" viewport={{
            once: true
          }}>
            {socialLinks.map(social => <motion.a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="bg-background text-foreground p-2 rounded-full hover:text-primary transition-colors" aria-label={`Follow on ${social.name}`} variants={item} whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }}>
              {social.icon}
            </motion.a>)}
          </motion.div>
        </div>
      </div>
      {/* Copyright and Legal */}
      <motion.div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center" initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0.5
      }}>
        <p className="text-sm text-muted-foreground mb-4 md:mb-0">
          &copy; {currentYear} TMJ (Tomide Joseph). All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms of Use
          </a>
          <Link to="/login" className="hover:text-foreground transition-colors">
            Admin Login
          </Link>
        </div>
      </motion.div>
    </div>
  </footer>;
};