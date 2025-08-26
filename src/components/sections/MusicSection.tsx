import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../layout/Section';
import { PlayIcon, PauseIcon, ExternalLinkIcon, ChevronDownIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import yawa from '../../assets/yawa.jpeg';

/**
 * TrackCard Component Props
 */
interface TrackCardProps {
  title: string;
  artists: string[];
  producers?: string[];
  cover: string;
  platforms: {
    spotify?: string;
    apple?: string;
    audiomack?: string;
  };
  releaseDate?: string;
  featured?: boolean;
  onToggleLyrics?: () => void;
  lyricsOpen?: boolean;
}

/**
 * TrackCard Component
 *
 * Displays information about a music track including cover art,
 * title, artists, and streaming links.
 */
const TrackCard: React.FC<TrackCardProps> = ({
  title,
  artists,
  producers,
  cover,
  platforms,
  releaseDate,
  featured = false,
  onToggleLyrics,
  lyricsOpen
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Format release date
  const formattedDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
      })
    : 'Coming Soon';

  // Toggle play state (stub for real audio control)
  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <motion.div
      className={`bg-card rounded-lg overflow-hidden ${
        featured ? 'md:col-span-2 md:grid md:grid-cols-5 gap-6' : ''
      }`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Cover Art */}
      <div className={`relative ${featured ? 'md:col-span-2' : ''}`}>
        <img
          src={cover}
          alt={`${title} by ${artists.join(', ')}`}
          className={`w-full aspect-square object-cover ${featured ? 'md:h-full' : ''}`}
        />
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-primary-foreground rounded-full p-3"
          >
            {isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
          </motion.div>
        </button>
      </div>

      {/* Track Info */}
      <div className={`p-4 ${featured ? 'md:col-span-3' : ''}`}>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-3">{artists.join(', ')}</p>

       {(producers?.length ?? 0) > 0 && (
        <p className="text-sm text-muted-foreground mb-3">
          Produced by {producers?.join(', ')}
        </p>
      )}


        <p className="text-sm mb-4">{formattedDate}</p>

        {/* Streaming Links */}
        <div className="flex flex-wrap gap-2 mb-4">
          {platforms.spotify && (
            <a
              href={platforms.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 bg-muted rounded-full text-xs hover:bg-muted-foreground/20 transition-colors"
            >
              Spotify <ExternalLinkIcon size={12} className="ml-1" />
            </a>
          )}
          {platforms.apple && (
            <a
              href={platforms.apple}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 bg-muted rounded-full text-xs hover:bg-muted-foreground/20 transition-colors"
            >
              Apple Music <ExternalLinkIcon size={12} className="ml-1" />
            </a>
          )}
          {platforms.audiomack && (
            <a
              href={platforms.audiomack}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 bg-muted rounded-full text-xs hover:bg-muted-foreground/20 transition-colors"
            >
              Audiomack <ExternalLinkIcon size={12} className="ml-1" />
            </a>
          )}
        </div>

        {/* Lyrics Toggle Button */}
        {featured && onToggleLyrics && (
          <Button
            variant="ghost"
            onClick={onToggleLyrics}
            className="text-sm flex items-center"
            aria-expanded={lyricsOpen}
          >
            {lyricsOpen ? 'Hide Lyrics' : 'View Lyrics'}
            <motion.div
              animate={{ rotate: lyricsOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="ml-1"
            >
              <ChevronDownIcon size={16} />
            </motion.div>
          </Button>
        )}
      </div>
    </motion.div>
  );
};

/**
 * MusicSection Component
 */
export const MusicSection: React.FC = () => {
  const [lyricsOpen, setLyricsOpen] = useState(false);
  const toggleLyrics = () => setLyricsOpen(!lyricsOpen);

  // Mock data
  const featuredTrack = {
    title: 'Yawa',
    artists: ['TMJ', 'OG Mage'],
    producers: ['Danny Drey', 'David Acekeyz'],
    cover: yawa,
    platforms: {
      spotify: 'https://spotify.com',
      apple: 'https://music.apple.com',
      audiomack: 'https://audiomack.com',
    },
    releaseDate: '2025-03-14',
    lyricsExcerpt:
      'This is where the lyrics would go... In a real app, this would be a sanitized excerpt of the song lyrics.',
  };

  const otherTracks = [
    {
      title: 'Storyteller',
      artists: ['TMJ'],
      cover:
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      platforms: {
        spotify: 'https://spotify.com',
        apple: 'https://music.apple.com',
      },
      releaseDate: '2024-11-20',
    },
    {
      title: 'Unity',
      artists: ['TMJ', 'Afrobeats Collective'],
      cover:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      platforms: {
        spotify: 'https://spotify.com',
      },
      releaseDate: '2025-06-15',
    },
    {
      title: 'Homeland',
      artists: ['TMJ'],
      cover:
        'https://images.unsplash.com/photo-1571974096035-bc3568627608?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      platforms: {
        spotify: 'https://spotify.com',
        apple: 'https://music.apple.com',
      },
    },
  ];

  return (
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
        <div>
          <h3 className="text-xl font-semibold mb-6">More Tracks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherTracks.map((track, index) => (
              <motion.div
                key={track.title}
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
      </div>
    </Section>
  );
};
