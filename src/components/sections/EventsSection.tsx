import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { CalendarIcon, MapPinIcon, ExternalLinkIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useContent, Event } from '../../context/ContentContext';
import { EditOverlay } from '../admin/EditOverlay';
import { EditModal } from '../admin/EditModal';

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
            className={`text-right ${isPast ? 'text-muted-foreground' : 'text-primary'
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
 */
const MapImage: React.FC<{ mapImage: string; title: string; locations: string }> = ({ mapImage, title, locations }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-border relative">
      <img
        src={mapImage}
        alt="TMJ Tour Map"
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-background/30"></div>
      <div className="absolute bottom-4 left-4 bg-card p-3 rounded-md shadow-md">
        <h4 className="font-semibold text-sm mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground">
          {locations}
        </p>
      </div>
    </div>
  );
};

/**
 * EventsSection Component
 */
export const EventsSection: React.FC = () => {
  const { eventsContent, updateEventsContent } = useContent();
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editUpcomingEvents, setEditUpcomingEvents] = useState<Event[]>(eventsContent.upcomingEvents);
  const [editPastEvents, setEditPastEvents] = useState<Event[]>(eventsContent.pastEvents);
  const [editTourInfo, setEditTourInfo] = useState(eventsContent.tourInfo);

  useEffect(() => {
    setEditUpcomingEvents(eventsContent.upcomingEvents);
    setEditPastEvents(eventsContent.pastEvents);
    setEditTourInfo(eventsContent.tourInfo);
  }, [eventsContent]);

  const handleSave = () => {
    updateEventsContent({
      upcomingEvents: editUpcomingEvents,
      pastEvents: editPastEvents,
      tourInfo: editTourInfo
    });
    setIsEditModalOpen(false);
  };

  const addUpcomingEvent = () => {
    setEditUpcomingEvents([...editUpcomingEvents, {
      id: `e${Date.now()}`,
      title: 'New Event',
      venue: 'Venue Name',
      location: 'City, Country',
      date: new Date().toISOString().split('T')[0],
      time: '8:00 PM',
      ticketUrl: '',
      sold_out: false
    }]);
  };

  const addPastEvent = () => {
    setEditPastEvents([...editPastEvents, {
      id: `p${Date.now()}`,
      title: 'Past Event',
      venue: 'Venue Name',
      location: 'City, Country',
      date: new Date().toISOString().split('T')[0],
      time: '8:00 PM'
    }]);
  };

  const removeUpcomingEvent = (index: number) => {
    setEditUpcomingEvents(editUpcomingEvents.filter((_, i) => i !== index));
  };

  const removePastEvent = (index: number) => {
    setEditPastEvents(editPastEvents.filter((_, i) => i !== index));
  };

  const updateUpcomingEvent = (index: number, field: keyof Event, value: any) => {
    const newEvents = [...editUpcomingEvents];
    newEvents[index] = { ...newEvents[index], [field]: value };
    setEditUpcomingEvents(newEvents);
  };

  const updatePastEvent = (index: number, field: keyof Event, value: any) => {
    const newEvents = [...editPastEvents];
    newEvents[index] = { ...newEvents[index], [field]: value };
    setEditPastEvents(newEvents);
  };

  const togglePastEvents = () => setShowPastEvents(!showPastEvents);

  return (
    <>
      <Section id="events" className="bg-background">
        <EditOverlay onEdit={() => setIsEditModalOpen(true)} label="Edit Events">
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
              <MapImage
                mapImage={eventsContent.tourInfo.mapImage}
                title={eventsContent.tourInfo.title}
                locations={eventsContent.tourInfo.locations}
              />
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
                {eventsContent.upcomingEvents.map((event, index) => (
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
                    {eventsContent.pastEvents.map((event, index) => (
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
        </EditOverlay>
      </Section>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Events & Tour"
        onSave={handleSave}
      >
        <div className="space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Tour Info */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Tour Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Tour Title</label>
                <input
                  type="text"
                  value={editTourInfo.title}
                  onChange={(e) => setEditTourInfo({ ...editTourInfo, title: e.target.value })}
                  className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Locations</label>
                <input
                  type="text"
                  value={editTourInfo.locations}
                  onChange={(e) => setEditTourInfo({ ...editTourInfo, locations: e.target.value })}
                  className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Map Image URL</label>
                <input
                  type="text"
                  value={editTourInfo.mapImage}
                  onChange={(e) => setEditTourInfo({ ...editTourInfo, mapImage: e.target.value })}
                  className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <Button size="sm" onClick={addUpcomingEvent}>
                <PlusIcon size={16} className="mr-2" />
                Add Event
              </Button>
            </div>
            <div className="space-y-4">
              {editUpcomingEvents.map((event, index) => (
                <div key={event.id} className="bg-muted/30 p-4 rounded-lg border border-border relative">
                  <button
                    onClick={() => removeUpcomingEvent(index)}
                    className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-error transition-colors"
                  >
                    <TrashIcon size={16} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        value={event.title}
                        onChange={(e) => updateUpcomingEvent(index, 'title', e.target.value)}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Venue</label>
                      <input
                        type="text"
                        value={event.venue}
                        onChange={(e) => updateUpcomingEvent(index, 'venue', e.target.value)}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Location</label>
                      <input
                        type="text"
                        value={event.location}
                        onChange={(e) => updateUpcomingEvent(index, 'location', e.target.value)}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date</label>
                      <input
                        type="date"
                        value={event.date}
                        onChange={(e) => updateUpcomingEvent(index, 'date', e.target.value)}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Time</label>
                      <input
                        type="text"
                        value={event.time}
                        onChange={(e) => updateUpcomingEvent(index, 'time', e.target.value)}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Ticket URL</label>
                      <input
                        type="text"
                        value={event.ticketUrl || ''}
                        onChange={(e) => updateUpcomingEvent(index, 'ticketUrl', e.target.value)}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`sold-out-${index}`}
                        checked={event.sold_out || false}
                        onChange={(e) => updateUpcomingEvent(index, 'sold_out', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor={`sold-out-${index}`} className="text-sm font-medium">Sold Out</label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Events */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Past Events</h3>
              <Button size="sm" onClick={addPastEvent}>
                <PlusIcon size={16} className="mr-2" />
                Add Event
              </Button>
            </div>
            <div className="space-y-4">
              {editPastEvents.map((event, index) => (
                <div key={event.id} className="bg-muted/30 p-4 rounded-lg border border-border relative">
                  <button
                    onClick={() => removePastEvent(index)}
                    className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-error transition-colors"
                  >
                    <TrashIcon size={16} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        value={event.title}
                        onChange={(e) => updatePastEvent(index, 'title', e.target.value)}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Venue</label>
                      <input
                        type="text"
                        value={event.venue}
                        onChange={(e) => updatePastEvent(index, 'venue', e.target.value)}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Location</label>
                      <input
                        type="text"
                        value={event.location}
                        onChange={(e) => updatePastEvent(index, 'location', e.target.value)}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date</label>
                      <input
                        type="date"
                        value={event.date}
                        onChange={(e) => updatePastEvent(index, 'date', e.target.value)}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Time</label>
                      <input
                        type="text"
                        value={event.time}
                        onChange={(e) => updatePastEvent(index, 'time', e.target.value)}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </EditModal>
    </>
  );
};
