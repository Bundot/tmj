import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { MailIcon, PhoneIcon, MapPinIcon, CheckCircleIcon } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { EditOverlay } from '../admin/EditOverlay';
import { EditModal } from '../admin/EditModal';

/**
 * Form field validation state
 */
interface FormField {
  value: string;
  error: string;
  touched: boolean;
}

/**
 * ContactForm Component
 */
const ContactForm: React.FC = () => {
  // Form fields state
  const [name, setName] = useState<FormField>({
    value: '',
    error: '',
    touched: false
  });
  const [email, setEmail] = useState<FormField>({
    value: '',
    error: '',
    touched: false
  });
  const [subject, setSubject] = useState<FormField>({
    value: '',
    error: '',
    touched: false
  });
  const [message, setMessage] = useState<FormField>({
    value: '',
    error: '',
    touched: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle field change and validation
  const handleFieldChange = (field: 'name' | 'email' | 'subject' | 'message', value: string, setter: React.Dispatch<React.SetStateAction<FormField>>) => {
    let error = '';
    if (value.trim() === '') {
      error = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    } else if (field === 'email' && !validateEmail(value)) {
      error = 'Please enter a valid email address';
    }
    setter({
      value,
      error,
      touched: true
    });
  };

  // Check if form is valid
  const isFormValid = (): boolean => {
    return name.value.trim() !== '' && email.value.trim() !== '' && validateEmail(email.value) && subject.value.trim() !== '' && message.value.trim() !== '';
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Mark all fields as touched to show any validation errors
    setName({
      ...name,
      touched: true
    });
    setEmail({
      ...email,
      touched: true
    });
    setSubject({
      ...subject,
      touched: true
    });
    setMessage({
      ...message,
      touched: true
    });

    if (isFormValid()) {
      // In a real app, this would submit the form data to a backend
      console.log('Form submitted:', {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
      });
      // Show success message
      setFormSubmitted(true);
      // Reset form
      setName({
        value: '',
        error: '',
        touched: false
      });
      setEmail({
        value: '',
        error: '',
        touched: false
      });
      setSubject({
        value: '',
        error: '',
        touched: false
      });
      setMessage({
        value: '',
        error: '',
        touched: false
      });
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      {formSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <CheckCircleIcon size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for reaching out. We'll get back to you as soon as
            possible.
          </p>
          <Button onClick={() => setFormSubmitted(false)}>
            Send Another Message
          </Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name.value}
              onChange={e => handleFieldChange('name', e.target.value, setName)}
              className={`w-full p-3 rounded-md bg-input border ${name.touched && name.error ? 'border-error' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-primary`}
              aria-invalid={name.touched && name.error ? 'true' : 'false'}
              aria-describedby={name.touched && name.error ? 'name-error' : undefined}
            />
            {name.touched && name.error && (
              <p id="name-error" className="mt-1 text-sm text-error">
                {name.error}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email.value}
              onChange={e => handleFieldChange('email', e.target.value, setEmail)}
              className={`w-full p-3 rounded-md bg-input border ${email.touched && email.error ? 'border-error' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-primary`}
              aria-invalid={email.touched && email.error ? 'true' : 'false'}
              aria-describedby={email.touched && email.error ? 'email-error' : undefined}
            />
            {email.touched && email.error && (
              <p id="email-error" className="mt-1 text-sm text-error">
                {email.error}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-1">
              Subject
            </label>
            <select
              id="subject"
              value={subject.value}
              onChange={e => handleFieldChange('subject', e.target.value, setSubject)}
              className={`w-full p-3 rounded-md bg-input border ${subject.touched && subject.error ? 'border-error' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-primary`}
              aria-invalid={subject.touched && subject.error ? 'true' : 'false'}
              aria-describedby={subject.touched && subject.error ? 'subject-error' : undefined}
            >
              <option value="">Select a subject</option>
              <option value="booking">Booking Inquiry</option>
              <option value="press">Press Inquiry</option>
              <option value="collaboration">Collaboration</option>
              <option value="other">Other</option>
            </select>
            {subject.touched && subject.error && (
              <p id="subject-error" className="mt-1 text-sm text-error">
                {subject.error}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              value={message.value}
              onChange={e => handleFieldChange('message', e.target.value, setMessage)}
              rows={5}
              className={`w-full p-3 rounded-md bg-input border ${message.touched && message.error ? 'border-error' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-primary`}
              aria-invalid={message.touched && message.error ? 'true' : 'false'}
              aria-describedby={message.touched && message.error ? 'message-error' : undefined}
            />
            {message.touched && message.error && (
              <p id="message-error" className="mt-1 text-sm text-error">
                {message.error}
              </p>
            )}
          </div>
          <Button type="submit" fullWidth>
            Send Message
          </Button>
        </form>
      )}
    </div>
  );
};

/**
 * NewsletterSignup Component
 */
const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, this would submit the email to a newsletter service
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <div className="bg-primary/10 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-3">Subscribe to Updates</h3>
      <p className="text-muted-foreground mb-4">
        Get the latest news about TMJ's music, events, and exclusive content.
      </p>
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card p-4 rounded-md text-center"
        >
          <CheckCircleIcon size={24} className="mx-auto mb-2 text-primary" />
          <p>Thank you for subscribing!</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="flex-grow p-3 rounded-md bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit">Subscribe</Button>
          </div>
        </form>
      )}
    </div>
  );
};

/**
 * ContactSection Component
 */
export const ContactSection: React.FC = () => {
  const { contactContent, updateContactContent } = useContent();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(contactContent);

  useEffect(() => {
    setEditForm(contactContent);
  }, [contactContent]);

  const handleSave = () => {
    updateContactContent(editForm);
    setIsEditModalOpen(false);
  };

  const handleChange = (field: keyof typeof contactContent, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Section id="contact" className="bg-background">
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
                Get in Touch
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Have a question or want to work with TMJ? Reach out using the
                contact form below.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1 space-y-6"
            >
              <EditOverlay onEdit={() => setIsEditModalOpen(true)} label="Edit Contact Info">
                <div className="bg-card rounded-lg p-6 border border-border">
                  <h3 className="text-xl font-semibold mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <MailIcon size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <a href={`mailto:${contactContent.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                          {contactContent.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <PhoneIcon size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Booking</p>
                        <a href={`tel:${contactContent.phone.replace(/\s/g, '')}`} className="text-muted-foreground hover:text-primary transition-colors">
                          {contactContent.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <MapPinIcon size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-muted-foreground">
                          {contactContent.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </EditOverlay>
              <NewsletterSignup />
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </Section>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Contact Information"
        onSave={handleSave}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="text"
              value={editForm.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              value={editForm.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              value={editForm.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </div>
      </EditModal>
    </>
  );
};