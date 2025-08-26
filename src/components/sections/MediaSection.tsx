import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../layout/Section";
import { XIcon, ChevronLeft, ChevronRight } from "lucide-react";
import tmj6 from "./../../assets/tmj6.jpeg";
import tmj9 from "./../../assets/tmj9.jpeg";
import tmj11 from "./../../assets/tmj11.jpeg";
import tmj13 from "./../../assets/tmj13.jpeg";
import tmj14 from "./../../assets/tmj14.jpeg";
import tmj16 from "./../../assets/tmj16.jpeg";
import tmj17 from "./../../assets/tmj17.jpeg";
import tmj20 from '../../assets/tmj20.png';

interface Photo {
  src: string;
  alt: string;
}

interface Video {
  embedUrl: string;
  title: string;
}

interface PhotoLightboxProps {
  photo: Photo | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}) => {
  // keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === "ArrowRight" && hasNext) onNext();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photo, hasNext, hasPrev, onNext, onPrev, onClose]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          className="relative max-w-5xl max-h-[90vh] w-full"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
          />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute top-2 right-2 p-2 bg-black/70 text-white rounded-full hover:bg-black/90"
          >
            <XIcon size={24} />
          </button>

          {/* Prev button */}
          {hasPrev && (
            <button
              onClick={onPrev}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/70 text-white rounded-full hover:bg-black/90"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Next button */}
          {hasNext && (
            <button
              onClick={onNext}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/70 text-white rounded-full hover:bg-black/90"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const VideoEmbed: React.FC<{ video: Video; onClose: () => void }> = ({ video, onClose }) => {
  // keyboard navigation for video modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          className="relative w-full max-w-4xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={video.embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video rounded-lg"
          />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close video"
            className="absolute top-2 right-2 p-2 bg-black/70 text-white rounded-full hover:bg-black/90"
          >
            <XIcon size={24} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export const MediaSection: React.FC = () => {
  const photos: Photo[] = [
    { src: tmj6, alt: "Live performance 1" },
    { src: tmj9, alt: "Live performance 2" },
    { src: tmj11, alt: "Live performance 3" },
    { src: tmj13, alt: "Live performance 5" },
    { src: tmj14, alt: "Live performance 6" },
    { src: tmj16, alt: "Live performance 7" },
    { src: tmj17, alt: "Live performance 8" },
    { src: tmj20, alt: "Live performance 9" },
  ];

  const videos: Video[] = [
    { embedUrl: "https://www.youtube.com/embed/hA1cn5QV4Tc?si=SDhJD3EOsdrt50Ck", title: "Yawa" },
    { embedUrl: "https://www.youtube.com/embed/9KTmcqSpL9M?si=lJNyN8ZweCUdqN99", title: "Yawa LIve Performance" },
  ];

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  const openPhoto = (index: number) => setCurrentPhotoIndex(index);
  const closePhoto = () => setCurrentPhotoIndex(null);

  const goToNextPhoto = () => setCurrentPhotoIndex((prev) => (prev !== null ? (prev + 1) % photos.length : prev));
  const goToPrevPhoto = () => setCurrentPhotoIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : prev));

  const openVideo = (video: Video) => setCurrentVideo(video);
  const closeVideo = () => setCurrentVideo(null);

  return (
    <Section id="media" className="bg-background">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Media
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore music videos, behind-the-scenes moments, and live concert photography from TMJ.
          </motion.p>
        </div>

        {/* Video Gallery */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video, idx) => (
              <motion.div
                key={idx}
                className="relative cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                onClick={() => openVideo(video)}
              >
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{video.title}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Photo Gallery */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Photos</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, idx) => (
              <motion.div
                key={idx}
                className="relative overflow-hidden rounded-lg cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * idx }}
                onClick={() => openPhoto(idx)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {currentPhotoIndex !== null && (
          <PhotoLightbox
            photo={photos[currentPhotoIndex]}
            onClose={closePhoto}
            onNext={goToNextPhoto}
            onPrev={goToPrevPhoto}
            hasNext={photos.length > 1}
            hasPrev={photos.length > 1}
          />
        )}

        {/* Video Modal */}
        {currentVideo && <VideoEmbed video={currentVideo} onClose={closeVideo} />}
      </div>
    </Section>
  );
};
