import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { HeartIcon, CalendarIcon, ExternalLinkIcon } from 'lucide-react';
/**
 * Cause Interface
 */
interface Cause {
  id: string;
  title: string;
  description: string;
  image: string;
  actionUrl: string;
  lastUpdate: string;
}
/**
 * CauseCard Component Props
 */
interface CauseCardProps {
  cause: Cause;
}
/**
 * CauseCard Component
 *
 * Displays information about a cause that TMJ supports,
 * with image, description, and call-to-action.
 *
 * @param {CauseCardProps} props - The component props
 * @returns {JSX.Element} The CauseCard component
 */
const CauseCard: React.FC<CauseCardProps> = ({
  cause
}) => {
  // Format date for last update
  const updateDate = new Date(cause.lastUpdate);
  const formattedDate = updateDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  return <motion.div className="bg-card rounded-lg overflow-hidden border border-border" whileHover={{
    y: -5
  }} transition={{
    duration: 0.3
  }}>
      <div className="aspect-[16/9] overflow-hidden">
        <img src={cause.image} alt={cause.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-xl mb-3">{cause.title}</h3>
        <p className="text-muted-foreground mb-4">{cause.description}</p>
        <div className="flex items-center text-xs text-muted-foreground mb-4">
          <CalendarIcon size={14} className="mr-1" />
          <span>Last update: {formattedDate}</span>
        </div>
        <Button as="a" href={cause.actionUrl} target="_blank" rel="noopener noreferrer" className="w-full justify-center">
          Take Action
          <ExternalLinkIcon size={14} className="ml-1" />
        </Button>
      </div>
    </motion.div>;
};
/**
 * NewsletterForm Component
 *
 * Simple signup form for the community newsletter.
 *
 * @returns {JSX.Element} The NewsletterForm component
 */
const NewsletterForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, this would submit the form data to a backend
    alert("Thank you for signing up! You'll receive updates soon.");
  };
  return <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email Address
        </label>
        <input type="email" id="email" required placeholder="your@email.com" className="w-full p-3 rounded-md bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div className="flex items-start">
        <input type="checkbox" id="consent" required className="mt-1 mr-2" />
        <label htmlFor="consent" className="text-sm text-muted-foreground">
          I agree to receive updates about TMJ's music and activism. You can
          unsubscribe at any time.
        </label>
      </div>
      <Button type="submit" fullWidth>
        Join the Movement
      </Button>
    </form>;
};
/**
 * CommunitySection Component
 *
 * Displays information about causes supported by TMJ,
 * with updates and a signup form.
 *
 * @returns {JSX.Element} The CommunitySection component
 */
export const CommunitySection: React.FC = () => {
  // Mock causes data - in a real app, this would come from an API or content file
  const causes: Cause[] = [{
    id: 'c1',
    title: 'Education for All',
    description: 'Supporting access to quality education for children in underserved communities across Nigeria.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    actionUrl: 'https://example.org/education',
    lastUpdate: '2025-02-10'
  }, {
    id: 'c2',
    title: 'Arts & Cultural Preservation',
    description: 'Preserving traditional Nigerian music and art forms through workshops and community events.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    actionUrl: 'https://example.org/arts',
    lastUpdate: '2025-01-15'
  }, {
    id: 'c3',
    title: 'Environmental Justice',
    description: "Advocating for environmental protection and sustainable practices in Nigeria's urban centers.",
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    actionUrl: 'https://example.org/environment',
    lastUpdate: '2024-12-05'
  }];
  return <Section id="community" className="bg-muted">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center">
          <motion.div initial={{
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center">
              <HeartIcon size={28} className="mr-2 text-primary" />
              Join the Movement
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              TMJ's music is more than entertainment—it's a platform for
              positive change. Learn about the causes we support and how you can
              get involved.
            </p>
          </motion.div>
        </div>
        {/* Causes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {causes.map((cause, index) => <motion.div key={cause.id} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.1 * index
        }}>
              <CauseCard cause={cause} />
            </motion.div>)}
        </div>
        {/* Newsletter Signup */}
        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{
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
              <h3 className="text-2xl font-semibold mb-4">Stay Connected</h3>
              <p className="text-muted-foreground mb-6">
                Sign up for our newsletter to receive updates on TMJ's music,
                upcoming events, and opportunities to support the causes we care
                about.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <CalendarIcon size={20} className="text-primary" />
                  </div>
                  <span>Regular updates on events and releases</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <HeartIcon size={20} className="text-primary" />
                  </div>
                  <span>Exclusive opportunities to support our causes</span>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{
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
              <NewsletterForm />
            </motion.div>
          </div>
        </div>
      </div>
    </Section>;
};