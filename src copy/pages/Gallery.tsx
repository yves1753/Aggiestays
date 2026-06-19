import { useState } from "react";
import { Helmet } from "react-helmet-async";

const MEDIA = [
  { type: "video", src: "/videos/goba-drone.mp4", title: "Goba Lastanza · Aerial" },
  { type: "video", src: "/videos/goba-pool.mp4", title: "Goba Lastanza · Pool" },
  { type: "video", src: "/videos/goba-2br.mp4", title: "Goba 2BR Ensuite" },
  { type: "video", src: "/videos/goba-lastanza.mp4", title: "Goba Lastanza Tour" },
  { type: "video", src: "/videos/kijitonyama.mp4", title: "Kijitonyama 2BR" },
  { type: "video", src: "/videos/sinza.mp4", title: "Sinza Mapambano 2BR" },
  { type: "video", src: "/videos/morocco.mp4", title: "Morocco Square Duplex" },
  { type: "video", src: "/videos/moshi.mp4", title: "Moshi Town 3BR" },
];

export default function GalleryPage() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <>
      <Helmet>
        <title>Gallery — Aggiestays</title>
        <meta name="description" content="Tour our luxury apartments through immersive video walkthroughs." />
      </Helmet>
      <section className="container-luxe py-16">
        <div className="text-center mb-12">
          <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Visual Tour</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Gallery</h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Step inside every apartment with full video walkthroughs.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MEDIA.map((m) => (
            <button
              key={m.src}
              onClick={() => setActive(m.src)}
              className="group relative aspect-video rounded-2xl overflow-hidden bg-muted card-lift hover:[&]:card-lift-hover border border-border/60"
            >
              <img
                src="/photos/goba-1br-01.png"
                alt={m.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-left text-primary-foreground font-semibold">
                {m.title}
              </div>
            </button>
          ))}
        </div>

        {active && (
          <div onClick={() => setActive(null)} className="fixed inset-0 z-50 bg-primary/95 backdrop-blur flex items-center justify-center p-4 animate-fade-in">
            <video src={active} controls preload="none" className="max-w-5xl w-full max-h-[85vh] rounded-2xl shadow-luxe" onClick={(e) => e.stopPropagation()} />
            <button onClick={() => setActive(null)} className="absolute top-6 right-6 text-primary-foreground text-3xl" aria-label="Close">×</button>
          </div>
        )}
      </section>
    </>
  );
}
