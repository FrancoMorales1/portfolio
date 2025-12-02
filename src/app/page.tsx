import CoverSection from '@/components/home/CoverSection';
import AboutSection from '@/components/home/AboutSection';
import EducationSection from '@/components/home/EducationSection'
import ProjectsSection from '@/components/home/ProjectsSection';

import ContactSection from '@/components/home/ContactSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div>
      <CoverSection />
      <AboutSection />
      <EducationSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
