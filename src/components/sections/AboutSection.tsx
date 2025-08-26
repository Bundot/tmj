import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { QuoteIcon } from 'lucide-react';
import TMJ04 from '../../assets/TMJ04.png';
import tmj20 from '../../assets/tmj20.png';

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

  // Artist bio data
  const bioData = {
    name: 'TMJ',
    fullName: 'Tomide Joseph',
    origin: 'Osun State, Nigeria',
    image: tmj20,
    bio: "Tomide Joseph, known professionally as TMJ, is a Nigerian singer-songwriter from Osun State whose music transcends conventional genres. Blending the rhythmic pulse of Afropop with the soulful depth of R&B and the cultural richness of traditional Juju music, TMJ creates a sound that is both innovative and deeply rooted in Nigerian heritage.\n\nRaised in a community where music was both celebration and commentary, TMJ developed an early understanding of music's power to inspire change. This perspective shapes his approach to songwriting, where catchy melodies serve as vehicles for messages of unity, resilience, and social awareness.",
    mission:
      'Through my music, I aim to bridge cultural divides while addressing the social issues that affect my community and beyond. Every song is an opportunity to celebrate our shared humanity while pushing for positive change.',
    pressQuotes: [
      {
        quote:
          'TMJ represents the exciting new wave of African artists who refuse to be boxed into a single genre, creating music that resonates globally while staying true to their roots.',
        source: 'African Music Today'
      },
      {
        quote:
          "With thoughtful lyrics and infectious rhythms, TMJ's music invites listeners to both dance and reflect—a powerful combination that sets him apart.",
        source: 'Global Beats Magazine'
      },
      {
        quote:
          'Few emerging artists balance entertainment and activism as seamlessly as TMJ, whose work serves as both a celebration of Nigerian culture and a call to action.',
        source: 'Culture Critic'
      }
    ]
  };

  return (
    <Section id="about" className={themeStyles}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Bio and Mission */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About TMJ</h2>
            <p className="text-muted-foreground mb-2">
              <span className="font-semibold">Full Name:</span> {bioData.fullName}
            </p>
            <p className="text-muted-foreground mb-6">
              <span className="font-semibold">Origin:</span> {bioData.origin}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {bioData.bio.split('\n\n').map((paragraph, index) => (
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
              {bioData.mission}
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
              src={bioData.image}
              alt="TMJ - Tomide Joseph"
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
              {bioData.pressQuotes.map((quote, index) => (
                <PressQuote key={index} quote={quote.quote} source={quote.source} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
