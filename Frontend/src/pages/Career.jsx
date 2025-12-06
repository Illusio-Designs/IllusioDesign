import '@/styles/pages/Career.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { positionAPI } from '@/services/api';
import { setPageContext } from '@/services/fetchInterceptor';
import { toast } from 'react-toastify';

export default function Career({ navigateTo, currentPage }) {
  // SEO Integration
  useSEO('career');

  // Set page context synchronously before any API calls (useLayoutEffect runs before paint)
  useLayoutEffect(() => {
    setPageContext('career');
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [positions, setPositions] = useState([]);
  const [loadingPositions, setLoadingPositions] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchPositions = async () => {
      try {
        if (isMounted) {
          setLoadingPositions(true);
        }
        const result = await positionAPI.getAllPublic();
        
        // Process data regardless of mount status
        if (result.data) {
          // Only update state if component is still mounted
          if (isMounted) {
            setPositions(result.data);
          }
        }
      } catch (error) {
        console.error('Error fetching positions:', error);
        if (isMounted) {
          toast.error('Failed to load positions. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setLoadingPositions(false);
        }
      }
    };

    fetchPositions();

    // Cleanup function
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  const handleApply = (positionId) => {
    navigateTo('position-apply', positionId);
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
            {loadingPositions ? (
              <div className="loading-positions">Loading positions...</div>
            ) : positions.length === 0 ? (
              <div className="no-positions">No positions available at the moment.</div>
            ) : (
              positions.map((position, index) => (
                <ScrollReveal
                  key={position.id}
                  as="div"
                  className="job-card"
                  animation="slideUp"
                  delay={0.1 + index * 0.05}
                  duration={1.5}
                  once={false}
                  ready={!isLoading}
                >
                  <h3 className="job-title">{position.title}</h3>
                  <p className="job-description">
                    {position.description || 'Join our team and make a difference!'}
                  </p>
                  <div className="job-buttons">
                    {position.location && (
                      <button className="job-info-button">{position.location}</button>
                    )}
                    {position.type && (
                      <button className="job-info-button">{position.type}</button>
                    )}
                    <button 
                      className="apply-button"
                      onClick={() => handleApply(position.id)}
                    >
                      Apply Now
                    </button>
                  </div>
                </ScrollReveal>
              ))
            )}
          </div>
        </div>
      </section>
      <Footer navigateTo={navigateTo} />
    </>
  );
}
