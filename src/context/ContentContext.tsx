import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

// Asset imports for initial state
import tmj6 from '../assets/tmj6.jpeg';
import tmj9 from '../assets/tmj9.jpeg';
import tmj11 from '../assets/tmj11.jpeg';
import tmj13 from '../assets/tmj13.jpeg';
import tmj14 from '../assets/tmj14.jpeg';
import tmj16 from '../assets/tmj16.jpeg';
import tmj17 from '../assets/tmj17.jpeg';
import tmj20 from '../assets/tmj20.png';
import { heroContent as initialHeroContent } from '../data/content';
import { featuredTrack as initialFeaturedTrack, otherTracks as initialOtherTracks, Track } from '../data/music';
import tm from '../assets/tm.png';

// Define types for our content
interface HeroContent {
    title: string;
    tagline: string;
    cta: string;
    backgroundImage?: string;
}

interface PressQuote {
    quote: string;
    source: string;
}

interface AboutContent {
    name: string;
    fullName: string;
    origin: string;
    image: string;
    bio: string;
    mission: string;
    pressQuotes: PressQuote[];
}

export interface MerchItem {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    sizes?: string[];
    inStock: boolean;
}

export interface Photo {
    src: string;
    alt: string;
}

export interface Video {
    embedUrl: string;
    title: string;
}

export interface ContactContent {
    email: string;
    phone: string;
    location: string;
}

export interface Event {
    id: string;
    title: string;
    venue: string;
    location: string;
    date: string;
    time: string;
    ticketUrl?: string;
    sold_out?: boolean;
}

export interface EventsContent {
    upcomingEvents: Event[];
    pastEvents: Event[];
    tourInfo: {
        title: string;
        locations: string;
        mapImage: string;
    };
}

interface ContentContextType {
    heroContent: HeroContent;
    updateHeroContent: (content: Partial<HeroContent>) => void;

    musicContent: {
        featuredTrack: Track;
        otherTracks: Track[];
    };
    updateFeaturedTrack: (track: Track) => void;
    updateOtherTracks: (tracks: Track[]) => void;

    aboutContent: AboutContent;
    updateAboutContent: (content: Partial<AboutContent>) => void;

    merchItems: MerchItem[];
    updateMerchItems: (items: MerchItem[]) => void;

    mediaContent: {
        photos: Photo[];
        videos: Video[];
    };
    updatePhotos: (photos: Photo[]) => void;
    updateVideos: (videos: Video[]) => void;

    contactContent: ContactContent;
    updateContactContent: (content: Partial<ContactContent>) => void;

    eventsContent: EventsContent;
    updateEventsContent: (content: Partial<EventsContent>) => void;

    // Placeholder for other sections we'll implement later
    resetContent: () => void;
}

const initialMerchItems: MerchItem[] = [
    {
        id: 'm1',
        name: 'TMJ Logo T-Shirt',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Classic black tee with TMJ logo.',
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true
    },
    {
        id: 'm2',
        name: 'Afrobeat Hoodie',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Comfortable hoodie with Afrobeat design.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        inStock: true
    },
    {
        id: 'm3',
        name: 'TMJ Cap',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Adjustable cap with embroidered logo.',
        inStock: true
    },
    {
        id: 'm4',
        name: 'Unity Tour Poster',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1614018453562-77f6180ce036?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Limited edition tour poster, signed.',
        inStock: true
    },
    {
        id: 'm5',
        name: 'TMJ Vinyl Record',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Limited edition vinyl with exclusive tracks.',
        inStock: false
    },
    {
        id: 'm6',
        name: 'Storyteller Beanie',
        price: 22.99,
        image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: "Warm beanie with embroidered 'Storyteller' text.",
        inStock: true
    }
];

const initialAboutContent: AboutContent = {
    name: 'TMJ',
    fullName: 'Tomide Joseph',
    origin: 'Osun State, Nigeria',
    image: tm,
    bio: "Tomide Joseph, known professionally as TMJ, is a Nigerian singer-songwriter from Osun State whose music transcends conventional genres. Blending the rhythmic pulse of Afropop with the soulful depth of R&B and the cultural richness of traditional Juju music, TMJ creates a sound that is both innovative and deeply rooted in Nigerian heritage.\n\nRaised in a community where music was both celebration and commentary, TMJ developed an early understanding of music's power to inspire change. This perspective shapes his approach to songwriting, where catchy melodies serve as vehicles for messages of unity, resilience, and social awareness.",
    mission: 'Through my music, I aim to bridge cultural divides while addressing the social issues that affect my community and beyond. Every song is an opportunity to celebrate our shared humanity while pushing for positive change.',
    pressQuotes: [
        {
            quote: 'TMJ represents the exciting new wave of African artists who refuse to be boxed into a single genre, creating music that resonates globally while staying true to their roots.',
            source: 'African Music Today'
        },
        {
            quote: "With thoughtful lyrics and infectious rhythms, TMJ's music invites listeners to both dance and reflect—a powerful combination that sets him apart.",
            source: 'Global Beats Magazine'
        },
        {
            quote: 'Few emerging artists balance entertainment and activism as seamlessly as TMJ, whose work serves as both a celebration of Nigerian culture and a call to action.',
            source: 'Culture Critic'
        }
    ]
};

