import type { Property, Agent } from '../types'

// ── Agents ───────────────────────────────────────────────────────────────────

const AGENTS: Record<string, Agent> = {
  kwame: {
    id: 'agent-001',
    name: 'Kwame Asante',
    phone: '+233 24 100 2030',
    email: 'kwame.asante@nestaagents.com',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop&facepad=2',
    agency: 'Asante Realty Group',
    verified: true,
    listings: 24,
  },
  abena: {
    id: 'agent-002',
    name: 'Abena Mensah',
    phone: '+233 20 300 4050',
    email: 'abena.mensah@nestaagents.com',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop&facepad=2',
    agency: 'Prime Properties Ghana',
    verified: true,
    listings: 18,
  },
  kofi: {
    id: 'agent-003',
    name: 'Kofi Boateng',
    phone: '+233 55 600 7080',
    email: 'kofi.boateng@nestaagents.com',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop&facepad=2',
    agency: 'Boateng & Co. Properties',
    verified: true,
    listings: 31,
  },
  ama: {
    id: 'agent-004',
    name: 'Ama Darko',
    phone: '+233 27 900 1020',
    email: 'ama.darko@nestaagents.com',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&auto=format&fit=crop&facepad=2',
    agency: 'Darko Estates',
    verified: false,
    listings: 9,
  },
  nana: {
    id: 'agent-005',
    name: 'Nana Oppong',
    phone: '+233 24 500 6070',
    email: 'nana.oppong@nestaagents.com',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&auto=format&fit=crop&facepad=2',
    agency: 'Oppong Premier Realty',
    verified: true,
    listings: 14,
  },
  efua: {
    id: 'agent-006',
    name: 'Efua Acheampong',
    phone: '+233 54 800 9010',
    email: 'efua.acheampong@nestaagents.com',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&auto=format&fit=crop&facepad=2',
    agency: 'Gold Coast Properties',
    verified: true,
    listings: 22,
  },
}

// ── Properties ────────────────────────────────────────────────────────────────

