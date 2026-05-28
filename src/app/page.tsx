import CoverSection from '@/components/home/CoverSection';
import AboutSection from '@/components/home/AboutSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import EducationSection from '@/components/home/EducationSection';
import ProjectsSection from '@/components/home/ProjectsSection';

export default function Home() {
  return (
    <div>
      <CoverSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
    </div>
  );
}
