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
    imageUrl: '/attached_assets/sour_2021.png',
    description: 'Sour is the debut studio album by American singer-songwriter Olivia Rodrigo. Released on May 21, 2021, by Geffen Records, the album was written by Rodrigo and producer Dan Nigro. Originally planned as an EP, Sour was expanded into a full-length album following the viral success of her debut single, "Drivers License".',
    tracks: [
      { id: 1, title: 'brutal', duration: '2:23' },
      { id: 2, title: 'traitor', duration: '3:49' },
      { id: 3, title: 'drivers license', duration: '4:02' },
      { id: 4, title: 'deja vu', duration: '3:35' },
      { id: 5, title: 'good 4 u', duration: '2:58' },
      { id: 6, title: 'enough for you', duration: '3:22' },
      { id: 7, title: 'happier', duration: '2:55' },
      { id: 8, title: 'jealousy, jealousy', duration: '2:53' },
      { id: 9, title: 'favorite crime', duration: '2:32' },
      { id: 10, title: 'hope ur ok', duration: '3:29' },
      { id: 11, title: 'deja vu (alternative version)', duration: '3:37' }
    ]
  },
  {
    id: 2,
    title: 'Rosie (2024)',
    artist: 'Rosé',
    imageUrl: '/attached_assets/Rosie (2024) - Rosé.png',
    description: 'Rosie is the highly anticipated debut solo studio album by New Zealand-born South Korean singer Rosé. Released in 2024, the album showcases her versatile vocal range and features the hit single "number one girl" which blends pop and R&B elements with personal and introspective lyrics reflecting her journey as an artist.',
    tracks: [
      { id: 1, title: 'number one girl', duration: '3:12' },
      { id: 2, title: 'APT.', duration: '3:15' },
      { id: 3, title: 'MANTRA', duration: '3:45' },
      { id: 4, title: 'ENERGY', duration: '3:28' },
      { id: 5, title: 'HATE U', duration: '3:05' },
      { id: 6, title: 'MAESIL', duration: '2:58' },
      { id: 7, title: 'Vampirehollic', duration: '3:42' },
      { id: 8, title: 'SPOT!', duration: '3:16' },
      { id: 9, title: "Please, Don't Fall In Love With Me", duration: '3:37' },
      { id: 10, title: 'Childhood Dream', duration: '3:24' }
    ]
  },
  {
    id: 3,
    title: 'Evermore (2020)',
    artist: 'Taylor Swift',
    imageUrl: '/attached_assets/Evermore (2020) - Taylor Swift.jpg',
    description: 'Evermore is the ninth studio album by American singer-songwriter Taylor Swift. It was surprise-released on December 11, 2020, by Republic Records, less than five months after her previous studio album Folklore. The album is a continuation of the indie folk and alternative rock styles established on Folklore, with Swift describing it as a "sister record".',
    tracks: [
      { id: 1, title: 'willow', duration: '3:34' },
      { id: 2, title: 'champagne problems', duration: '4:04' },
      { id: 3, title: 'gold rush', duration: '3:05' },
      { id: 4, title: 'tis the damn season', duration: '3:49' },
      { id: 5, title: 'tolerate it', duration: '4:05' },
      { id: 6, title: 'no body, no crime ft. HAIM', duration: '3:35' },
      { id: 7, title: 'happiness', duration: '5:15' },
      { id: 8, title: 'dorothea', duration: '3:45' },
      { id: 9, title: 'coney island ft. The National', duration: '4:35' },
      { id: 10, title: 'ivy', duration: '4:20' },
      { id: 11, title: 'cowboy like me', duration: '4:35' },
      { id: 12, title: 'long story short', duration: '3:35' },
      { id: 13, title: 'marjorie', duration: '4:17' },
      { id: 14, title: 'closure', duration: '3:00' },
      { id: 15, title: 'evermore ft. Bon Iver', duration: '5:04' }
    ]
  },
  {
    id: 4,
    title: 'Tanong (2023)',
    artist: 'Maki',
    imageUrl: '/attached_assets/Tanong (2023) - Maki.jpg',
    description: 'Tanong is the breakout EP by Filipino alternative/city pop singer-songwriter Maki, featuring his viral hit "Sigurado." Through smooth melodies and heartfelt lyrics, Maki explores themes of uncertainty, longing, and emotional vulnerability. His distinctive voice and authentic songwriting have resonated with listeners throughout the Philippines and beyond, establishing him as an emerging voice in modern Filipino music.',
    tracks: [
      { id: 1, title: 'Sigurado', duration: '3:12' },
      { id: 2, title: 'Saan?', duration: '4:15' }
    ]
  }
];
