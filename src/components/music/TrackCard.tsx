import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PauseIcon, ExternalLinkIcon, ChevronDownIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Track } from '../../data/music';

interface TrackCardProps extends Track {
    onToggleLyrics?: () => void;
    lyricsOpen?: boolean;
}

/**
 * TrackCard Component
 *
 * Displays information about a music track including cover art,
 * title, artists, and streaming links.
 */
export const TrackCard: React.FC<TrackCardProps> = ({
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
            className={`bg-card rounded-lg overflow-hidden ${featured ? 'md:col-span-2 md:grid md:grid-cols-5 gap-6' : ''
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
