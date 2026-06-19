import { useState } from "react";
import { LOCATIONS, APARTMENTS } from "@/data/apartments";
import { ApartmentCard } from "./ApartmentCard";

export function ApartmentGrid({ initial = "all" }: { initial?: string }) {
  const [active, setActive] = useState(initial);
  const filtered = active === "all" ? APARTMENTS : APARTMENTS.filter((a) => a.locationSlug === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {LOCATIONS.map((loc) => {
          const isActive = loc.slug === active;
          return (
            <button
              key={loc.slug}
              onClick={() => setActive(loc.slug)}
              className={
                "px-5 py-2.5 rounded-full text-sm font-medium border transition-all " +
                (isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-soft"
                  : "bg-card text-foreground/75 border-border hover:border-gold hover:text-gold")
              }
            >
              {loc.name}
            </button>
          );
        })}
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((apt) => (
          <ApartmentCard key={apt.id} apt={apt} />
        ))}
      </div>
    </div>
  );
}
