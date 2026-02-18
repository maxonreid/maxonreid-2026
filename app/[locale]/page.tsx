import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/home/HeroSection';
import WorkSection from '../components/home/WorkSection';
import AboutSection from '../components/home/AboutSection';
import BlogSection from '../components/home/BlogSection';
import ServicesSection from '../components/home/ServicesSection';
import ContactSection from '../components/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <BlogSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}