import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../layout/Section';
import { TrackCard } from '../music/TrackCard';
import { useContent } from '../../context/ContentContext';
import { EditOverlay } from '../admin/EditOverlay';
import { EditModal } from '../admin/EditModal';
import { Track } from '../../data/music';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * MusicSection Component
 */
export const MusicSection: React.FC = () => {
  const [lyricsOpen, setLyricsOpen] = useState(false);
  const toggleLyrics = () => setLyricsOpen(!lyricsOpen);

  const { musicContent, updateFeaturedTrack, updateOtherTracks } = useContent();
  const { featuredTrack, otherTracks } = musicContent;

  // Edit state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFeatured, setEditFeatured] = useState<Track>(featuredTrack);
  const [editOtherTracks, setEditOtherTracks] = useState<Track[]>(otherTracks);

  useEffect(() => {
    setEditFeatured(featuredTrack);
    setEditOtherTracks(otherTracks);
  }, [featuredTrack, otherTracks]);

  const handleSave = () => {
    updateFeaturedTrack(editFeatured);
    updateOtherTracks(editOtherTracks);
    setIsEditModalOpen(false);
  };

  const handleTrackChange = (index: number, field: keyof Track, value: any) => {
    const newTracks = [...editOtherTracks];
    newTracks[index] = { ...newTracks[index], [field]: value };
    setEditOtherTracks(newTracks);
  };

  const handleFeaturedChange = (field: keyof Track, value: any) => {
    setEditFeatured(prev => ({ ...prev, [field]: value }));
  };

  const handleArtistsChange = (value: string, isFeatured: boolean, index?: number) => {
    const artists = value.split(',').map(s => s.trim());
    if (isFeatured) {
      handleFeaturedChange('artists', artists);
    } else if (index !== undefined) {
      handleTrackChange(index, 'artists', artists);
    }
  };

  const addNewTrack = () => {
    setEditOtherTracks([...editOtherTracks, {
      title: 'New Track',
      artists: ['TMJ'],
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
      platforms: {}
    }]);
  };

  const removeTrack = (index: number) => {
    setEditOtherTracks(editOtherTracks.filter((_, i) => i !== index));
  };

  return (
    <>
      <Section id="music" className="bg-background">
        <div className="space-y-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Latest Music
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Experience TMJ&apos;s unique blend of Afropop, R&B, and traditional Juju
              music with socially conscious storytelling.
            </motion.p>
          </div>

          <EditOverlay onEdit={() => setIsEditModalOpen(true)} label="Edit Music Section">
            {/* Featured Track */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TrackCard
                {...featuredTrack}
                featured
                onToggleLyrics={toggleLyrics}
                lyricsOpen={lyricsOpen}
              />
              {/* Lyrics Drawer */}
              <AnimatePresence>
                {lyricsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="bg-card mt-2 rounded-lg overflow-hidden"
                  >
                    <div className="p-6">
                      <h4 className="text-lg font-semibold mb-3">Lyrics</h4>
                      <p className="whitespace-pre-line text-muted-foreground">
                        {featuredTrack.lyricsExcerpt}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Track Grid */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-6">More Tracks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherTracks.map((track, index) => (
                  <motion.div
                    key={`${track.title}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <TrackCard {...track} />
                  </motion.div>
                ))}
              </div>
            </div>
          </EditOverlay>
        </div>
      </Section>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Music Section"
        onSave={handleSave}
      >
        <div className="space-y-8">
          {/* Featured Track Edit */}
          <div className="border-b border-border pb-6">
            <h3 className="text-lg font-semibold mb-4">Featured Track</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={editFeatured.title}
                  onChange={(e) => handleFeaturedChange('title', e.target.value)}
                  className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Artists (comma separated)</label>
                <input
                  type="text"
                  value={editFeatured.artists.join(', ')}
                  onChange={(e) => handleArtistsChange(e.target.value, true)}
                  className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={editFeatured.cover}
                  onChange={(e) => handleFeaturedChange('cover', e.target.value)}
                  className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Lyrics Excerpt</label>
                <textarea
                  value={editFeatured.lyricsExcerpt || ''}
                  onChange={(e) => handleFeaturedChange('lyricsExcerpt', e.target.value)}
                  rows={3}
                  className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* Other Tracks Edit */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Other Tracks</h3>
              <Button size="sm" onClick={addNewTrack}>
                <PlusIcon size={16} className="mr-2" />
                Add Track
              </Button>
            </div>

            <div className="space-y-6">
              {editOtherTracks.map((track, index) => (
                <div key={index} className="bg-muted/30 p-4 rounded-lg border border-border relative">
                  <button
                    onClick={() => removeTrack(index)}
                    className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-error transition-colors"
                  >
                    <TrashIcon size={16} />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        value={track.title}
                        onChange={(e) => handleTrackChange(index, 'title', e.target.value)}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Artists</label>
                      <input
                        type="text"
                        value={track.artists.join(', ')}
                        onChange={(e) => handleArtistsChange(e.target.value, false, index)}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                      <input
                        type="text"
                        value={track.cover}
                        onChange={(e) => handleTrackChange(index, 'cover', e.target.value)}
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
