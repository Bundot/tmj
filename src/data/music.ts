import yawa from '../assets/yawa.jpeg';

export interface Track {
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
    lyricsExcerpt?: string;
}

export const featuredTrack: Track = {
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
    featured: true,
    lyricsExcerpt:
        'This is where the lyrics would go... In a real app, this would be a sanitized excerpt of the song lyrics.',
};

export const otherTracks: Track[] = [
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
        title: 'My Woman',
        artists: ['TMJ', 'Afrobeats Collective'],
        cover: yawa,
        platforms: {
            spotify: 'https://spotify.com',
        },
        releaseDate: '2025-06-15',
    },
    {
        title: 'Yawa',
        artists: ['TMJ'],
        cover: yawa,
        platforms: {
            spotify: 'https://spotify.com',
            apple: 'https://music.apple.com',
        },
    },
];
