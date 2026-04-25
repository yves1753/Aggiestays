import { useState } from "react";
import { buildWhatsAppLink } from "@/data/apartments";

export function BookingBar() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(buildWhatsAppLink({ checkIn, checkOut, guests }), "_blank");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-card rounded-2xl shadow-luxe p-5 md:p-6 grid gap-4 md:grid-cols-4 border border-border/60"
    >
      <div className="flex flex-col">
        <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Check-in</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="bg-transparent border-b border-border py-2 text-sm font-medium focus:outline-none focus:border-gold"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Check-out</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="bg-transparent border-b border-border py-2 text-sm font-medium focus:outline-none focus:border-gold"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Guests</label>
        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="bg-transparent border-b border-border py-2 text-sm font-medium focus:outline-none focus:border-gold"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-primary text-primary-foreground rounded-xl py-3 font-semibold hover:bg-primary/90 transition"
      >
        Check Availability
      </button>
    </form>
  );
}
