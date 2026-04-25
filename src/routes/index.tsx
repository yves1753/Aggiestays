import { createFileRoute, Link } from "@tanstack/react-router";
import { BookingBar } from "@/components/BookingBar";
import { ApartmentGrid } from "@/components/ApartmentGrid";
import { LOCATIONS, APARTMENTS, buildWhatsAppLink } from "@/data/apartments";
import heroImg from "@/assets/hero-exterior.jpg";
import { Star, ShieldCheck, Wifi, Waves } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aggiestays — Luxury Apartments in Dar es Salaam & Moshi" },
      { name: "description", content: "Book fully-furnished luxury apartments across Tanzania. Pools, AC, WiFi. Instant WhatsApp booking." },
      { property: "og:title", content: "Aggiestays — Luxury Apartments in Tanzania" },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = APARTMENTS.slice(0, 3);
  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/70 to-primary/90" />
        <div className="relative container-luxe pt-24 pb-40 md:pt-32 md:pb-48">
          <div className="max-w-3xl" style={{ animation: "var(--animate-fade-up)" }}>
            <span className="inline-block text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              Tanzania · Dar es Salaam · Moshi
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-[1.05]">
              Your Gateway to <em className="text-gold not-italic">Exquisite</em> Tanzanian Living
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-xl leading-relaxed">
              Discover unparalleled luxury apartments crafted for comfort and style — fully furnished, instantly bookable.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/apartments"
                className="bg-gold text-gold-foreground px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition shadow-luxe"
              >
                View Apartments
              </Link>
              <a
                href={buildWhatsAppLink({})}
                target="_blank"
                rel="noreferrer"
                className="bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/30 backdrop-blur px-8 py-3.5 rounded-full font-semibold hover:bg-primary-foreground/20 transition"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING BAR */}
      <section className="container-luxe -mt-24 relative z-10">
        <BookingBar />
      </section>

      {/* LOCATIONS QUICK FILTER */}
      <section className="container-luxe py-20">
        <div className="text-center mb-12">
          <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Locations</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Find Your Stay</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {LOCATIONS.filter((l) => l.slug !== "all").map((loc) => (
            <Link
              key={loc.slug}
              to="/apartments"
              search={{ location: loc.slug }}
              className="group bg-card border border-border/60 rounded-2xl p-6 text-center card-lift hover:[&]:card-lift-hover hover:border-gold"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold/15 text-gold flex items-center justify-center font-display text-lg font-bold">
                {loc.name.charAt(0)}
              </div>
              <div className="font-semibold text-foreground group-hover:text-gold transition-colors">{loc.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED APARTMENTS */}
      <section className="container-luxe pb-20">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Featured</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Signature Residences</h2>
          </div>
          <Link to="/apartments" className="text-sm font-semibold text-gold hover:underline">
            View all apartments →
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((apt) => (
            <ApartmentCard key={apt.id} apt={apt} />
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-secondary/40 py-20">
        <div className="container-luxe grid gap-10 md:grid-cols-4 text-center">
          {[
            { icon: ShieldCheck, label: "High Security", desc: "Gated, monitored neighborhoods" },
            { icon: Wifi, label: "Always Connected", desc: "Fast WiFi in every unit" },
            { icon: Waves, label: "Pool Options", desc: "Swimming pool at Goba Lastanza" },
            { icon: Star, label: "Five-star comfort", desc: "King beds, AC, full kitchen" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <div className="font-display font-bold text-lg">{label}</div>
              <p className="text-sm text-muted-foreground mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-luxe py-20">
        <div className="text-center mb-12">
          <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Guest Stories</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">What Guests Say</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: "Amani K.", text: "The Goba apartment with the pool felt like a private resort. Spotless, beautifully furnished.", rating: 5 },
            { name: "Sarah M.", text: "Stayed at Morocco Square — the duplex was huge and the WhatsApp booking was seamless.", rating: 5 },
            { name: "James O.", text: "Quiet, secure, and walkable to everything in Kijitonyama. We'll be back.", rating: 5 },
          ].map((t) => (
            <div key={t.name} className="bg-card border border-border/60 rounded-2xl p-7 shadow-soft">
              <div className="flex gap-1 text-gold mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-foreground/85 leading-relaxed">"{t.text}"</p>
              <div className="mt-5 text-sm font-semibold text-primary">— {t.name}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
