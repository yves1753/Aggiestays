import { useState } from "react";
import { Link } from "react-router-dom";
import { Wifi, Snowflake, Waves, BedDouble, MapPin } from "lucide-react";
import { type Apartment, buildWhatsAppLink } from "@/data/apartments";

export function ApartmentCard({ apt }: { apt: Apartment }) {
  const [hover, setHover] = useState(false);

  const detailHref = `/apartments/${apt.id}`;

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group bg-card rounded-2xl overflow-hidden shadow-soft card-lift hover:[&]:card-lift-hover border border-border/60"
      style={{ animation: "var(--animate-fade-up)" }}
    >
      <Link to={detailHref} className="block relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={apt.photos?.[0] || "/placeholder.svg"}
          alt={apt.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-primary/85 backdrop-blur text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
          <MapPin className="w-3.5 h-3.5" /> {apt.location}
        </div>
        {!hover && (
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none" />
        )}
      </Link>
      <div className="p-6">
        <Link to={detailHref} className="block">
          <h3 className="font-display text-xl font-bold text-foreground hover:text-gold transition-colors">{apt.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{apt.description}</p>
        <div className="flex flex-wrap gap-3 mt-5 text-xs text-foreground/70">
          <span className="inline-flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-gold" />{apt.bedrooms} BR</span>
          <span className="inline-flex items-center gap-1.5"><Wifi className="w-4 h-4 text-gold" />WiFi</span>
          <span className="inline-flex items-center gap-1.5"><Snowflake className="w-4 h-4 text-gold" />AC</span>
          {apt.hasPool && (
            <span className="inline-flex items-center gap-1.5"><Waves className="w-4 h-4 text-gold" />Pool</span>
          )}
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <Link
            to={detailHref}
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition"
          >
            View details & amenities
          </Link>
          <a
            href={buildWhatsAppLink({ apartment: apt.name, location: apt.location })}
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-gold text-gold-foreground px-4 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition"
          >
            Book on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
