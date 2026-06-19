import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="container-luxe py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl font-bold mb-3">Aggiestays</div>
          <p className="text-primary-foreground/70 max-w-sm text-sm leading-relaxed">
            Premium fully-furnished apartments across Dar es Salaam and Moshi.
            Book instantly via WhatsApp — keys ready when you arrive.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3 text-gold">Explore</div>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/locations" className="hover:text-gold">Locations</Link></li>
            <li><Link to="/apartments" className="hover:text-gold">Apartments</Link></li>
            <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3 text-gold">Contact</div>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li>WhatsApp: <a className="hover:text-gold" href="https://wa.me/255754255552">+255 754 255 552</a></li>
            <li>Tanzania · Dar es Salaam · Moshi</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/50">
        © {new Date().getFullYear()} Aggiestays. All rights reserved.
      </div>
    </footer>
  );
}
