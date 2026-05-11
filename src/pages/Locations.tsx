import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LOCATIONS, APARTMENTS } from "@/data/apartments";
import { MapPin } from "lucide-react";

export default function LocationsPage() {
  return (
    <>
      <Helmet>
        <title>Locations — Aggiestays</title>
        <meta name="description" content="Apartments across Goba Lastanza, Kijitonyama, Sinza Mapambano, Morocco Square, and Moshi Town." />
      </Helmet>
      <section className="container-luxe py-16">
        <div className="text-center mb-12">
          <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Neighborhoods</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Our Locations</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {LOCATIONS.filter((l) => l.slug !== "all").map((loc) => {
            const count =
              "totalApartments" in loc && typeof loc.totalApartments === "number"
                ? loc.totalApartments
                : APARTMENTS.filter((a) => a.locationSlug === loc.slug).length;
            return (
              <Link
                key={loc.slug}
                to={`/apartments?location=${loc.slug}`}
                className="bg-card border border-border/60 rounded-2xl p-7 card-lift hover:[&]:card-lift-hover hover:border-gold group"
              >
                <div className="flex items-center gap-3 text-gold mb-3">
                  <MapPin className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-wider font-semibold">Tanzania</span>
                </div>
                <h2 className="font-display text-2xl font-bold group-hover:text-gold transition-colors">{loc.name}</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  {count} apartment{count !== 1 ? "s" : ""} available
                </p>
                <div className="mt-5 text-sm font-semibold text-primary group-hover:text-gold">View apartments →</div>
              </Link>
            );
          })}
        </div>

        <div className="mt-20">
          <h3 className="font-display text-2xl font-bold mb-5 text-center">Find Us on the Map</h3>
          <div className="rounded-2xl overflow-hidden shadow-soft border border-border/60 aspect-video">
            <iframe
              title="Aggiestays locations"
              src="https://www.google.com/maps?q=Dar+es+Salaam+Tanzania&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
