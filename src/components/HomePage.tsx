import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import GoogleAnalytics from "./GoogleAnalytics";
import Location from "./Location";
import Navbar from "./Navbar";
import OurProfessionalsCarousel from "./OurProfessionalsCarousel";
import OurServices from "./OurServices";
import { ScrollToTop } from "./ScrollToTop";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <AboutUs />
      <OurProfessionalsCarousel />
      <OurServices />
      <ContactUs />
      <Location />
      <Footer />
      <ScrollToTop />
    </>
  );
}
