import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { APARTMENTS, buildWhatsAppLink } from "@/data/apartments";
import { MapPin, BedDouble, Wifi, Snowflake, Waves, Check, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/apartments/$id")({
  loader: ({ params }) => {
    const apt = APARTMENTS.find((a) => a.id === params.id);
    if (!apt) throw notFound();
    return { apt };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.apt.name} — Aggiestays` },
          { name: "description", content: loaderData.apt.description },
          { property: "og:title", content: `${loaderData.apt.name} — Aggiestays` },
          { property: "og:description", content: loaderData.apt.description },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="container-luxe py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Apartment not found</h1>
      <Link to="/apartments" className="mt-6 inline-block text-gold font-semibold">← Back to apartments</Link>
    </div>
  ),
  component: ApartmentDetail,
});

function ApartmentDetail() {
  const { apt } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const visibleAmenities = showAll ? apt.amenities : apt.amenities.slice(0, 4);

  return (
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

      {/* Gallery */}
      <section className="grid gap-3 md:grid-cols-4 mb-12">
        <div className="md:col-span-3 aspect-video rounded-2xl overflow-hidden bg-muted shadow-soft">
          <video
            key={apt.media[active]}
            src={apt.media[active]}
            controls
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:col-span-1 grid grid-cols-4 md:grid-cols-1 gap-3">
          {apt.media.map((m, i) => (
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

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          {/* Description */}
          <section>
            <h2 className="font-display text-2xl font-bold mb-3">About this apartment</h2>
            <p className="text-foreground/80 leading-relaxed">{apt.longDescription || apt.description}</p>
          </section>

          {/* Highlights */}
          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Highlights</h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {apt.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </section>

          {/* Amenities */}
          <section>
            <div className="flex items-end justify-between mb-6 flex-wrap gap-2">
              <h2 className="font-display text-2xl font-bold">What this place offers</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
              {visibleAmenities.map((group) => (
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
                {showAll ? "Show less" : `Show all ${apt.amenities.reduce((n, g) => n + g.items.length, 0)} amenities`}
              </button>
            )}
          </section>
        </div>

        {/* Booking aside */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 bg-card border border-border/60 rounded-2xl p-6 shadow-luxe">
            <div className="font-display text-xl font-bold">Reserve this apartment</div>
            <p className="text-sm text-muted-foreground mt-2">
              Send your dates instantly via WhatsApp — we'll confirm availability within minutes.
            </p>
            <a
              href={buildWhatsAppLink({ apartment: apt.name, location: apt.location })}
              target="_blank"
              rel="noreferrer"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-gold text-gold-foreground px-4 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition"
            >
              Book on WhatsApp
            </a>
            <div className="mt-5 pt-5 border-t border-border/60 text-xs text-muted-foreground space-y-1.5">
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold" /> Instant confirmation</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold" /> No booking fees</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold" /> Long stays welcome (28+ days)</div>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
