import '@/styles/pages/PrivacyPolicy.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { privacyPolicyAPI } from '@/services/api';
import { setPageContext } from '@/services/fetchInterceptor';

export default function PrivacyPolicy({ navigateTo, currentPage }) {
  // SEO Integration
  useSEO('privacy');

  // Set page context synchronously before any API calls (useLayoutEffect runs before paint)
  useLayoutEffect(() => {
    setPageContext('privacy');
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [privacyPolicy, setPrivacyPolicy] = useState(null);
  const [error, setError] = useState(null);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  // Fetch privacy policy from API
  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchPrivacyPolicy = async () => {
      try {
        const response = await privacyPolicyAPI.getPublic();
        
        // Process data regardless of mount status
        if (response && response.data) {
          // Only update state if component is still mounted
          if (isMounted) {
            setPrivacyPolicy(response.data);
          }
        }
      } catch (err) {
        console.error('Error fetching privacy policy:', err);
        if (isMounted) {
          setError(err.message || 'Failed to load privacy policy');
        }
      }
    };

    fetchPrivacyPolicy();

    // Cleanup function
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="privacy-section" id="privacy">
      <div className="privacy-container">
        <h1 className="section-title">
          <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
            Privacy Policy
          </SplitText>
        </h1>
        {privacyPolicy?.lastUpdated && (
          <ScrollReveal animation="fadeUp" delay={0.1} duration={1.5} ready={!isLoading}>
            <p className="last-updated">
              Last Updated: {formatDate(privacyPolicy.lastUpdated)}
            </p>
          </ScrollReveal>
        )}
        
        <div className="privacy-content">
          {error ? (
            <ScrollReveal animation="fadeUp" delay={0.1} duration={1.5} ready={!isLoading}>
              <div className="privacy-block">
                <p style={{ color: '#ff4444' }}>Error: {error}</p>
                <p>Please try refreshing the page or contact support if the problem persists.</p>
              </div>
            </ScrollReveal>
          ) : privacyPolicy?.content ? (
            <ScrollReveal animation="fadeUp" delay={0.1} duration={1.5} ready={!isLoading}>
              <div 
                className="privacy-block"
                dangerouslySetInnerHTML={{ __html: privacyPolicy.content }}
              />
            </ScrollReveal>
          ) : null}
        </div>
      </div>
    </section>
    <Footer navigateTo={navigateTo} />
    </>
  );
}
