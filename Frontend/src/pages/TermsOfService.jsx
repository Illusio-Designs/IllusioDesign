import '@/styles/pages/TermsOfService.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import Loader from '@/components/Loader';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { termsOfServiceAPI } from '@/services/api';
import { setPageContext } from '@/services/fetchInterceptor';

export default function TermsOfService({ navigateTo, currentPage }) {
  // SEO Integration
  useSEO('terms');

  // Set page context synchronously before any API calls (useLayoutEffect runs before paint)
  useLayoutEffect(() => {
    setPageContext('terms');
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [termsOfService, setTermsOfService] = useState(null);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  // Fetch terms of service from API
  useEffect(() => {
    // Prevent double API calls (React StrictMode in development)
    if (hasFetched.current) return;
    hasFetched.current = true;

    let isMounted = true;
    const abortController = new AbortController();

    const fetchTermsOfService = async () => {
      try {
        const response = await termsOfServiceAPI.getPublic();
        
        // Check if component is still mounted before updating state
        if (!isMounted) return;
        
        if (response && response.data) {
          setTermsOfService(response.data);
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Error fetching terms of service:', err);
        setError(err.message || 'Failed to load terms of service');
      }
    };

    fetchTermsOfService();

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
      <section className="terms-section" id="terms">
      <div className="terms-container">
        <h1 className="section-title">
          <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
            Terms of Service
          </SplitText>
        </h1>
        {termsOfService?.lastUpdated && (
          <ScrollReveal animation="fadeUp" delay={0.1} duration={1.5} ready={!isLoading}>
            <p className="last-updated">
              Last Updated: {formatDate(termsOfService.lastUpdated)}
            </p>
          </ScrollReveal>
        )}
        
        <div className="terms-content">
          {error ? (
            <ScrollReveal animation="fadeUp" delay={0.1} duration={1.5} ready={!isLoading}>
              <div className="terms-block">
                <p style={{ color: '#ff4444' }}>Error: {error}</p>
                <p>Please try refreshing the page or contact support if the problem persists.</p>
              </div>
            </ScrollReveal>
          ) : termsOfService?.content ? (
            <ScrollReveal animation="fadeUp" delay={0.1} duration={1.5} ready={!isLoading}>
              <div 
                className="terms-block"
                dangerouslySetInnerHTML={{ __html: termsOfService.content }}
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
