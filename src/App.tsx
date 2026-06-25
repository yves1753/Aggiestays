import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "@/pages/Index";

const ApartmentsPage = lazy(() => import("@/pages/Apartments"));
const ApartmentDetail = lazy(() => import("@/pages/ApartmentDetail"));
const GalleryPage = lazy(() => import("@/pages/Gallery"));
const LocationsPage = lazy(() => import("@/pages/Locations"));
const ContactPage = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const Fallback = () => <div className="container-luxe py-20 text-center text-muted-foreground">Loading…</div>;

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Index />} />
        <Route
          path="apartments"
          element={<Suspense fallback={<Fallback />}><ApartmentsPage /></Suspense>}
        />
        <Route
          path="apartments/:id"
          element={<Suspense fallback={<Fallback />}><ApartmentDetail /></Suspense>}
        />
        <Route
          path="gallery"
          element={<Suspense fallback={<Fallback />}><GalleryPage /></Suspense>}
        />
        <Route
          path="locations"
          element={<Suspense fallback={<Fallback />}><LocationsPage /></Suspense>}
        />
        <Route
          path="contact"
          element={<Suspense fallback={<Fallback />}><ContactPage /></Suspense>}
        />
        <Route
          path="*"
          element={<Suspense fallback={<Fallback />}><NotFound /></Suspense>}
        />
      </Route>
    </Routes>
  );
}
