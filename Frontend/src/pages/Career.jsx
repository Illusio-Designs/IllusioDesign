import '@/styles/pages/Career.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import { useState } from 'react';

const jobListings = [
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a',
    position: '1 Position',
    workType: 'Work From Office',
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a',
    position: '1 Positions',
    workType: 'Work From Office',
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a',
    position: '1 Position',
    workType: 'Work From Office',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Specialist',
    description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a',
    position: '1 Position',
    workType: 'Work From Office',
  },
];

export default function Career({ navigateTo, currentPage }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  const handleApply = (jobId) => {
    navigateTo('position-apply', jobId);
  };

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="career-section" id="career">
        <div className="career-container">
          <ScrollReveal as="div" animation="fadeUp" duration={1.5} once={false} ready={!isLoading}>
            <h1 className="section-title">
              <SplitText
                as="span"
                splitBy="words"
                animation="fadeUp"
                delay={0.05}
                trigger="onScroll"
                once={false}
              >
                Unleash Your Talent
              </SplitText>
              <SplitText
                as="span"
                splitBy="words"
                animation="fadeUp"
                delay={0.05}
                trigger="onScroll"
                once={false}
              >
                with Illusio
              </SplitText>
            </h1>
          </ScrollReveal>
          <div className="job-listings">
            {jobListings.map((job, index) => (
              <ScrollReveal
                key={job.id}
                as="div"
                className="job-card"
                animation="slideUp"
                delay={0.1 + index * 0.05}
                duration={1.5}
                once={false}
                ready={!isLoading}
              >
                <h3 className="job-title">{job.title}</h3>
                <p className="job-description">{job.description}</p>
                <div className="job-buttons">
                  <button className="job-info-button">{job.position}</button>
                  <button className="job-info-button">{job.workType}</button>
                  <button 
                    className="apply-button"
                    onClick={() => handleApply(job.id)}
                  >
                    Apply Now
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
