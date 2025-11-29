import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../ui/Button';
import { PlayCircleIcon, UploadIcon } from 'lucide-react';
import TMJ04 from '../../assets/TMJ04.png';
import { useContent } from '../../context/ContentContext';
import { EditOverlay } from '../admin/EditOverlay';
import { EditModal } from '../admin/EditModal';

/**
 * Hero Component
 *
 * Full-screen hero section with TMJ's name, tagline, CTAs, and hero image.
 * Features parallax scrolling effects.
 */
export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { heroContent, updateHeroContent } = useContent();

  // Edit state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(heroContent);

  // Update local form when content changes
  useEffect(() => {
    setEditForm(heroContent);
  }, [heroContent]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax effects
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleSave = () => {
    updateHeroContent(editForm);
    setIsEditModalOpen(false);
  };

  // Handle image upload (simulation)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({ ...prev, backgroundImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <section
        id="home"
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden after:absolute after:inset-0 after:opacity-30 after:pointer-events-none after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] after:bg-[length:4px_4px]"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/30" />

        {/* Background + parallax container */}
        <motion.div
          className="relative z-10 h-full flex items-center"
          style={{ y: textY, opacity: opacityText }}
        >
          <div className="container mx-auto px-4 md:px-6 pt-20">
            <EditOverlay onEdit={() => setIsEditModalOpen(true)} label="Edit Hero Section">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
                {/* Left: Image */}
                <motion.div
                  className="hidden lg:flex justify-center"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.19, 1, 0.22, 1],
                    delay: 0.8,
                  }}
                >
                  <img
                    src={heroContent.backgroundImage || TMJ04}
                    alt="TMJ promotional poster"
                    className="w-full max-h-[100vh] object-cover"
                  />
                </motion.div>

                {/* Right: Text */}
                <div className="max-w-3xl">
                  <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 drop-shadow-lg font-heading italic text-primary"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.19, 1, 0.22, 1],
                      delay: 0.2,
                    }}
                  >
                    {heroContent.title}
                  </motion.h1>

                  <motion.p
                    className="text-xl md:text-2xl mb-8 text-muted-foreground drop-shadow-md max-w-xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.19, 1, 0.22, 1],
                      delay: 0.4,
                    }}
                  >
                    {heroContent.tagline}
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.19, 1, 0.22, 1],
                      delay: 0.6,
                    }}
                  >
                    <Button>
                      <PlayCircleIcon size={18} className="mr-2" />
                      {heroContent.cta}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </EditOverlay>
          </div>
        </motion.div>
      </section>

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Hero Section"
        onSave={handleSave}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tagline</label>
            <textarea
              value={editForm.tagline}
              onChange={(e) => setEditForm({ ...editForm, tagline: e.target.value })}
              rows={3}
              className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">CTA Button Text</label>
            <input
              type="text"
              value={editForm.cta}
              onChange={(e) => setEditForm({ ...editForm, cta: e.target.value })}
              className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hero Image</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-muted rounded-md overflow-hidden">
                <img
                  src={editForm.backgroundImage || TMJ04}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="cursor-pointer bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity flex items-center gap-2">
                <UploadIcon size={16} />
                Upload New Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Recommended size: 1200x1600px. Max size: 5MB.
            </p>
          </div>
        </div>
      </EditModal>
    </>
  );
};
