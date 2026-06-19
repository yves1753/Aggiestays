export type AmenityGroup = {
  category: string;
  items: { name: string; note?: string }[];
};

export type Apartment = {
  id: string;
  name: string;
  location: string;
  locationSlug: string;
  bedrooms: number;
  price: string;
  hasPool: boolean;
  description: string;
  longDescription?: string;
  video: string;
  media: string[];
  photos?: string[];
  features: string[];
  amenities: AmenityGroup[];
};

export const LOCATIONS = [
  { slug: "all", name: "All Locations" },
  { slug: "goba-lastanza", name: "Goba Lastanza", totalApartments: 4 },
  { slug: "kijitonyama", name: "Kijitonyama" },
  { slug: "sinza-mapambano", name: "Sinza Mapambano" },
  { slug: "morocco-square", name: "Morocco Square" },
  { slug: "moshi-town", name: "Moshi Town" },
];

const COMMON_FEATURES = [
  "Fully furnished",
  "Kitchen with cookery set",
  "Washing machine",
  "Air conditioning in all rooms",
  "WiFi included",
  "Parking available",
  "Near shops and main roads",
  "High security",
  "Beautiful neighborhood",
  "King & queen size beds",
  "TV included",
];

const BASE_AMENITIES: AmenityGroup[] = [
  {
    category: "Bathroom",
    items: [
      { name: "Shampoo" },
      { name: "Body soap" },
      { name: "Hot water" },
      { name: "Shower gel" },
    ],
  },
  {
    category: "Bedroom and laundry",
    items: [
      { name: "Essentials", note: "Towels, bed sheets, soap, and toilet paper" },
      { name: "Hangers" },
      { name: "Bed linens" },
      { name: "Cotton linens" },
      { name: "Extra pillows and blankets" },
      { name: "Iron" },
      { name: "Drying rack for clothing" },
      { name: "Clothing storage" },
    ],
  },
  {
    category: "Entertainment",
    items: [{ name: "TV" }, { name: "Sound system" }],
  },
  {
    category: "Family",
    items: [{ name: "High chair" }],
  },
  {
    category: "Heating and cooling",
    items: [{ name: "Air conditioning" }, { name: "Ceiling fan" }],
  },
  {
    category: "Home safety",
    items: [
      {
        name: "Exterior security cameras on property",
        note: "For your safety, exterior security cameras are installed at the front gate and parking area. These cameras monitor entry and vehicle access points. There are no cameras inside the apartment or in private spaces.",
      },
      { name: "Fire extinguisher" },
    ],
  },
  {
    category: "Internet and office",
    items: [{ name: "Wifi" }, { name: "Dedicated workspace" }],
  },
  {
    category: "Kitchen and dining",
    items: [
      { name: "Refrigerator" },
      { name: "Microwave" },
      { name: "Cooking basics", note: "Pots and pans, oil, salt and pepper" },
      { name: "Dishes and silverware", note: "Bowls, chopsticks, plates, cups, etc." },
      { name: "Freezer" },
      { name: "Induction stove" },
      { name: "Oven" },
      { name: "Hot water kettle" },
      { name: "Wine glasses" },
      { name: "Blender" },
      { name: "Rice maker" },
      { name: "Kitchenette", note: "Space where guests can heat up and refrigerate food" },
      { name: "Coffee" },
    ],
  },
  {
    category: "Location features",
    items: [{ name: "Laundromat nearby" }],
  },
  {
    category: "Outdoor",
    items: [{ name: "Private patio or balcony" }],
  },
  {
    category: "Parking and facilities",
    items: [{ name: "Free parking on premises" }],
  },
  {
    category: "Services",
    items: [
      { name: "Smoking allowed" },
      { name: "Long term stays allowed", note: "Allow stay for 28 days or more" },
      { name: "Housekeeping available", note: "Wednesday, Saturday" },
    ],
  },
];

