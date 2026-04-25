import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { buildWhatsAppLink, APARTMENTS } from "@/data/apartments";
import { MessageCircle, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Book — Aggiestays" },
      { name: "description", content: "Book your luxury Tanzanian apartment via WhatsApp at +255 754 255 552." },
      { property: "og:title", content: "Contact & Book — Aggiestays" },
      { property: "og:description", content: "Book your luxury Tanzanian apartment via WhatsApp." },
    ],
  }),
  component: ContactPage,
});

const FAQS = [
  { q: "How do I book and pay?", a: "Click any 'Book on WhatsApp' button or send the form. We confirm availability instantly and share payment details (mobile money or bank transfer)." },
  { q: "What's included in the price?", a: "Fully furnished apartment, WiFi, AC in all rooms, kitchen with cookware, washing machine, TV, and parking. Goba Lastanza includes pool access." },
  { q: "What is the minimum stay?", a: "We accept 1-night stays and longer. Discounts apply for weekly and monthly bookings — ask on WhatsApp." },
  { q: "Are pets and parties allowed?", a: "Quiet enjoyment is required. No parties. Pets only by prior arrangement." },
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", checkIn: "", checkOut: "", guests: "2", apartment: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const apt = APARTMENTS.find((a) => a.id === form.apartment);
    window.open(buildWhatsAppLink({
      name: form.name, phone: form.phone, checkIn: form.checkIn,
      checkOut: form.checkOut, guests: form.guests,
      apartment: apt?.name, location: apt?.location,
    }), "_blank");
  };

  return (
    <>
      <section className="container-luxe py-16 grid gap-12 lg:grid-cols-2">
        <div>
          <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Get in touch</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Book Your Stay</h1>
          <p className="text-muted-foreground mt-4 max-w-md">
            Send us your dates and we'll confirm availability on WhatsApp within minutes.
          </p>

          <div className="mt-10 space-y-5">
            <a href="https://wa.me/255754255552" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-5 bg-card border border-border/60 rounded-2xl card-lift hover:[&]:card-lift-hover">
              <div className="w-12 h-12 rounded-full bg-whatsapp/15 text-whatsapp flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</div>
                <div className="font-semibold">+255 754 255 552</div>
              </div>
            </a>
            <a href="tel:+255754255552" className="flex items-center gap-4 p-5 bg-card border border-border/60 rounded-2xl card-lift hover:[&]:card-lift-hover">
              <div className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Call</div>
                <div className="font-semibold">+255 754 255 552</div>
              </div>
            </a>
            <div className="flex items-center gap-4 p-5 bg-card border border-border/60 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Locations</div>
                <div className="font-semibold">Dar es Salaam · Moshi</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="bg-card border border-border/60 rounded-2xl p-8 shadow-soft space-y-5 h-fit">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your Name">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
            </Field>
            <Field label="Phone">
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
            </Field>
            <Field label="Check-in">
              <input required type="date" value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} className="input" />
            </Field>
            <Field label="Check-out">
              <input required type="date" value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} className="input" />
            </Field>
            <Field label="Guests">
              <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="input">
                {[1,2,3,4,5,6,7,8].map(n => <option key={n}>{n}</option>)}
              </select>
            </Field>
            <Field label="Apartment">
              <select value={form.apartment} onChange={(e) => setForm({ ...form, apartment: e.target.value })} className="input">
                <option value="">Any</option>
                {APARTMENTS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </Field>
          </div>
          <button type="submit" className="w-full bg-whatsapp text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition inline-flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" /> Send via WhatsApp
          </button>
        </form>
      </section>

      <section className="container-luxe pb-20">
        <div className="text-center mb-10">
          <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">FAQ</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">Common Questions</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="bg-card border border-border/60 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold"
              >
                {f.q}
                <span className="text-gold text-xl">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <style>{`.input { width:100%; background:transparent; border:1px solid var(--color-border); border-radius:0.625rem; padding:0.65rem 0.85rem; font-size:0.9rem; }
      .input:focus { outline:none; border-color: var(--color-gold); }`}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">{label}</span>
      {children}
    </label>
  );
}
