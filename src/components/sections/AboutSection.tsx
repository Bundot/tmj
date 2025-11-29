import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { QuoteIcon, UploadIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { EditOverlay } from '../admin/EditOverlay';
import { EditModal } from '../admin/EditModal';
import { Button } from '../ui/Button';

/**
 * PressQuote Component Props
 */
interface PressQuoteProps {
  quote: string;
  source: string;
  index: number;
}

/**
 * PressQuote Component
 *
 * Displays a press quote with animation.
 */
const PressQuote: React.FC<PressQuoteProps> = ({ quote, source, index }) => {
  return (
    <motion.div
      className="bg-card p-6 rounded-lg relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <QuoteIcon size={24} className="absolute top-4 right-4 text-muted-foreground opacity-20" />
      <p className="mb-4 italic">{quote}</p>
      <p className="text-sm text-muted-foreground font-medium">— {source}</p>
    </motion.div>
  );
};

/**
 * AboutSection Component
 *
 * Displays TMJ's bio, mission, and press quotes.
 */
export const AboutSection: React.FC = () => {
  // ✅ Hard-coded poster theme background styles
  const themeStyles = 'bg-muted bg-[var(--texture-noise)]';

  const { aboutContent, updateAboutContent } = useContent();

  // Edit state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(aboutContent);

  useEffect(() => {
    setEditForm(aboutContent);
  }, [aboutContent]);

  const handleSave = () => {
    updateAboutContent(editForm);
    setIsEditModalOpen(false);
  };

  const handleQuoteChange = (index: number, field: 'quote' | 'source', value: string) => {
    const newQuotes = [...editForm.pressQuotes];
    newQuotes[index] = { ...newQuotes[index], [field]: value };
    setEditForm({ ...editForm, pressQuotes: newQuotes });
  };

  const addQuote = () => {
    setEditForm({
      ...editForm,
      pressQuotes: [...editForm.pressQuotes, { quote: 'New Quote', source: 'Source' }]
    });
  };

  const removeQuote = (index: number) => {
    setEditForm({
      ...editForm,
      pressQuotes: editForm.pressQuotes.filter((_, i) => i !== index)
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Section id="about" className={themeStyles}>
        <EditOverlay onEdit={() => setIsEditModalOpen(true)} label="Edit About Section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Bio and Mission */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">About {aboutContent.name}</h2>
                <p className="text-muted-foreground mb-2">
                  <span className="font-semibold">Full Name:</span> {aboutContent.fullName}
                </p>
                <p className="text-muted-foreground mb-6">
                  <span className="font-semibold">Origin:</span> {aboutContent.origin}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-4"
              >
                {aboutContent.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8"
              >
                <h3 className="text-xl font-semibold mb-4">Mission</h3>
                <blockquote className="pl-4 border-l-4 border-primary italic">
                  {aboutContent.mission}
                </blockquote>
              </motion.div>
            </div>

            {/* Image and Press Quotes */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <img
                  src={aboutContent.image}
                  alt={`${aboutContent.name} - ${aboutContent.fullName}`}
                  className="w-full max-h-[100vh] object-cover"
                />
              </motion.div>

              <div className="space-y-4">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-xl font-semibold"
                >
                  What Critics Are Saying
                </motion.h3>

                <div className="space-y-4">
                  {aboutContent.pressQuotes.map((quote, index) => (
                    <PressQuote key={index} quote={quote.quote} source={quote.source} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </EditOverlay>
      </Section>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit About Section"
        onSave={handleSave}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Stage Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={editForm.fullName}
                onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Origin</label>
              <input
                type="text"
                value={editForm.origin}
                onChange={(e) => setEditForm({ ...editForm, origin: e.target.value })}
                className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio (Separate paragraphs with double enter)</label>
            <textarea
              value={editForm.bio}
              onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
              rows={6}
              className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mission Statement</label>
            <textarea
              value={editForm.mission}
              onChange={(e) => setEditForm({ ...editForm, mission: e.target.value })}
              rows={3}
              className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Artist Image</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-muted rounded-md overflow-hidden">
                <img
                  src={editForm.image}
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
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium">Press Quotes</label>
              <Button size="sm" onClick={addQuote}>
                <PlusIcon size={16} className="mr-2" />
                Add Quote
              </Button>
            </div>

            <div className="space-y-4">
              {editForm.pressQuotes.map((quote, index) => (
                <div key={index} className="bg-muted/30 p-4 rounded-lg border border-border relative">
                  <button
                    onClick={() => removeQuote(index)}
                    className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-error transition-colors"
                  >
                    <TrashIcon size={16} />
                  </button>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Quote</label>
                      <textarea
                        value={quote.quote}
                        onChange={(e) => handleQuoteChange(index, 'quote', e.target.value)}
                        rows={2}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Source</label>
                      <input
                        type="text"
                        value={quote.source}
                        onChange={(e) => handleQuoteChange(index, 'source', e.target.value)}
                        className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none text-sm"
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
