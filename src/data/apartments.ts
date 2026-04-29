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
  { slug: "goba-lastanza", name: "Goba Lastanza" },
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
    features: ["2 Bedroom Ensuite", "Swimming pool included", ...COMMON_FEATURES],
    amenities: withExtras([
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
      "/photos/kijitonyama-living.jpg",
      "/photos/kijitonyama-kitchen.jpg",
      "/photos/kijitonyama-dining.jpg",
      "/photos/kijitonyama-bed1.jpg",
      "/photos/kijitonyama-bed2.jpg",
      "/photos/kijitonyama-bed3.jpg",
      "/photos/kijitonyama-bed4.jpg",
      "/photos/kijitonyama-hallway.jpg",
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