export const ALL_PROPERTIES: Property[] = [

  // ── East Legon ─────────────────────────────────────────────────────────────
  {
    id: 'prop-001',
    title: 'Modern 3 Bedroom Apartment in East Legon',
    description:
      'A beautifully appointed three-bedroom apartment in the heart of East Legon. ' +
      'Open-plan living and dining area, fully fitted kitchen, and a private balcony with city views. ' +
      'Residents enjoy 24-hour security, a communal swimming pool, and covered parking.',
    price: 8_500,
    currency: 'GHS',
    priceLabel: '/ month',
    transactionType: 'rent',
    propertyType: 'apartment',
    location: {
      address: '14 Osei Bonsu Close',
      neighborhood: 'East Legon',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
      coordinates: { lat: 5.6340, lng: -0.1555 },
    },
    images: [
      // Illustrative furnished apartment interior from an East Legon apartment reference.
      'https://media.vrbo.com/lodging/35000000/34660000/34651200/34651119/d82af302.jpg?impolicy=resizecrop&ra=fill&rh=575&rw=575',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    area: 185,
    amenities: ['Swimming Pool', 'Security', 'Furnished', 'Air Conditioning', 'Generator', 'Gym'],
    featured: true,
    verified: true,
    agent: AGENTS.kwame,
    createdAt: '2026-09-10T08:00:00Z',
    yearBuilt: 2022,
    furnished: true,
    availability: 'Available now',
    views: 142,
  },

  // ── Cantonments ────────────────────────────────────────────────────────────
  {
    id: 'prop-002',
    title: 'Executive 4 Bedroom House in Cantonments',
    description:
      'An executive four-bedroom detached house in the prestigious Cantonments neighbourhood. ' +
      'Generous plot with a landscaped garden, private swimming pool, and separate staff quarters. ' +
      'Ideal for professionals and families seeking comfort, privacy, and proximity to the CBD.',
    price: 1_850_000,
    currency: 'GHS',
    transactionType: 'buy',
    propertyType: 'house',
    location: {
      address: '7 Nkrumah Crescent',
      neighborhood: 'Cantonments',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
      coordinates: { lat: 5.5845, lng: -0.1895 },
    },
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    area: 420,
    amenities: ['Swimming Pool', 'Security', 'Garden', 'Air Conditioning', 'Generator'],
    featured: true,
    verified: true,
    agent: AGENTS.abena,
    createdAt: '2026-09-05T10:30:00Z',
    yearBuilt: 2019,
    furnished: false,
    availability: 'Available now',
    views: 89,
  },

  // ── Airport Residential ────────────────────────────────────────────────────
  {
    id: 'prop-003',
    title: 'Luxury Villa in Airport Residential Area',
    description:
      'An architectural statement set within one of Accra\'s most exclusive neighbourhoods. ' +
      'Five bedrooms, marble floors, bespoke cabinetry, and floor-to-ceiling glazing. ' +
      'Private gym, cinema room, and home office included.',
    price: 4_200_000,
    currency: 'GHS',
    transactionType: 'buy',
    propertyType: 'villa',
    location: {
      address: '3 Aviation Road',
      neighborhood: 'Airport Residential',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
      coordinates: { lat: 5.6026, lng: -0.1695 },
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 5,
    bathrooms: 6,
    parking: 4,
    area: 680,
    amenities: ['Swimming Pool', 'Security', 'Furnished', 'Air Conditioning', 'Generator', 'Gym', 'Garden'],
    featured: true,
    verified: true,
    agent: AGENTS.kofi,
    createdAt: '2026-08-28T14:00:00Z',
    yearBuilt: 2021,
    furnished: true,
    availability: 'Available now',
    views: 204,
  },

  // ── Osu ───────────────────────────────────────────────────────────────────
  {
    id: 'prop-004',
    title: 'Studio Apartment in Osu — Walkable and Central',
    description:
      'A compact, well-designed studio apartment moments from the Osu Oxford Street. ' +
      'Perfect for young professionals. Fully furnished with modern appliances, ' +
      'high-speed fibre internet, and rooftop terrace access.',
    price: 3_200,
    currency: 'GHS',
    priceLabel: '/ month',
    transactionType: 'rent',
    propertyType: 'apartment',
    location: {
      address: '22B Oxford Street',
      neighborhood: 'Osu',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
      coordinates: { lat: 5.5560, lng: -0.1720 },
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    area: 52,
    amenities: ['Furnished', 'Air Conditioning', 'Security'],
    featured: true,
    verified: true,
    agent: AGENTS.ama,
    createdAt: '2026-09-18T09:00:00Z',
    furnished: true,
    availability: 'Available now',
    views: 67,
  },

  // ── Labone ────────────────────────────────────────────────────────────────
  {
    id: 'prop-005',
    title: '2 Bedroom Townhouse in Labone',
    description:
      'A stylish two-storey townhouse in quiet Labone. ' +
      'Open-plan ground floor leads onto a private courtyard garden. ' +
      'Two en-suite bedrooms with built-in storage and air conditioning.',
    price: 950_000,
    currency: 'GHS',
    transactionType: 'buy',
    propertyType: 'townhouse',
    location: {
      address: '5 Labone Close',
      neighborhood: 'Labone',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
      coordinates: { lat: 5.5700, lng: -0.1650 },
    },
    images: [
      'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    area: 145,
    amenities: ['Air Conditioning', 'Security', 'Garden'],
    featured: true,
    verified: false,
    agent: AGENTS.kwame,
    createdAt: '2026-09-01T11:00:00Z',
    yearBuilt: 2020,
    furnished: false,
    availability: 'Available now',
    views: 51,
  },

  // ── Airport City ──────────────────────────────────────────────────────────
  {
    id: 'prop-006',
    title: 'Commercial Office Space in Airport City',
    description:
      'Grade A office space on a full-floor basis in Airport City\'s newest commercial tower. ' +
      'Raised flooring, suspended ceilings, fibre-ready infrastructure, and dedicated parking. ' +
      'Ideal for multinationals, NGOs, and growing Ghanaian businesses.',
    price: 22_000,
    currency: 'GHS',
    priceLabel: '/ month',
    transactionType: 'rent',
    propertyType: 'commercial',
    location: {
      address: 'Airport City Tower, Liberation Road',
      neighborhood: 'Airport City',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
      coordinates: { lat: 5.6063, lng: -0.1780 },
    },
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 0,
    bathrooms: 4,
    parking: 8,
    area: 600,
    amenities: ['Air Conditioning', 'Security', 'Generator', 'Parking'],
    featured: false,
    verified: true,
    agent: AGENTS.abena,
    createdAt: '2026-09-12T08:30:00Z',
  },

  // ── Spintex ───────────────────────────────────────────────────────────────
  {
    id: 'prop-007',
    title: 'Beachfront Land Parcel in Spintex',
    description:
      'A rare 0.5-acre plot 200 metres from the Spintex coastline. ' +
      'Fully documented with indenture and site plan. ' +
      'Ideal for residential development, a boutique hotel, or short-term rental property.',
    price: 680_000,
    currency: 'GHS',
    transactionType: 'buy',
    propertyType: 'land',
    location: {
      address: 'Spintex Road, Plot 44B',
      neighborhood: 'Spintex',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
      coordinates: { lat: 5.6150, lng: -0.1020 },
    },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    area: 2023,
    amenities: [],
    featured: false,
    verified: true,
    agent: AGENTS.kofi,
    createdAt: '2026-08-20T07:00:00Z',
  },

  // ── Adenta ────────────────────────────────────────────────────────────────
  {
    id: 'prop-008',
    title: '5 Bedroom House in Adenta — Gated Estate',
    description:
      'A spacious family home within the secure Adenta Gardens estate. ' +
      'Five bedrooms, home office, covered carport for three vehicles, and a large garden. ' +
      'Managed estate with 24-hour security and CCTV.',
    price: 1_200_000,
    currency: 'GHS',
    transactionType: 'buy',
    propertyType: 'house',
    location: {
      address: 'Adenta Gardens, Block C',
      neighborhood: 'Adenta',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
      coordinates: { lat: 5.7120, lng: -0.1620 },
    },
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 5,
    bathrooms: 5,
    parking: 3,
    area: 520,
    amenities: ['Security', 'Generator', 'Garden', 'Air Conditioning'],
    featured: false,
    verified: true,
    agent: AGENTS.ama,
    createdAt: '2026-09-08T13:00:00Z',
    yearBuilt: 2018,
  },

  // ── Tema ──────────────────────────────────────────────────────────────────
  {
    id: 'prop-009',
    title: '3 Bedroom Apartment in Community 25, Tema',
    description:
      'Well-maintained three-bedroom apartment in the sought-after Community 25 area of Tema. ' +
      'Bright rooms, modern kitchen, and a balcony overlooking a well-kept courtyard. ' +
      'Close to Tema Motorway and major amenities.',
    price: 5_500,
    currency: 'GHS',
    priceLabel: '/ month',
    transactionType: 'rent',
    propertyType: 'apartment',
    location: {
      address: 'Community 25, Block 8',
      neighborhood: 'Community 25',
      city: 'Tema',
      region: 'Greater Accra',
      country: 'Ghana',
      coordinates: { lat: 5.6698, lng: -0.0166 },
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    area: 130,
    amenities: ['Security', 'Air Conditioning'],
    featured: false,
    verified: true,
    agent: AGENTS.kwame,
    createdAt: '2026-09-14T10:00:00Z',
  },

  // ── Kumasi ────────────────────────────────────────────────────────────────
  {
    id: 'prop-010',
    title: 'Modern 4 Bedroom House in Kumasi — KNUST Area',
    description:
      'A newly completed four-bedroom house minutes from KNUST. ' +
      'Double-height entrance hall, fitted kitchen with island, and covered parking. ' +
      'Ideal for lecturers, professionals, or families.',
    price: 780_000,
    currency: 'GHS',
    transactionType: 'buy',
    propertyType: 'house',
    location: {
      address: 'Ayigya, KNUST Road',
      neighborhood: 'Ayigya',
      city: 'Kumasi',
      region: 'Ashanti',
      country: 'Ghana',
      coordinates: { lat: 6.6778, lng: -1.5710 },
    },
    images: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    area: 290,
    amenities: ['Security', 'Air Conditioning', 'Generator'],
    featured: false,
    verified: false,
    agent: AGENTS.abena,
    createdAt: '2026-08-25T09:00:00Z',
    yearBuilt: 2024,
  },

  // ── Takoradi ──────────────────────────────────────────────────────────────
  {
    id: 'prop-011',
    title: 'Sea-View Villa in Takoradi',
    description:
      'A rare sea-facing villa on the Takoradi beachfront. ' +
      'Three bedrooms, a chef\'s kitchen, a wrap-around veranda, and direct beach access. ' +
      'Perfect as a primary residence or holiday let.',
    price: 2_100_000,
    currency: 'GHS',
    transactionType: 'buy',
    propertyType: 'villa',
    location: {
      address: 'Beach Road, Plot 9',
      neighborhood: 'Takoradi Beachfront',
      city: 'Takoradi',
      region: 'Western',
      country: 'Ghana',
      coordinates: { lat: 4.8984, lng: -1.7746 },
    },
    images: [
      'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    area: 310,
    amenities: ['Swimming Pool', 'Garden', 'Security', 'Air Conditioning'],
    featured: true,
    verified: true,
    agent: AGENTS.kofi,
    createdAt: '2026-09-03T12:00:00Z',
    yearBuilt: 2023,
  },

  // ── East Legon Hills ──────────────────────────────────────────────────────
  {
    id: 'prop-012',
    title: '2 Bedroom Apartment in East Legon Hills',
    description:
      'Bright two-bedroom apartment in the newer East Legon Hills development. ' +
      'Contemporary finishes, fitted kitchen, and secure parking. ' +
      'Close to the Accra Mall and Trasacco roundabout.',
    price: 5_000,
    currency: 'GHS',
    priceLabel: '/ month',
    transactionType: 'rent',
    propertyType: 'apartment',
    location: {
      address: 'East Legon Hills, Phase 2',
      neighborhood: 'East Legon Hills',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
      coordinates: { lat: 5.6490, lng: -0.1390 },
    },
    images: [
      'https://images.unsplash.com/photo-1630183353367-efc8098e38ff?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    area: 110,
    amenities: ['Air Conditioning', 'Security', 'Furnished'],
    featured: false,
    verified: true,
    agent: AGENTS.kwame,
    createdAt: '2026-09-20T08:00:00Z',
  },

  // ── New listings from Phase 2 expansion ───────────────────────────────────

  // ── Cantonments ────────────────────────────────────────────────────────────
  {
    id: 'prop-013',
    title: '3 Bedroom Townhouse for Rent in Cantonments',
    description:
      'A well-maintained three-bedroom townhouse in a quiet Cantonments cul-de-sac. ' +
      'Recently renovated with fresh paintwork, new tiling, and upgraded kitchen appliances. ' +
      'Private driveway and small courtyard garden.',
    price: 12_000,
    currency: 'GHS',
    priceLabel: '/ month',
    transactionType: 'rent',
    propertyType: 'townhouse',
    location: {
      address: '18 Independence Avenue',
      neighborhood: 'Cantonments',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
      coordinates: { lat: 5.5860, lng: -0.1910 },
    },
    images: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    area: 210,
    amenities: ['Security', 'Air Conditioning', 'Generator', 'Garden'],
    featured: false,
    verified: true,
    agent: AGENTS.nana,
    createdAt: '2026-09-22T09:00:00Z',
    yearBuilt: 2017,
  },

  // ── Airport Residential ────────────────────────────────────────────────────
  {
    id: 'prop-014',
    title: '2 Bedroom Apartment for Sale in Airport Residential',
    description:
      'A smart two-bedroom apartment in a secure compound in Airport Residential. ' +
      'Modern open-plan layout, American-style kitchen, en-suite master bedroom, ' +
      'and a covered balcony with views over the communal pool.',
    price: 620_000,
    currency: 'GHS',
    transactionType: 'buy',
    propertyType: 'apartment',
    location: {
      address: '9 Kotoka Link Road',
      neighborhood: 'Airport Residential',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
      coordinates: { lat: 5.6010, lng: -0.1705 },
    },
    images: [
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    area: 98,
    amenities: ['Swimming Pool', 'Security', 'Air Conditioning', 'Generator'],
    featured: false,
    verified: true,
    agent: AGENTS.efua,
    createdAt: '2026-09-16T11:00:00Z',
    yearBuilt: 2021,
  },

  // ── Spintex ───────────────────────────────────────────────────────────────
  {
    id: 'prop-015',
    title: '4 Bedroom House in Spintex — Corner Plot',
    description:
      'Generous four-bedroom house on a corner plot in Spintex. ' +
      'Large wraparound garden, covered parking for two vehicles, ' +
      'and a recently refurbished interior with hardwood floors.',
    price: 980_000,
    currency: 'GHS',
    transactionType: 'buy',
    propertyType: 'house',
    location: {
      address: 'Spintex Comm. 18, Plot 7',
      neighborhood: 'Spintex',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
      coordinates: { lat: 5.6200, lng: -0.0980 },
    },
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 4,
    bathrooms: 4,
    parking: 2,
    area: 350,
    amenities: ['Security', 'Generator', 'Garden', 'Air Conditioning'],
    featured: false,
    verified: false,
    agent: AGENTS.nana,
    createdAt: '2026-09-11T14:00:00Z',
    yearBuilt: 2016,
  },

  // ── Labone ────────────────────────────────────────────────────────────────
  {
    id: 'prop-016',
    title: 'Furnished 1 Bedroom Apartment in Labone',
    description:
      'A tastefully furnished one-bedroom apartment perfectly suited for singles or couples. ' +
      'Located in the quiet residential heart of Labone, minutes from key dining and retail. ' +
      'All-inclusive rent available on request.',
    price: 4_500,
    currency: 'GHS',
    priceLabel: '/ month',
    transactionType: 'rent',
    propertyType: 'apartment',
    location: {
      address: '3 Labone Lane',
      neighborhood: 'Labone',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
      coordinates: { lat: 5.5720, lng: -0.1640 },
    },
    images: [
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    area: 68,
    amenities: ['Furnished', 'Air Conditioning', 'Security'],
    featured: false,
    verified: true,
    agent: AGENTS.ama,
    createdAt: '2026-09-19T10:00:00Z',
  },

  // ── Kumasi ────────────────────────────────────────────────────────────────
  {
    id: 'prop-017',
    title: 'Spacious Villa in Kumasi — Nhyiaeso',
    description:
      'An impressive five-bedroom villa in the upscale Nhyiaeso neighbourhood of Kumasi. ' +
      'Sweeping entrance driveway, private swimming pool, and a landscaped garden. ' +
      'Perfect for a family relocating to Kumasi or seeking a southern capital retreat.',
    price: 1_600_000,
    currency: 'GHS',
    transactionType: 'buy',
    propertyType: 'villa',
    location: {
      address: '12 Nhyiaeso Road',
      neighborhood: 'Nhyiaeso',
      city: 'Kumasi',
      region: 'Ashanti',
      country: 'Ghana',
      coordinates: { lat: 6.6892, lng: -1.5641 },
    },
    images: [
      // Illustrative Unsplash villa photo; this demo listing has no original photos.
      'https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 5,
    bathrooms: 5,
    parking: 3,
    area: 540,
    amenities: ['Swimming Pool', 'Garden', 'Security', 'Generator', 'Air Conditioning'],
    featured: false,
    verified: true,
    agent: AGENTS.efua,
    createdAt: '2026-08-30T07:00:00Z',
    yearBuilt: 2020,
  },

  // ── Tema ──────────────────────────────────────────────────────────────────
  {
    id: 'prop-018',
    title: 'Industrial Warehouse Space in Tema Free Zone',
    description:
      'A 1,200 sq m industrial warehouse in the Tema Free Zone with dock-level loading, ' +
      '6-metre clear height, and three-phase power. ' +
      'Suitable for manufacturing, logistics, or storage operations.',
    price: 35_000,
    currency: 'GHS',
    priceLabel: '/ month',
    transactionType: 'rent',
    propertyType: 'commercial',
    location: {
      address: 'Tema Free Zone, Zone B',
      neighborhood: 'Tema Free Zone',
      city: 'Tema',
      region: 'Greater Accra',
      country: 'Ghana',
      coordinates: { lat: 5.6730, lng: -0.0120 },
    },
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 0,
    bathrooms: 2,
    parking: 10,
    area: 1200,
    amenities: ['Security', 'Generator', 'Parking'],
    featured: false,
    verified: true,
    agent: AGENTS.kofi,
    createdAt: '2026-09-07T08:00:00Z',
  },

  // ── East Legon ────────────────────────────────────────────────────────────
  {
    id: 'prop-019',
    title: 'Serviced 2 Bedroom Apartment in East Legon',
    description:
      'A fully serviced two-bedroom apartment in a boutique building in East Legon. ' +
      'All utilities included, weekly cleaning service, and a rooftop terrace shared with residents. ' +
      'Ideal for short-term stays or professionals on corporate packages.',
    price: 7_200,
    currency: 'GHS',
    priceLabel: '/ month',
    transactionType: 'rent',
    propertyType: 'apartment',
    location: {
      address: '6 Ambassadorial Enclave',
      neighborhood: 'East Legon',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
      coordinates: { lat: 5.6360, lng: -0.1530 },
    },
    images: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    area: 120,
    amenities: ['Furnished', 'Air Conditioning', 'Security', 'Generator', 'Gym'],
    featured: false,
    verified: true,
    agent: AGENTS.nana,
    createdAt: '2026-09-23T09:00:00Z',
  },

  // ── Adenta ────────────────────────────────────────────────────────────────
  {
    id: 'prop-020',
    title: 'Residential Land in Adenta — Title Deed Available',
    description:
      'A well-positioned 0.3-acre residential plot in the fast-growing Adenta municipality. ' +
      'Flat terrain, good road access, and all documentation in order. ' +
      'Perfect for immediate development.',
    price: 320_000,
    currency: 'GHS',
    transactionType: 'buy',
    propertyType: 'land',
    location: {
      address: 'Adenta Electoral Area, Plot 21',
      neighborhood: 'Adenta',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
      coordinates: { lat: 5.7100, lng: -0.1590 },
    },
    images: [
      'https://images.unsplash.com/photo-1609412058473-c199497c3c5d?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560179304-6fc1d8749b23?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    area: 1214,
    amenities: [],
    featured: false,
    verified: true,
    agent: AGENTS.ama,
    createdAt: '2026-08-18T11:00:00Z',
  },

  // ── Accra Central / Ring Road ──────────────────────────────────────────────
  {
    id: 'prop-021',
    title: 'Premium Office Suite on Ring Road, Accra',
    description:
      'A fully fitted 280 sq m office suite on the 4th floor of a modern Ring Road tower. ' +
      'Includes a boardroom, open-plan workspace, server room, and private reception area. ' +
      'On-site generator and parking for six vehicles.',
    price: 18_500,
    currency: 'GHS',
    priceLabel: '/ month',
    transactionType: 'rent',
    propertyType: 'commercial',
    location: {
      address: '42 Ring Road Central',
      neighborhood: 'Ring Road',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
      coordinates: { lat: 5.5710, lng: -0.2020 },
    },
    images: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 0,
    bathrooms: 3,
    parking: 6,
    area: 280,
    amenities: ['Air Conditioning', 'Security', 'Generator', 'Parking'],
    featured: false,
    verified: true,
    agent: AGENTS.efua,
    createdAt: '2026-09-13T08:00:00Z',
  },

  // ── Takoradi ──────────────────────────────────────────────────────────────
  {
    id: 'prop-022',
    title: '3 Bedroom House for Rent in Takoradi — Effia',
    description:
      'A comfortable three-bedroom house in a well-established Takoradi neighbourhood. ' +
      'Tiled throughout, fitted kitchen, and a manageable garden. ' +
      'Walking distance to Effia-Nkwanta hospital and key amenities.',
    price: 4_800,
    currency: 'GHS',
    priceLabel: '/ month',
    transactionType: 'rent',
    propertyType: 'house',
    location: {
      address: '11 Effia Road',
      neighborhood: 'Effia',
      city: 'Takoradi',
      region: 'Western',
      country: 'Ghana',
      coordinates: { lat: 4.9041, lng: -1.7808 },
    },
    images: [
      // Illustrative Unsplash house photo; this demo listing has no original photos.
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    area: 170,
    amenities: ['Security', 'Garden', 'Air Conditioning'],
    featured: false,
    verified: false,
    agent: AGENTS.abena,
    createdAt: '2026-09-15T13:00:00Z',
  },

  // ── Kumasi ────────────────────────────────────────────────────────────────
  {
    id: 'prop-023',
    title: '1 Bedroom Apartment in Kumasi — Ahodwo',
    description:
      'A neat one-bedroom apartment in the vibrant Ahodwo district of Kumasi. ' +
      'Fully tiled, fitted kitchen with gas cooker, and a private balcony. ' +
      'Secure compound parking and 24-hour security.',
    price: 2_800,
    currency: 'GHS',
    priceLabel: '/ month',
    transactionType: 'rent',
    propertyType: 'apartment',
    location: {
      address: 'Ahodwo Crescent, Flat 4B',
      neighborhood: 'Ahodwo',
      city: 'Kumasi',
      region: 'Ashanti',
      country: 'Ghana',
      coordinates: { lat: 6.6750, lng: -1.5810 },
    },
    images: [
      '/room1.jpg',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=900&q=80&auto=format&fit=crop',
    ],
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    area: 58,
    amenities: ['Security', 'Air Conditioning'],
    featured: false,
    verified: false,
    agent: AGENTS.nana,
    createdAt: '2026-09-21T10:00:00Z',
  },
]

// ── Derived exports ───────────────────────────────────────────────────────────

/** All properties marked as featured */
export const FEATURED_PROPERTIES = ALL_PROPERTIES.filter((p) => p.featured)

/** Unique cities in the dataset, sorted alphabetically */
export const PROPERTY_CITIES = [
  ...new Set(ALL_PROPERTIES.map((p) => p.location.city)),
].sort()

/** Look up a single property by ID */
export function getPropertyById(id: string): Property | undefined {
  return ALL_PROPERTIES.find((p) => p.id === id)
}

/** Get related properties (same type, different id, up to n) */
export function getRelatedProperties(id: string, n = 3): Property[] {
  const target = getPropertyById(id)
  if (!target) return []
  return ALL_PROPERTIES.filter(
    (p) => p.id !== id && p.propertyType === target.propertyType,
  ).slice(0, n)
}
