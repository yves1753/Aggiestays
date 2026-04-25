import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.jpg";

const NAV = [
  { to: "/locations" as const, label: "Locations" },
  { to: "/apartments" as const, label: "Apartments" },
  { to: "/gallery" as const, label: "Gallery" },
  { to: "/contact" as const, label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border/60">
      <div className="container-luxe flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Aggiestays logo"
            className="w-10 h-10 rounded-full object-cover ring-1 ring-primary/20"
          />
          <span className="font-display text-xl font-bold tracking-tight text-primary">
            Aggiestays
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-foreground/75 hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          href="https://wa.me/255754255552"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-2 bg-gold text-gold-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition"
        >
          Book Now
        </a>
      </div>
    </header>
  );
}
