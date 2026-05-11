import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { APARTMENTS, buildWhatsAppLink } from "@/data/apartments";
import { MapPin, BedDouble, Wifi, Snowflake, Waves, Check, ArrowLeft } from "lucide-react";

type PhotoGroup = {
  title: string;
  photos: { src: string; index: number }[];
};

const PHOTO_GROUP_RULES: { title: string; keywords: string[] }[] = [
  { title: "Living room", keywords: ["living", "lounge", "sofa", "tv-room", "sitting"] },
  { title: "Kitchen", keywords: ["kitchen", "dining", "island", "sink", "fridge"] },
  { title: "Bedroom", keywords: ["bed", "bedroom", "master"] },
  { title: "Bathroom", keywords: ["bath", "bathroom", "toilet", "shower", "washroom"] },
  { title: "Exterior", keywords: ["exterior", "outside", "entrance", "garden", "balcony", "patio", "veranda", "yard", "drone"] },
  { title: "Pool area", keywords: ["pool", "loungers", "poolside"] },
];

function buildPhotoGroups(photos: string[], hasPool: boolean): PhotoGroup[] {
  const grouped = new Map<string, { src: string; index: number }[]>();
  const order = PHOTO_GROUP_RULES.map((rule) => rule.title);

  photos.forEach((src, index) => {
    const name = src.toLowerCase();
    const matched = PHOTO_GROUP_RULES.find((rule) => rule.keywords.some((kw) => name.includes(kw)));
    const title = matched ? matched.title : "Additional";
    if (!grouped.has(title)) grouped.set(title, []);
    grouped.get(title)!.push({ src, index });
  });

  const preferredOrder = hasPool ? [...order, "Additional"] : order.filter((title) => title !== "Pool area").concat("Additional");

  return preferredOrder
    .filter((title) => grouped.has(title))
    .map((title) => ({ title, photos: grouped.get(title)! }));
}

function ApartmentBookingForm({ apartment, location }: { apartment: string; location: string }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(buildWhatsAppLink({ checkIn, checkOut, guests, apartment, location }), "_blank");
  };

  return (
    <form onSubmit={submit} className="mt-5 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Check-in</label>
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="bg-transparent border-b border-border py-1.5 text-sm font-medium focus:outline-none focus:border-gold" />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Check-out</label>
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="bg-transparent border-b border-border py-1.5 text-sm font-medium focus:outline-none focus:border-gold" />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Guests</label>
        <select value={guests} onChange={(e) => setGuests(e.target.value)} className="bg-transparent border-b border-border py-1.5 text-sm font-medium focus:outline-none focus:border-gold">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-gold text-gold-foreground px-4 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition">
        Book on WhatsApp
      </button>
    </form>
  );
}

export default function ApartmentDetail() {
  const { id } = useParams<{ id: string }>();
  const apt = APARTMENTS.find((a) => a.id === id);
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);

  if (!apt) {
    return (
      <div className="container-luxe py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Apartment not found</h1>
        <Link to="/apartments" className="mt-6 inline-block text-gold font-semibold">← Back to apartments</Link>
      </div>
    );
  }

  const visibleAmenities = showAll ? apt.amenities : apt.amenities.slice(0, 4);
  const photoGroups = apt.photos ? buildPhotoGroups(apt.photos, apt.hasPool) : [];

  return (
    <>
      <Helmet>
        <title>{`${apt.name} — Aggiestays`}</title>
        <meta name="description" content={apt.description} />
      </Helmet>
      <article className="container-luxe py-10 md:py-14">
        <Link to="/apartments" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to apartments
        </Link>

        <header className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-gold text-xs font-semibold tracking-[0.2em] uppercase">
            <MapPin className="w-3.5 h-3.5" /> {apt.location}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">{apt.name}</h1>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-foreground/70">
            <span className="inline-flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-gold" />{apt.bedrooms} Bedrooms</span>
            <span className="inline-flex items-center gap-1.5"><Wifi className="w-4 h-4 text-gold" />WiFi</span>
            <span className="inline-flex items-center gap-1.5"><Snowflake className="w-4 h-4 text-gold" />AC</span>
            {apt.hasPool && <span className="inline-flex items-center gap-1.5"><Waves className="w-4 h-4 text-gold" />Private Pool</span>}
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-4 mb-12">
          <div className="md:col-span-3 aspect-video rounded-2xl overflow-hidden bg-muted shadow-soft">
            <video key={apt.media[active]} src={apt.media[active]} controls autoPlay muted playsInline className="w-full h-full object-cover" />
          </div>
          <div className="md:col-span-1 grid grid-cols-4 md:grid-cols-1 gap-3">
            {apt.media.map((m: string, i: number) => (
              <button
                key={m}
                onClick={() => setActive(i)}
                className={
                  "aspect-video rounded-xl overflow-hidden bg-muted border-2 transition " +
                  (i === active ? "border-gold" : "border-transparent hover:border-border")
                }
              >
                <video src={m} muted playsInline preload="metadata" className="w-full h-full object-cover pointer-events-none" />
              </button>
            ))}
          </div>
        </section>

        {apt.photos && apt.photos.length > 0 && (
          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold mb-4">Photos</h2>
            <div className="space-y-8">
              {photoGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    {group.title} ({group.photos.length})
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {group.photos.map(({ src, index }) => (
                      <a
                        key={src}
                        href={src}
                        target="_blank"
                        rel="noreferrer"
                        className="block aspect-[4/3] rounded-2xl overflow-hidden bg-muted shadow-soft group"
                      >
                        <img
                          src={src}
                          alt={`${apt.name} ${group.title} photo ${index + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="font-display text-2xl font-bold mb-3">About this apartment</h2>
              <p className="text-foreground/80 leading-relaxed">{apt.longDescription || apt.description}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">Highlights</h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {apt.features.map((f: string) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
                    <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <div className="flex items-end justify-between mb-6 flex-wrap gap-2">
                <h2 className="font-display text-2xl font-bold">What this place offers</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
                {visibleAmenities.map((group: { category: string; items: { name: string; note?: string }[] }) => (
                  <div key={group.category}>
                    <h3 className="font-semibold text-foreground mb-3">{group.category}</h3>
                    <ul className="space-y-2.5">
                      {group.items.map((it) => (
                        <li key={it.name} className="text-sm">
                          <div className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                            <span className="text-foreground/85">{it.name}</span>
                          </div>
                          {it.note && (
                            <p className="text-xs text-muted-foreground mt-1 ml-6 leading-relaxed">{it.note}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {apt.amenities.length > 4 && (
                <button
                  onClick={() => setShowAll((v) => !v)}
                  className="mt-8 inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-foreground/30 text-sm font-semibold hover:border-gold hover:text-gold transition"
                >
                  {showAll ? "Show less" : `Show all ${apt.amenities.reduce((n: number, g: { items: unknown[] }) => n + g.items.length, 0)} amenities`}
                </button>
              )}
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 bg-card border border-border/60 rounded-2xl p-6 shadow-luxe">
              <div className="font-display text-xl font-bold">Reserve this apartment</div>
              <p className="text-sm text-muted-foreground mt-2">
                Pick your dates and we'll confirm availability via WhatsApp within minutes.
              </p>
              <ApartmentBookingForm apartment={apt.name} location={apt.location} />
              <div className="mt-5 pt-5 border-t border-border/60 text-xs text-muted-foreground space-y-1.5">
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold" /> Instant confirmation</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold" /> No booking fees</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold" /> Long stays welcome (28+ days)</div>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