function withExtras(extra: AmenityGroup[] = []): AmenityGroup[] {
  // Merge extras into base by category if overlap, else append
  const byCat = new Map(BASE_AMENITIES.map((g) => [g.category, { ...g, items: [...g.items] }]));
  for (const grp of extra) {
    if (byCat.has(grp.category)) {
      byCat.get(grp.category)!.items.push(...grp.items);
    } else {
      byCat.set(grp.category, grp);
    }
  }
  return Array.from(byCat.values());
}

export const APARTMENTS: Apartment[] = [
  {
    id: "goba-lastanza",
    name: "Goba Lastanza Residence",
    location: "Goba Lastanza",
    locationSlug: "goba-lastanza",
    bedrooms: 2,
    price: "From $120 / night",
    hasPool: true,
    description:
      "A serene 2-bedroom ensuite retreat with private swimming pool, set in a quiet, beautiful neighborhood.",
    longDescription:
      "Tucked away in the leafy Goba Lastanza neighborhood, this 2-bedroom ensuite residence pairs a private swimming pool with sunlit interiors, full kitchen and king-size beds — a calm escape minutes from the city.",
    video: "/videos/goba-2br.mp4",
    media: ["/videos/goba-2br.mp4", "/videos/goba-pool.mp4", "/videos/goba-lastanza.mp4", "/videos/goba-drone.mp4"],
    photos: [
      "/photos/goba-exterior.jpg",
      "/photos/goba-entrance.jpg",
      "/photos/goba-living1.jpg",
      "/photos/goba-living-tv.jpg",
      "/photos/goba-kitchen.jpg",
      "/photos/goba-kitchen-island.jpg",
      "/photos/goba-kitchen-sink.jpg",
      "/photos/goba-bed1.jpg",
      "/photos/goba-bed2.jpg",
      "/photos/goba-bed3.jpg",
      "/photos/goba-bed4.jpg",
      "/photos/goba-bed5.jpg",
      "/photos/goba-bathroom.jpg",
      "/photos/goba-pool1.jpg",
      "/photos/goba-pool2.jpg",
      "/photos/goba-loungers.jpg",
      "/photos/goba-patio.jpg",
      "/photos/goba-veranda.jpg",
      "/photos/goba-outdoor-lounge.jpg",
      "/photos/goba-garden.jpg",
    ],
    features: ["2 Bedroom Ensuite", "Swimming pool included", ...COMMON_FEATURES],
    amenities: withExtras([
      { category: "Outdoor", items: [{ name: "Private swimming pool" }, { name: "Sun loungers" }] },
      { category: "Parking and facilities", items: [{ name: "Gated compound" }] },
    ]),
  },
  {
    id: "goba-lastanza-1br-pool",
    name: "Goba Lastanza One Bedroom",
    location: "Goba Lastanza",
    locationSlug: "goba-lastanza",
    bedrooms: 1,
    price: "From $100 / night",
    hasPool: true,
    description:
      "A stylish 1-bedroom apartment with private pool access, garden views, and fully equipped indoor-outdoor living.",
    longDescription:
      "This Goba Lastanza 1-bedroom apartment combines calm garden surroundings with a private all-year pool, full kitchen, washer and dryer, and a cozy furnished layout for short or long stays.",
    video: "/videos/goba-lastanza.mp4",
    media: ["/videos/goba-lastanza.mp4", "/videos/goba-drone.mp4"],
    photos: [
      "/photos/goba-1br-01.png",
      "/photos/goba-1br-02.png",
      "/photos/goba-1br-03.png",
      "/photos/goba-1br-04.png",
      "/photos/goba-1br-05.png",
      "/photos/goba-1br-06.png",
      "/photos/goba-1br-07.png",
      "/photos/goba-1br-08.png",
      "/photos/goba-1br-09.png",
      "/photos/goba-1br-10.png",
      "/photos/goba-1br-11.png",
      "/photos/goba-1br-12.png",
      "/photos/goba-1br-13.png",
      "/photos/goba-1br-14.png",
      "/photos/goba-1br-15.png",
      "/photos/goba-1br-16.png",
      "/photos/goba-1br-17.png",
      "/photos/goba-1br-18.png",
      "/photos/goba-1br-19.png",
      "/photos/goba-1br-20.png",
      "/photos/goba-1br-21.png",
      "/photos/goba-1br-22.png",
      "/photos/goba-1br-23.png",
    ],
    features: [
      "1 Bedroom Apartment",
      "Private pool access",
      "Garden and pool views",
      "Free in-unit washer and dryer",
      "Fully furnished",
      "WiFi included",
      "Air conditioning",
      "Outdoor dining and BBQ",
      "Pets allowed",
      "Long stays welcome (28+ days)",
    ],
    amenities: [
      {
        category: "Scenic views",
        items: [{ name: "Garden view" }, { name: "Pool view" }],
      },
      {
        category: "Bathroom",
        items: [{ name: "Bathtub" }, { name: "Dettol body soap" }, { name: "Outdoor shower" }, { name: "Hot water" }],
      },
      {
        category: "Bedroom and laundry",
        items: [
          { name: "Free washer - In unit" },
          { name: "Dryer" },
          { name: "Essentials", note: "Towels, bed sheets, soap, and toilet paper" },
          { name: "Hangers" },
          { name: "Bed linens" },
          { name: "Cotton linens" },
          { name: "Iron" },
          { name: "Clothing storage", note: "Closet and dresser" },
        ],
      },
      {
        category: "Entertainment",
        items: [{ name: '48" HDTV', note: "With Amazon Prime Video and Netflix" }],
      },
      {
        category: "Family",
        items: [{ name: "Outlet covers" }],
      },
      {
        category: "Heating and cooling",
        items: [
          { name: "Window AC unit" },
          { name: "AC - split type ductless system" },
          { name: "Ceiling fan" },
          { name: "Heating - split type ductless system" },
        ],
      },
      {
        category: "Home safety",
        items: [
          {
            name: "Exterior security cameras on property",
            note: "Security cameras are at the back garden and along the pool-side walking area.",
          },
        ],
      },
      {
        category: "Internet and office",
        items: [{ name: "Wifi" }],
      },
      {
        category: "Kitchen and dining",
        items: [
          { name: "Kitchen", note: "Space where guests can cook their own meals" },
          { name: "Refrigerator" },
          { name: "Microwave" },
          { name: "Cooking basics", note: "Pots and pans, oil, salt and pepper" },
          { name: "Dishes and silverware", note: "Bowls, chopsticks, plates, cups, etc." },
          { name: "Gas stove" },
          { name: "Hot water kettle" },
          { name: "Coffee maker" },
          { name: "Wine glasses" },
          { name: "Blender" },
          { name: "Trash compactor" },
          { name: "Dining table" },
          { name: "Coffee" },
        ],
      },
      {
        category: "Outdoor",
        items: [
          { name: "Private patio or balcony" },
          { name: "Private backyard - Fully fenced", note: "An open space on the property usually covered in grass" },
          { name: "Outdoor furniture" },
          { name: "Hammock" },
          { name: "Outdoor dining area" },
          { name: "BBQ grill" },
        ],
      },
      {
        category: "Parking and facilities",
        items: [
          { name: "Free parking on premises" },
          { name: "Private pool", note: "Available all year, open 24 hours" },
        ],
      },
      {
        category: "Services",
        items: [
          { name: "Pets allowed", note: "Assistance animals are always allowed" },
          { name: "Luggage dropoff allowed", note: "For guests with early arrival or late departure" },
          { name: "Long term stays allowed", note: "Allow stay for 28 days or more" },
          { name: "Cleaning available during stay" },
        ],
      },
      {
        category: "Not included",
        items: [
          { name: "Smoke alarm", note: "Unavailable. This place may not have a smoke detector." },
          { name: "Carbon monoxide alarm", note: "Unavailable. This place may not have a carbon monoxide detector." },
        ],
      },
    ],
  },
  {
    id: "goba-lastanza-2br-duplex-pool",
    name: "Goba Lastanza Duplex",
    location: "Goba Lastanza",
    locationSlug: "goba-lastanza",
    bedrooms: 2,
    price: "From $150 / night",
    hasPool: true,
    description:
      "A spacious 2-bedroom duplex with pool access, private balconies, modern interiors, and indoor-outdoor lounge areas.",
    longDescription:
      "Set in Goba Lastanza, this two-bedroom duplex offers bright modern finishes, large bedrooms, a fully equipped kitchen, private balconies, and all-year swimming pool access for premium short and long stays.",
    video: "/videos/goba-drone.mp4",
    media: ["/videos/goba-drone.mp4", "/videos/goba-lastanza.mp4"],
    photos: [
      "/photos/goba-2br-duplex-01.png",
      "/photos/goba-2br-duplex-02.png",
      "/photos/goba-2br-duplex-03.png",
      "/photos/goba-2br-duplex-04.png",
      "/photos/goba-2br-duplex-05.png",
      "/photos/goba-2br-duplex-06.png",
      "/photos/goba-2br-duplex-07.png",
      "/photos/goba-2br-duplex-08.png",
      "/photos/goba-2br-duplex-09.png",
      "/photos/goba-2br-duplex-10.png",
      "/photos/goba-2br-duplex-11.png",
      "/photos/goba-2br-duplex-12.png",
      "/photos/goba-2br-duplex-13.png",
      "/photos/goba-2br-duplex-14.png",
      "/photos/goba-2br-duplex-15.png",
      "/photos/goba-2br-duplex-16.png",
      "/photos/goba-2br-duplex-17.png",
      "/photos/goba-2br-duplex-18.png",
      "/photos/goba-2br-duplex-19.png",
      "/photos/goba-2br-duplex-20.png",
      "/photos/goba-2br-duplex-21.png",
      "/photos/goba-2br-duplex-22.png",
      "/photos/goba-2br-duplex-23.png",
      "/photos/goba-2br-duplex-24.png",
      "/photos/goba-2br-duplex-25.png",
      "/photos/goba-2br-duplex-26.png",
      "/photos/goba-2br-duplex-27.png",
      "/photos/goba-2br-duplex-28.png",
      "/photos/goba-2br-duplex-29.png",
      "/photos/goba-2br-duplex-30.png",
    ],
    features: [
      "2 Bedroom Duplex",
      "Swimming pool access",
      "Balcony seating",
      "Fully furnished",
      "Kitchen with appliances",
      "WiFi included",
      "Air conditioning in all rooms",
      "Outdoor lounge areas",
      "Free parking on premises",
    ],
    amenities: withExtras([
      {
        category: "Outdoor",
        items: [
          { name: "Private patio or balcony" },
          { name: "Poolside seating and lounge areas" },
        ],
      },
      {
        category: "Parking and facilities",
        items: [{ name: "Private pool access" }],
      },
      {
        category: "Kitchen and dining",
        items: [{ name: "Dining table" }, { name: "Coffee maker" }],
      },
    ]),
  },
  {
    id: "goba-lastanza-2br-luxury-pool",
    name: "Goba Lastanza Luxury 2BR",
    location: "Goba Lastanza",
    locationSlug: "goba-lastanza",
    bedrooms: 2,
    price: "From $160 / night",
    hasPool: true,
    description:
      "A luxury 2-bedroom ensuite apartment with swimming pool, garden setting, and a private pool table lounge.",
    longDescription:
      "This luxury 2-bedroom Goba apartment blends modern interiors with a beautiful garden environment, private swimming pool access, and a dedicated pool table area for guests who want both comfort and entertainment.",
    video: "/videos/goba-drone.mp4",
    media: ["/videos/goba-drone.mp4", "/videos/goba-lastanza.mp4", "/videos/goba-pool.mp4"],
    photos: [
      "/photos/goba-2br-luxury-01.png",
      "/photos/goba-2br-luxury-02.png",
      "/photos/goba-2br-luxury-03.png",
      "/photos/goba-2br-luxury-04.png",
      "/photos/goba-2br-luxury-05.png",
      "/photos/goba-2br-luxury-06.png",
      "/photos/goba-2br-luxury-07.png",
      "/photos/goba-2br-luxury-08.png",
      "/photos/goba-2br-luxury-09.png",
      "/photos/goba-2br-luxury-10.png",
      "/photos/goba-2br-luxury-11.png",
      "/photos/goba-2br-luxury-12.png",
      "/photos/goba-2br-luxury-13.png",
      "/photos/goba-2br-luxury-14.png",
      "/photos/goba-2br-luxury-15.png",
      "/photos/goba-2br-luxury-16.png",
      "/photos/goba-2br-luxury-17.png",
      "/photos/goba-2br-luxury-18.png",
      "/photos/goba-2br-luxury-19.png",
      "/photos/goba-2br-luxury-20.png",
      "/photos/goba-2br-luxury-21.png",
      "/photos/goba-2br-luxury-22.png",
      "/photos/goba-2br-luxury-23.png",
      "/photos/goba-2br-luxury-24.png",
      "/photos/goba-2br-luxury-25.png",
      "/photos/goba-2br-luxury-26.png",
      "/photos/goba-2br-luxury-27.png",
      "/photos/goba-2br-luxury-28.png",
      "/photos/goba-2br-luxury-29.png",
      "/photos/goba-2br-luxury-30.png",
      "/photos/goba-2br-luxury-31.png",
      "/photos/goba-2br-luxury-32.png",
    ],
    features: [
      "2 Bedroom Ensuite",
      "Swimming pool included",
      "Garden setting",
      "Pool table",
      ...COMMON_FEATURES,
    ],
    amenities: withExtras([
      { category: "Scenic views", items: [{ name: "Garden view" }] },
      { category: "Entertainment", items: [{ name: "Pool table" }] },
      { category: "Outdoor", items: [{ name: "Private swimming pool" }, { name: "Sun loungers" }] },
      { category: "Parking and facilities", items: [{ name: "Gated compound" }] },
    ]),
  },
  {
    id: "kijitonyama",
    name: "Kijitonyama Apartment",
    location: "Kijitonyama",
    locationSlug: "kijitonyama",
    bedrooms: 2,
    price: "From $90 / night",
    hasPool: false,
    description:
      "Modern 2-bedroom apartment in the heart of Kijitonyama — close to shops, roads and city life.",
    longDescription:
      "A modern 2-bedroom city apartment steps from Kijitonyama's shops and main roads. Bright, fully furnished and quiet despite the central location.",
    video: "/videos/kijitonyama.mp4",
    media: ["/videos/kijitonyama.mp4"],
    photos: [
      "/photos/kijitonyama-living-tv.jpg",
      "/photos/kijitonyama-living-tv2.jpg",
      "/photos/kijitonyama-living.jpg",
      "/photos/kijitonyama-living-wide.jpg",
      "/photos/kijitonyama-living-dining.jpg",
      "/photos/kijitonyama-kitchen.jpg",
      "/photos/kijitonyama-dining.jpg",
      "/photos/kijitonyama-bed1.jpg",
      "/photos/kijitonyama-bed2.jpg",
      "/photos/kijitonyama-bed3.jpg",
      "/photos/kijitonyama-bed4.jpg",
      "/photos/kijitonyama-hallway.jpg",
      "/photos/kijitonyama-hallway-art.jpg",
      "/photos/kijitonyama-yard.jpg",
      "/photos/kijitonyama-exterior.jpg",
    ],
    features: ["2 Bedroom Apartment", ...COMMON_FEATURES],
    amenities: withExtras(),
  },
  {
    id: "sinza-mapambano",
    name: "Sinza Mapambano Apartment",
    location: "Sinza Mapambano",
    locationSlug: "sinza-mapambano",
    bedrooms: 2,
    price: "From $85 / night",
    hasPool: false,
    description:
      "Stylish, fully furnished 2-bedroom apartment in vibrant Sinza Mapambano with high security.",
    longDescription:
      "Stylish 2-bedroom apartment in vibrant Sinza Mapambano — secured compound, full furnishings, and easy access to everything Sinza is loved for.",
    video: "/videos/sinza.mp4",
    media: ["/videos/sinza.mp4"],
    photos: [
      "/photos/sinza-living2.jpg",
      "/photos/sinza-living1.jpg",
      "/photos/sinza-entry.jpg",
      "/photos/sinza-kitchen.jpg",
      "/photos/sinza-bed1.jpg",
      "/photos/sinza-bed2.jpg",
      "/photos/sinza-bathroom.jpg",
      "/photos/sinza-toilet.jpg",
      "/photos/sinza-laundry.jpg",
      "/photos/sinza-exterior.jpg",
    ],
    features: ["2 Bedroom Apartment", ...COMMON_FEATURES],
    amenities: withExtras(),
  },
  {
    id: "morocco-square",
    name: "Morocco Square Duplex",
    location: "Morocco Square",
    locationSlug: "morocco-square",
    bedrooms: 3,
    price: "From $150 / night",
    hasPool: false,
    description:
      "Spacious 3-bedroom duplex apartment at upscale Morocco Square — ideal for families and groups.",
    longDescription:
      "A spacious 3-bedroom duplex inside the upscale Morocco Square address. Two floors, full kitchen, and elegant living spaces — perfect for families or groups.",
    video: "/videos/morocco.mp4",
    media: ["/videos/morocco.mp4"],
    photos: [
      "/photos/morocco-living.jpg",
      "/photos/morocco-bench.jpg",
      "/photos/morocco-dining.jpg",
      "/photos/morocco-kitchen.jpg",
      "/photos/morocco-master.jpg",
      "/photos/morocco-bed2.jpg",
      "/photos/morocco-bed3.jpg",
      "/photos/morocco-bathroom1.jpg",
      "/photos/morocco-bathroom2.jpg",
      "/photos/morocco-balcony.jpg",
    ],
    features: ["3 Bedroom Duplex", ...COMMON_FEATURES],
    amenities: withExtras([
      { category: "Building", items: [{ name: "Elevator" }, { name: "24/7 concierge" }, { name: "Backup generator" }] },
    ]),
  },
  {
    id: "moshi-town",
    name: "Moshi Town Apartment",
    location: "Moshi Town",
    locationSlug: "moshi-town",
    bedrooms: 3,
    price: "From $130 / night",
    hasPool: false,
    description:
      "Elegant 3-bedroom apartment in Moshi town with views of Kilimanjaro country and full luxury fittings.",
    longDescription:
      "An elegant 3-bedroom apartment in the heart of Moshi town. Wake up to Kilimanjaro country views, then return to a fully equipped luxury home.",
    video: "/videos/moshi.mp4",
    media: ["/videos/moshi.mp4"],
    photos: [
      "/photos/moshi-living1.jpg",
      "/photos/moshi-living2.jpg",
      "/photos/moshi-kitchen1.jpg",
      "/photos/moshi-kitchen2.jpg",
      "/photos/moshi-dining.jpg",
      "/photos/moshi-bed1.jpg",
      "/photos/moshi-bed2.jpg",
      "/photos/moshi-bed3.jpg",
      "/photos/moshi-bed4.jpg",
      "/photos/moshi-laundry.jpg",
    ],
    features: ["3 Bedroom Apartment", ...COMMON_FEATURES],
    amenities: withExtras([
      { category: "Outdoor", items: [{ name: "Mountain views" }] },
    ]),
  },
];

export const WHATSAPP_NUMBER = "255754255552";

export function buildWhatsAppLink(opts: {
  apartment?: string;
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  name?: string;
  phone?: string;
}) {
  const lines = ["Hello Aggiestays! I'd like to book an apartment.", ""];
  if (opts.apartment) lines.push(`Apartment: ${opts.apartment}`);
  if (opts.location) lines.push(`Location: ${opts.location}`);
  if (opts.checkIn) lines.push(`Check-in: ${opts.checkIn}`);
  if (opts.checkOut) lines.push(`Check-out: ${opts.checkOut}`);
  if (opts.guests) lines.push(`Guests: ${opts.guests}`);
  if (opts.name) lines.push(`Name: ${opts.name}`);
  if (opts.phone) lines.push(`Phone: ${opts.phone}`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
