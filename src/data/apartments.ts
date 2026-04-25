export type Apartment = {
  id: string;
  name: string;
  location: string;
  locationSlug: string;
  bedrooms: number;
  price: string;
  hasPool: boolean;
  description: string;
  video: string;
  features: string[];
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
    video: "/videos/goba-2br.mp4",
    features: ["2 Bedroom Ensuite", "Swimming pool included", ...COMMON_FEATURES],
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
    video: "/videos/kijitonyama.mp4",
    features: ["2 Bedroom Apartment", ...COMMON_FEATURES],
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
    video: "/videos/sinza.mp4",
    features: ["2 Bedroom Apartment", ...COMMON_FEATURES],
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
    video: "/videos/morocco.mp4",
    features: ["3 Bedroom Duplex", ...COMMON_FEATURES],
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
    video: "/videos/moshi.mp4",
    features: ["3 Bedroom Apartment", ...COMMON_FEATURES],
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
