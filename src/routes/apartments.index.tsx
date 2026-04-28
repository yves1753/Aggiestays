import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { ApartmentGrid } from "@/components/ApartmentGrid";

const searchSchema = z.object({
  location: fallback(z.string(), "all").default("all"),
});

export const Route = createFileRoute("/apartments/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Apartments — Aggiestays" },
      { name: "description", content: "Browse all luxury apartments across Dar es Salaam and Moshi. Filter by location." },
      { property: "og:title", content: "Apartments — Aggiestays" },
      { property: "og:description", content: "Browse all luxury apartments across Dar es Salaam and Moshi." },
    ],
  }),
  component: ApartmentsPage,
});

function ApartmentsPage() {
  const { location } = Route.useSearch();
  return (
    <section className="container-luxe py-16">
      <div className="text-center mb-10">
        <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Stays</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">All Apartments</h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Filter by neighborhood. Each apartment is fully furnished, secure, and book-ready.
        </p>
      </div>
      <ApartmentGrid initial={location} />
    </section>
  );
}
