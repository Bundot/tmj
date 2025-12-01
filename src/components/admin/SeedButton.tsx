import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/Button';
import { DatabaseIcon, CheckIcon, AlertCircleIcon, Loader2Icon } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const SeedButton: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    // Get current content from context to seed with
    const {
        heroContent,
        musicContent,
        aboutContent,
        merchItems,
        mediaContent,
        contactContent,
        eventsContent
    } = useContent();

    const handleSeed = async () => {
        if (!confirm('This will overwrite any existing data in the database with the current local data. Continue?')) {
            return;
        }

        setIsLoading(true);
        setStatus('idle');
        setMessage('');

        try {
            const sections = [
                { section: 'hero', data: heroContent },
                { section: 'music', data: { featuredTrack: musicContent.featuredTrack, otherTracks: musicContent.otherTracks } },
                { section: 'about', data: aboutContent },
                { section: 'merch', data: merchItems },
                { section: 'media', data: { photos: mediaContent.photos, videos: mediaContent.videos } },
                { section: 'contact', data: contactContent },
                { section: 'events', data: eventsContent }
            ];

            for (const item of sections) {
                const { error } = await supabase
                    .from('content')
                    .upsert({
                        section: item.section,
                        data: item.data,
                        updated_at: new Date().toISOString()
                    }, {
                        onConflict: 'section'
                    });

                if (error) throw error;
            }

            setStatus('success');
            setMessage('Database seeded successfully!');

            // Clear success message after 3 seconds
            setTimeout(() => {
                setStatus('idle');
                setMessage('');
            }, 3000);

        } catch (error: any) {
            console.error('Seeding error:', error);
            setStatus('error');
            setMessage(`Error: ${error.message || 'Failed to seed database'}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {message && (
                <div className={`mb-2 p-3 rounded-md text-sm font-medium shadow-lg ${status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {message}
                </div>
            )}

            <Button
                onClick={handleSeed}
                disabled={isLoading}
                className="shadow-lg"
                size="sm"
            >
                {isLoading ? (
                    <Loader2Icon className="animate-spin mr-2" size={16} />
                ) : status === 'success' ? (
                    <CheckIcon className="mr-2" size={16} />
                ) : status === 'error' ? (
                    <AlertCircleIcon className="mr-2" size={16} />
                ) : (
                    <DatabaseIcon className="mr-2" size={16} />
                )}
                {isLoading ? 'Seeding...' : 'Seed Database'}
            </Button>
        </div>
    );
};
