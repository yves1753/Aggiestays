import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ApartmentGrid } from "@/components/ApartmentGrid";

export default function ApartmentsPage() {
  const [params] = useSearchParams();
  const location = params.get("location") || "all";
  return (
    <>
      <Helmet>
        <title>Apartments — Aggiestays</title>
        <meta name="description" content="Browse all luxury apartments across Dar es Salaam and Moshi. Filter by location." />
      </Helmet>
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
    </>
  );
}
