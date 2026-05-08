import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "@/pages/Index";
import ApartmentsPage from "@/pages/Apartments";
import ApartmentDetail from "@/pages/ApartmentDetail";
import GalleryPage from "@/pages/Gallery";
import LocationsPage from "@/pages/Locations";
import ContactPage from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="apartments" element={<ApartmentsPage />} />
        <Route path="apartments/:id" element={<ApartmentDetail />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="locations" element={<LocationsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
