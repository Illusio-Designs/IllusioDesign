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
import { toSlug } from '@/utils/urlSlug';

export default function Career({ navigateTo, currentPage }) {
  // SEO Integration
  useSEO('career');

  // Set page context synchronously before any API calls (useLayoutEffect runs before paint)
  useLayoutEffect(() => {
    setPageContext('career');
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [positions, setPositions] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchPositions = async () => {
      try {
        const result = await positionAPI.getAllPublic();
        
        // Process data regardless of mount status
        if (result.data) {
          // Only update state if component is still mounted
          if (isMounted) {
            setPositions(result.data);
            setDataLoaded(true);
            // If loader animation is done, hide it
            if (!isLoading) {
              setIsLoading(false);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching positions:', error);
        if (isMounted) {
          toast.error('Failed to load positions. Please try again later.');
          setDataLoaded(true);
          if (!isLoading) {
            setIsLoading(false);
          }
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
    // Only hide loader when data is loaded
    if (dataLoaded) {
      setIsLoading(false);
    }
  };

  // Hide loader when data is loaded
  useEffect(() => {
    if (dataLoaded && !isLoading) {
      setIsLoading(false);
    }
  }, [dataLoaded, isLoading]);

  const handleApply = (positionTitle) => {
    const slug = toSlug(positionTitle);
    navigateTo('position-apply', slug);
  };

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      {!isLoading && (
        <>
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
            {!dataLoaded ? (
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
                      onClick={() => handleApply(position.title)}
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
      )}
    </>
  );
}
