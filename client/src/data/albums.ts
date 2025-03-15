export interface Track {
  id: number;
  title: string;
  duration: string;
}

export interface Album {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  tracks: Track[];
}

export const albums: Album[] = [
  {
    id: 1,
    title: 'SOUR (2021)',
    artist: 'Olivia Rodrigo',
    imageUrl: '/attached_assets/SOUR (2021).png',
    tracks: [
      { id: 1, title: 'brutal', duration: '2:23' },
      { id: 2, title: 'traitor', duration: '3:49' },
      { id: 3, title: 'drivers license', duration: '4:02' },
      { id: 4, title: 'deja vu', duration: '3:35' },
      { id: 5, title: 'good 4 u', duration: '2:58' }
    ]
  },
  {
    id: 2,
    title: 'Rosie (2024)',
    artist: 'Rosé',
    imageUrl: '/attached_assets/Rosie (2024) - Rosé.png',
    tracks: [
      { id: 1, title: 'APT.', duration: '2:44' },
      { id: 2, title: 'BLESSED-CURSED', duration: '3:12' },
      { id: 3, title: 'GAME', duration: '3:45' },
      { id: 4, title: 'MASTERPIECE', duration: '3:28' }
    ]
  },
  {
    id: 3,
    title: 'Evermore (2020)',
    artist: 'Taylor Swift',
    imageUrl: '/attached_assets/Evermore (2020) - Taylor Swift.jpg',
    tracks: [
      { id: 1, title: 'willow', duration: '3:34' },
      { id: 2, title: 'champagne problems', duration: '4:04' },
      { id: 3, title: 'gold rush', duration: '3:05' },
      { id: 4, title: 'evermore ft. Bon Iver', duration: '5:04' },
      { id: 5, title: 'long story short', duration: '3:35' }
    ]
  },
  {
    id: 4,
    title: 'Tanong (2023)',
    artist: 'Maki',
    imageUrl: '/attached_assets/Tanong (2023) - Maki.jpg',
    tracks: [
      { id: 1, title: 'Tanong', duration: '3:12' },
      { id: 2, title: 'Hangganan', duration: '4:15' },
      { id: 3, title: 'Palayo', duration: '3:29' },
      { id: 4, title: 'Dekada', duration: '3:36' }
    ]
  }
];