const initialPhotos: Photo[] = [
    { src: tmj6, alt: "Live performance 1" },
    { src: tmj9, alt: "Live performance 2" },
    { src: tmj11, alt: "Live performance 3" },
    { src: tmj13, alt: "Live performance 5" },
    { src: tmj14, alt: "Live performance 6" },
    { src: tmj16, alt: "Live performance 7" },
    { src: tmj17, alt: "Live performance 8" },
    { src: tmj20, alt: "Live performance 9" },
];

const initialVideos: Video[] = [
    { embedUrl: "https://www.youtube.com/embed/hA1cn5QV4Tc?si=SDhJD3EOsdrt50Ck", title: "Yawa" },
    { embedUrl: "https://www.youtube.com/embed/9KTmcqSpL9M?si=lJNyN8ZweCUdqN99", title: "Yawa LIve Performance" },
];

const initialContactContent: ContactContent = {
    email: 'management@tmjmusic.com',
    phone: '+234 123 456 7890',
    location: 'Lagos / Osun State, Nigeria'
};

const initialEventsContent: EventsContent = {
    upcomingEvents: [
        {
            id: 'e1',
            title: 'Afrobeats Night',
            venue: 'The Shrine',
            location: 'Lagos, Nigeria',
            date: '2025-04-15',
            time: '8:00 PM',
            ticketUrl: 'https://tickets.example.com/e1',
        },
        {
            id: 'e2',
            title: 'Unity Festival',
            venue: 'National Stadium',
            location: 'Abuja, Nigeria',
            date: '2025-05-22',
            time: '7:30 PM',
            ticketUrl: 'https://tickets.example.com/e2',
        },
        {
            id: 'e3',
            title: 'Summer Jam',
            venue: 'O2 Academy',
            location: 'London, UK',
            date: '2025-06-10',
            time: '9:00 PM',
            ticketUrl: 'https://tickets.example.com/e3',
        },
        {
            id: 'e4',
            title: 'Global Beats Tour',
            venue: 'Apollo Theater',
            location: 'New York, USA',
            date: '2025-07-05',
            time: '8:00 PM',
        },
        {
            id: 'e5',
            title: 'African Heritage Festival',
            venue: 'Rogers Centre',
            location: 'Toronto, Canada',
            date: '2025-07-18',
            time: '6:30 PM',
        },
        {
            id: 'e6',
            title: 'Homecoming Concert',
            venue: 'Freedom Park',
            location: 'Osun State, Nigeria',
            date: '2025-08-30',
            time: '7:00 PM',
            sold_out: true,
        },
    ],
    pastEvents: [
        {
            id: 'p1',
            title: 'Album Preview',
            venue: 'Jazz Café',
            location: 'Lagos, Nigeria',
            date: '2024-11-20',
            time: '8:00 PM',
        },
        {
            id: 'p2',
            title: 'Charity Concert',
            venue: 'Community Center',
            location: 'Osun State, Nigeria',
            date: '2024-10-05',
            time: '6:30 PM',
        },
        {
            id: 'p3',
            title: 'University Tour',
            venue: 'University of Lagos',
            location: 'Lagos, Nigeria',
            date: '2024-09-15',
            time: '7:00 PM',
        },
        {
            id: 'p4',
            title: 'Radio Showcase',
            venue: 'Beat FM Studios',
            location: 'Lagos, Nigeria',
            date: '2024-08-22',
            time: '5:30 PM',
        },
    ],
    tourInfo: {
        title: '2025 World Tour',
        locations: 'Nigeria · Ghana · UK · USA · Canada',
        mapImage: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    }
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Hero State
    const [heroContent, setHeroContent] = useState<HeroContent>(initialHeroContent);

    // Music State
    const [featuredTrack, setFeaturedTrack] = useState<Track>(initialFeaturedTrack);
    const [otherTracks, setOtherTracks] = useState<Track[]>(initialOtherTracks);

    // About State
    const [aboutContent, setAboutContent] = useState<AboutContent>(initialAboutContent);

    // Merch State
    const [merchItems, setMerchItems] = useState<MerchItem[]>(initialMerchItems);

    // Media State
    const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
    const [videos, setVideos] = useState<Video[]>(initialVideos);

    // Contact State
    const [contactContent, setContactContent] = useState<ContactContent>(initialContactContent);

    // Events State
    const [eventsContent, setEventsContent] = useState<EventsContent>(initialEventsContent);

    // Load from Supabase on mount
    useEffect(() => {
        const loadContent = async () => {
            try {
                const { data, error } = await supabase
                    .from('content')
                    .select('*');

                if (error) {
                    console.error('Error loading content from Supabase:', error);
                    // Fall back to localStorage if Supabase fails
                    const savedContent = localStorage.getItem('tmj-content');
                    if (savedContent) {
                        const parsed = JSON.parse(savedContent);
                        if (parsed.heroContent) setHeroContent(parsed.heroContent);
                        if (parsed.musicContent) {
                            setFeaturedTrack(parsed.musicContent.featuredTrack);
                            setOtherTracks(parsed.musicContent.otherTracks);
                        }
                        if (parsed.aboutContent) setAboutContent(parsed.aboutContent);
                        if (parsed.merchItems) setMerchItems(parsed.merchItems);
                        if (parsed.mediaContent) {
                            setPhotos(parsed.mediaContent.photos);
                            setVideos(parsed.mediaContent.videos);
                        }
                        if (parsed.contactContent) setContactContent(parsed.contactContent);
                        if (parsed.eventsContent) setEventsContent(parsed.eventsContent);
                    }
                    return;
                }

                // Parse and set content for each section
                data?.forEach((item) => {
                    const content = item.data;
                    switch (item.section) {
                        case 'hero':
                            setHeroContent(content);
                            break;
                        case 'music':
                            setFeaturedTrack(content.featuredTrack);
                            setOtherTracks(content.otherTracks);
                            break;
                        case 'about':
                            setAboutContent(content);
                            break;
                        case 'merch':
                            setMerchItems(content);
                            break;
                        case 'media':
                            setPhotos(content.photos);
                            setVideos(content.videos);
                            break;
                        case 'contact':
                            setContactContent(content);
                            break;
                        case 'events':
                            setEventsContent(content);
                            break;
                    }
                });
            } catch (error) {
                console.error('Error loading content:', error);
            }
        };

        loadContent();
    }, []);

    // Helper function to save content to Supabase
    const saveContent = async (section: string, data: any) => {
        try {
            const { error } = await supabase
                .from('content')
                .upsert({
                    section,
                    data,
                    updated_at: new Date().toISOString()
                }, {
                    onConflict: 'section'
                });

            if (error) {
                console.error('Error saving content to Supabase:', error);
            }

            // Also save to localStorage as backup
            const contentToSave = {
                heroContent,
                musicContent: {
                    featuredTrack,
                    otherTracks
                },
                aboutContent,
                merchItems,
                mediaContent: {
                    photos,
                    videos
                },
                contactContent,
                eventsContent
            };
            localStorage.setItem('tmj-content', JSON.stringify(contentToSave));
        } catch (error) {
            console.error('Error saving content:', error);
        }
    };

    const updateHeroContent = (content: Partial<HeroContent>) => {
        const newContent = { ...heroContent, ...content };
        setHeroContent(newContent);
        saveContent('hero', newContent);
    };

    const updateFeaturedTrack = (track: Track) => {
        setFeaturedTrack(track);
        saveContent('music', { featuredTrack: track, otherTracks });
    };

    const updateOtherTracks = (tracks: Track[]) => {
        setOtherTracks(tracks);
        saveContent('music', { featuredTrack, otherTracks: tracks });
    };

    const updateAboutContent = (content: Partial<AboutContent>) => {
        const newContent = { ...aboutContent, ...content };
        setAboutContent(newContent);
        saveContent('about', newContent);
    };

    const updateMerchItems = (items: MerchItem[]) => {
        setMerchItems(items);
        saveContent('merch', items);
    };

    const updatePhotos = (newPhotos: Photo[]) => {
        setPhotos(newPhotos);
        saveContent('media', { photos: newPhotos, videos });
    };

    const updateVideos = (newVideos: Video[]) => {
        setVideos(newVideos);
        saveContent('media', { photos, videos: newVideos });
    };

    const updateContactContent = (content: Partial<ContactContent>) => {
        const newContent = { ...contactContent, ...content };
        setContactContent(newContent);
        saveContent('contact', newContent);
    };

    const updateEventsContent = (content: Partial<EventsContent>) => {
        const newContent = { ...eventsContent, ...content };
        setEventsContent(newContent);
        saveContent('events', newContent);
    };

    const resetContent = () => {
        setHeroContent(initialHeroContent);
        setFeaturedTrack(initialFeaturedTrack);
        setOtherTracks(initialOtherTracks);
        setAboutContent(initialAboutContent);
        setMerchItems(initialMerchItems);
        setPhotos(initialPhotos);
        setVideos(initialVideos);
        setContactContent(initialContactContent);
        setEventsContent(initialEventsContent);
        localStorage.removeItem('tmj-content');
    };

    return (
        <ContentContext.Provider value={{
            heroContent,
            updateHeroContent,
            musicContent: {
                featuredTrack,
                otherTracks
            },
            updateFeaturedTrack,
            updateOtherTracks,
            aboutContent,
            updateAboutContent,
            merchItems,
            updateMerchItems,
            mediaContent: {
                photos,
                videos
            },
            updatePhotos,
            updateVideos,
            contactContent,
            updateContactContent,
            eventsContent,
            updateEventsContent,
            resetContent
        }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
