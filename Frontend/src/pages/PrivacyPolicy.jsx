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
import { normalizeContentForDisplay } from '@/utils/contentNormalizer';
import DOMPurify from 'dompurify';

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
              {(() => {
                // Normalize content first
                let contentString = normalizeContentForDisplay(privacyPolicy.content || '');
                
                // Helper to ensure all links open in a new tab with rel
                const ensureLinkAttrs = (html) => {
                  if (!html || typeof html !== 'string') return html;
                  let out = html;
                  // Add target if missing
                  out = out.replace(/<a\s+(?![^>]*\btarget=)/gi, '<a target="_blank" rel="noopener noreferrer" ');
                  // Add rel if missing
                  out = out.replace(/<a\s+([^>]*)(?![^>]*\brel=)/gi, '<a $1 rel="noopener noreferrer" ');
                  return out;
                };

                // Sanitize content on client side only
                let sanitizedContent = contentString;
                if (typeof window !== 'undefined') {
                  try {
                    // Use DOMPurify if available
                    const purify = typeof DOMPurify !== 'undefined' && DOMPurify ? DOMPurify : (window.DOMPurify || null);
                    
                    if (purify && typeof purify.sanitize === 'function') {
                      // More permissive DOMPurify config to preserve TipTap formatting and emojis
                      // KEEP_CONTENT: true ensures all text content including emojis (Unicode characters) is preserved
                      sanitizedContent = purify.sanitize(contentString, {
                        ALLOWED_TAGS: [
                          'p', 'br', 'strong', 'em', 'u', 's', 'strike', 'del', 'ins',
                          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                          'ul', 'ol', 'li',
                          'a', 'img',
                          'blockquote', 'pre', 'code',
                          'div', 'span',
                          'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
                          'b', 'i', 'sub', 'sup', 'small',
                          'hr', 'bdo', 'bdi'
                        ],
                        ALLOWED_ATTR: [
                          'href', 'src', 'alt', 'title', 'class', 'style', 
                          'target', 'width', 'height', 'rel', 'colspan', 'rowspan',
                          'id', 'dir', 'lang', 'align', 'valign'
                        ],
                        ALLOW_DATA_ATTR: false,
                        KEEP_CONTENT: true, // Preserves all text content including emojis and Unicode characters
                        USE_PROFILES: { html: true },
                        RETURN_DOM: false,
                        RETURN_DOM_FRAGMENT: false,
                        RETURN_TRUSTED_TYPE: false,
                        FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form'],
                        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
                        ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
                      });
                      
                      // Fallback to original if sanitization removed everything
                      if (!sanitizedContent || sanitizedContent.trim().length === 0) {
                        sanitizedContent = contentString;
                      }
                    } else {
                      sanitizedContent = contentString;
                    }
                  } catch (error) {
                    console.error('Error sanitizing content:', error);
                    sanitizedContent = contentString;
                  }
                }

                // Enforce target/_blank + rel on links
                sanitizedContent = ensureLinkAttrs(sanitizedContent);
                
                return (
                  <div 
                    className="privacy-block"
                    dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                  />
                );
              })()}
            </ScrollReveal>
          ) : null}
        </div>
      </div>
    </section>
    <Footer navigateTo={navigateTo} />
    </>
  );
}
