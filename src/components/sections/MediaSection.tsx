import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../layout/Section";
import { XIcon, ChevronLeft, ChevronRight, PlusIcon, TrashIcon } from "lucide-react";
import { useContent, Photo, Video } from "../../context/ContentContext";
import { EditOverlay } from "../admin/EditOverlay";
import { EditModal } from "../admin/EditModal";
import { Button } from "../ui/Button";

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
  const { mediaContent, updatePhotos, updateVideos } = useContent();
  const { photos, videos } = mediaContent;

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  // Edit state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPhotos, setEditPhotos] = useState<Photo[]>(photos);
  const [editVideos, setEditVideos] = useState<Video[]>(videos);

  useEffect(() => {
    setEditPhotos(photos);
    setEditVideos(videos);
  }, [photos, videos]);

  const handleSave = () => {
    updatePhotos(editPhotos);
    updateVideos(editVideos);
    setIsEditModalOpen(false);
  };

  const openPhoto = (index: number) => setCurrentPhotoIndex(index);
  const closePhoto = () => setCurrentPhotoIndex(null);

  const goToNextPhoto = () => setCurrentPhotoIndex((prev) => (prev !== null ? (prev + 1) % photos.length : prev));
  const goToPrevPhoto = () => setCurrentPhotoIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : prev));

  const openVideo = (video: Video) => setCurrentVideo(video);
  const closeVideo = () => setCurrentVideo(null);

  // Edit handlers
  const handlePhotoChange = (index: number, field: keyof Photo, value: string) => {
    const newPhotos = [...editPhotos];
    newPhotos[index] = { ...newPhotos[index], [field]: value };
    setEditPhotos(newPhotos);
  };

  const addPhoto = () => {
    setEditPhotos([...editPhotos, { src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000', alt: 'New Photo' }]);
  };

  const removePhoto = (index: number) => {
    setEditPhotos(editPhotos.filter((_, i) => i !== index));
  };

  const handleVideoChange = (index: number, field: keyof Video, value: string) => {
    const newVideos = [...editVideos];
    newVideos[index] = { ...newVideos[index], [field]: value };
    setEditVideos(newVideos);
  };

  const addVideo = () => {
    setEditVideos([...editVideos, { embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'New Video' }]);
  };

  const removeVideo = (index: number) => {
    setEditVideos(editVideos.filter((_, i) => i !== index));
  };

  return (
    <>
      <Section id="media" className="bg-background">
        <EditOverlay onEdit={() => setIsEditModalOpen(true)} label="Edit Media">
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
                        className="w-full h-full pointer-events-none" // pointer-events-none to allow click on parent
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
                    className="relative overflow-hidden rounded-lg cursor-pointer aspect-square"
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
        </EditOverlay>
      </Section>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Media"
        onSave={handleSave}
      >
        <div className="space-y-8">
          {/* Videos Editing */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Videos</h3>
              <Button size="sm" onClick={addVideo}>
                <PlusIcon size={16} className="mr-2" />
                Add Video
              </Button>
            </div>
            <div className="space-y-4">
              {editVideos.map((video, index) => (
                <div key={index} className="bg-muted/30 p-4 rounded-lg border border-border relative">
                  <button
                    onClick={() => removeVideo(index)}
                    className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-error transition-colors"
                  >
                    <TrashIcon size={16} />
                  </button>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        value={video.title}
                        onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Embed URL</label>
                      <input
                        type="text"
                        value={video.embedUrl}
                        onChange={(e) => handleVideoChange(index, 'embedUrl', e.target.value)}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photos Editing */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Photos</h3>
              <Button size="sm" onClick={addPhoto}>
                <PlusIcon size={16} className="mr-2" />
                Add Photo
              </Button>
            </div>
            <div className="space-y-4">
              {editPhotos.map((photo, index) => (
                <div key={index} className="bg-muted/30 p-4 rounded-lg border border-border relative flex gap-4 items-start">
                  <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 bg-background">
                    <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow grid gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Image URL</label>
                      <input
                        type="text"
                        value={photo.src}
                        onChange={(e) => handlePhotoChange(index, 'src', e.target.value)}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Alt Text</label>
                      <input
                        type="text"
                        value={photo.alt}
                        onChange={(e) => handlePhotoChange(index, 'alt', e.target.value)}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removePhoto(index)}
                    className="p-1 text-muted-foreground hover:text-error transition-colors"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </EditModal>
    </>
  );
};
