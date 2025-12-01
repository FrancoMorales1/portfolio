import CoverSection from '@/components/home/CoverSection';
import AboutSection from '@/components/home/AboutSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import ContactSection from '@/components/home/ContactSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div>
      <CoverSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
