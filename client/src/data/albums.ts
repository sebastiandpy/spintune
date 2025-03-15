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
  description: string;
  tracks: Track[];
}

export const albums: Album[] = [
  {
    id: 1,
    title: 'SOUR (2021)',
    artist: 'Olivia Rodrigo',
    imageUrl: '/attached_assets/SOUR (2021).png',
    description: 'Sour is the debut studio album by American singer and songwriter Olivia Rodrigo. It was released on May 21, 2021, by Geffen Records. The album was written by Rodrigo and producer Dan Nigro.',
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
    description: 'Rosie is the debut solo studio album by New Zealand and South Korean singer Rosé. Released on December 6, 2024, through The Black Label and Atlantic Records, the album marks Rosé\'s first solo release after departing from YG Entertainment and Interscope Records in 2023.',
    tracks: [
      { id: 1, title: 'Number One Girl', duration: '3:12' },
      { id: 2, title: 'BLESSED-CURSED', duration: '3:15' },
      { id: 3, title: 'GAME', duration: '3:45' },
      { id: 4, title: 'MASTERPIECE', duration: '3:28' }
    ]
  },
  {
    id: 3,
    title: 'Evermore (2020)',
    artist: 'Taylor Swift',
    imageUrl: '/attached_assets/Evermore (2020) - Taylor Swift.jpg',
    description: 'Evermore is the ninth studio album by American singer-songwriter Taylor Swift. It was surprise-released on December 11, 2020, by Republic Records, less than five months after her previous studio album Folklore.',
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
    description: 'Alternative/city pop singer-songwriter Maki shares his music with the world through easy and melodic tunes, despite his songs being heartbreaking and emotional. His biggest 2023 hit, "Saan?", gained popularity across the Philippines and internationally. With the success of Tanong EP, the question remains—where will he go next?',
    tracks: [
      { id: 1, title: 'Sigurado', duration: '3:12' },
      { id: 2, title: 'Hangganan', duration: '4:15' },
      { id: 3, title: 'Palayo', duration: '3:29' },
      { id: 4, title: 'Dekada', duration: '3:36' }
    ]
  }
];
