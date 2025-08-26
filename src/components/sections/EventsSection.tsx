import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { CalendarIcon, MapPinIcon, ExternalLinkIcon } from 'lucide-react';

/**
 * Event Interface
 */
interface Event {
  id: string;
  title: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  ticketUrl?: string;
  sold_out?: boolean;
}

/**
 * EventCard Component Props
 */
interface EventCardProps {
  event: Event;
  isPast?: boolean;
}

/**
 * EventCard Component
 *
 * Displays information about a single event including date, venue,
 * location, and ticket link if available.
 */
const EventCard: React.FC<EventCardProps> = ({ event, isPast = false }) => {
  // Format date
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.div
      className="bg-card rounded-lg overflow-hidden border border-border"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg mb-1">{event.title}</h3>
            <p className="text-muted-foreground">{event.venue}</p>
          </div>
          <div
            className={`text-right ${
              isPast ? 'text-muted-foreground' : 'text-primary'
            }`}
          >
            <p className="font-medium">{formattedDate}</p>
            <p className="text-sm">{event.time}</p>
          </div>
        </div>
        <div className="flex items-center mb-4 text-sm">
          <MapPinIcon size={16} className="mr-1 text-muted-foreground" />
          <span>{event.location}</span>
        </div>
        {!isPast && (
          <div className="mt-4">
            {event.sold_out ? (
              <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-sm font-medium rounded-md">
                Sold Out
              </span>
            ) : event.ticketUrl ? (
           <Button
              size="sm"
              aria-label={`Get tickets for ${event.title}`}
              className="inline-flex items-center"
            >
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                Get Tickets
                <ExternalLinkIcon size={14} className="ml-1" />
              </a>
            </Button>
            ) : (
              <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-sm font-medium rounded-md">
                Coming Soon
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

/**
 * MapImage Component
 *
 * Displays a static map image with event locations.
 */
const MapImage: React.FC = () => {
  return (
    <div className="rounded-lg overflow-hidden border border-border relative">
      <img
        src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
        alt="TMJ Tour Map"
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-background/30"></div>
      <div className="absolute bottom-4 left-4 bg-card p-3 rounded-md shadow-md">
        <h4 className="font-semibold text-sm mb-1">2025 World Tour</h4>
        <p className="text-xs text-muted-foreground">
          Nigeria · Ghana · UK · USA · Canada
        </p>
      </div>
    </div>
  );
};

/**
 * EventsSection Component
 *
 * Displays upcoming and past events, with a map visualization
 * and ticket links.
 */
export const EventsSection: React.FC = () => {
  const [showPastEvents, setShowPastEvents] = useState(false);

  // Mock event data - in a real app, this would come from an API or content file
  const upcomingEvents: Event[] = [
    {
      id: 'e1',
      title: 'Afrobeats Night',
      venue: 'The Shrine',
      location: 'Lagos, Nigeria',
      date: '2025-04-15',
      time: '8:00 PM',
      ticketUrl: 'https://tickets.example.com/e1',
    },
    {
      id: 'e2',
      title: 'Unity Festival',
      venue: 'National Stadium',
      location: 'Abuja, Nigeria',
      date: '2025-05-22',
      time: '7:30 PM',
      ticketUrl: 'https://tickets.example.com/e2',
    },
    {
      id: 'e3',
      title: 'Summer Jam',
      venue: 'O2 Academy',
      location: 'London, UK',
      date: '2025-06-10',
      time: '9:00 PM',
      ticketUrl: 'https://tickets.example.com/e3',
    },
    {
      id: 'e4',
      title: 'Global Beats Tour',
      venue: 'Apollo Theater',
      location: 'New York, USA',
      date: '2025-07-05',
      time: '8:00 PM',
    },
    {
      id: 'e5',
      title: 'African Heritage Festival',
      venue: 'Rogers Centre',
      location: 'Toronto, Canada',
      date: '2025-07-18',
      time: '6:30 PM',
    },
    {
      id: 'e6',
      title: 'Homecoming Concert',
      venue: 'Freedom Park',
      location: 'Osun State, Nigeria',
      date: '2025-08-30',
      time: '7:00 PM',
      sold_out: true,
    },
  ];

  const pastEvents: Event[] = [
    {
      id: 'p1',
      title: 'Album Preview',
      venue: 'Jazz Café',
      location: 'Lagos, Nigeria',
      date: '2024-11-20',
      time: '8:00 PM',
    },
    {
      id: 'p2',
      title: 'Charity Concert',
      venue: 'Community Center',
      location: 'Osun State, Nigeria',
      date: '2024-10-05',
      time: '6:30 PM',
    },
    {
      id: 'p3',
      title: 'University Tour',
      venue: 'University of Lagos',
      location: 'Lagos, Nigeria',
      date: '2024-09-15',
      time: '7:00 PM',
    },
    {
      id: 'p4',
      title: 'Radio Showcase',
      venue: 'Beat FM Studios',
      location: 'Lagos, Nigeria',
      date: '2024-08-22',
      time: '5:30 PM',
    },
  ];

  // Toggle past events visibility
  const togglePastEvents = () => setShowPastEvents(!showPastEvents);

  return (
    <Section id="events" className="bg-background">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Events & Tour Dates
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience TMJ&apos;s electrifying live performances across Nigeria
              and beyond. Check back regularly for new tour dates and ticket
              information.
            </p>
          </motion.div>
        </div>

        {/* Map Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <MapImage />
        </motion.div>

        {/* Upcoming Events */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-semibold mb-6 flex items-center"
          >
            <CalendarIcon size={20} className="mr-2" />
            Upcoming Events
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * (index % 2) + 0.3,
                }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Past Events (Collapsible) */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-between mb-6"
          >
            <h3 className="text-2xl font-semibold flex items-center">
              <CalendarIcon size={20} className="mr-2" />
              Past Events
            </h3>
            <Button
              variant="ghost"
              onClick={togglePastEvents}
              aria-expanded={showPastEvents}
            >
              {showPastEvents ? 'Hide Past Events' : 'Show Past Events'}
            </Button>
          </motion.div>
          <AnimatePresence>
            {showPastEvents && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {pastEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <EventCard event={event} isPast />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
};
