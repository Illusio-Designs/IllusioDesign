import '@/styles/pages/TermsOfService.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';

export default function TermsOfService({ navigateTo, currentPage }) {
  return (
    <>
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <section className="terms-section" id="terms">
      <div className="terms-container">
        <h2>
          <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
            Terms of Service
          </SplitText>
        </h2>
        <ScrollReveal animation="fadeUp" delay={0.1}>
          <p className="last-updated">Last Updated: November 15, 2024</p>
        </ScrollReveal>
        
        <div className="terms-content">
          <ScrollReveal animation="fadeUp" delay={0.1}>
            <div className="terms-block">
            <h3>
              <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                1. Acceptance of Terms
              </SplitText>
            </h3>
            <p>
              By accessing and using the services provided by Illusio Designs, you accept and agree 
              to be bound by these Terms of Service. If you do not agree to these terms, please do 
              not use our services.
            </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.15}>
            <div className="terms-block">
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  2. Services Description
                </SplitText>
              </h3>
            <p>
              Illusio Designs provides design, development, and digital marketing services. The 
              specific scope of services will be outlined in individual project agreements or 
              contracts with clients.
            </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <div className="terms-block">
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  3. Client Responsibilities
                </SplitText>
              </h3>
            <p>Clients agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Respond to requests for information in a timely manner</li>
              <li>Review and approve deliverables within agreed timeframes</li>
              <li>Make payments according to the agreed schedule</li>
              <li>Provide necessary access to systems and resources</li>
            </ul>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.25}>
            <div className="terms-block">
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  4. Payment Terms
                </SplitText>
              </h3>
            <p>
              Payment terms will be specified in individual project agreements. Generally, we require 
              a deposit before work begins, with the balance due upon project completion or according 
              to milestone schedules. Late payments may incur additional fees.
            </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.3}>
            <div className="terms-block">
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  5. Intellectual Property
                </SplitText>
              </h3>
            <p>
              Upon full payment, clients receive ownership of the final deliverables. Illusio Designs 
              retains the right to use project work in portfolios and marketing materials. Any 
              pre-existing intellectual property remains the property of its respective owners.
            </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.35}>
            <div className="terms-block">
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  6. Revisions and Changes
                </SplitText>
              </h3>
            <p>
              Each project includes a specified number of revision rounds. Additional revisions or 
              changes beyond the agreed scope may incur additional charges. Major scope changes will 
              require a new agreement.
            </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.4}>
            <div className="terms-block">
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  7. Project Timeline
                </SplitText>
              </h3>
            <p>
              We strive to meet all agreed deadlines. However, timelines are estimates and may be 
              affected by factors such as client feedback delays, scope changes, or unforeseen 
              circumstances.
            </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.45}>
            <div className="terms-block">
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  8. Confidentiality
                </SplitText>
              </h3>
            <p>
              We respect the confidentiality of client information and will not disclose sensitive 
              information to third parties without permission, except as required by law.
            </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.5}>
            <div className="terms-block">
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  9. Limitation of Liability
                </SplitText>
              </h3>
            <p>
              Illusio Designs shall not be liable for any indirect, incidental, special, or 
              consequential damages arising from the use of our services. Our total liability shall 
              not exceed the amount paid for the specific service in question.
            </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.55}>
            <div className="terms-block">
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  10. Termination
                </SplitText>
              </h3>
            <p>
              Either party may terminate a project agreement with written notice. Upon termination, 
              the client is responsible for payment for all work completed up to the termination date.
            </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.6}>
            <div className="terms-block">
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  11. Governing Law
                </SplitText>
              </h3>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India. 
              Any disputes shall be subject to the exclusive jurisdiction of the courts in Rajkot, 
              Gujarat.
            </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.65}>
            <div className="terms-block">
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  12. Contact Information
                </SplitText>
              </h3>
            <p>
              For questions about these Terms of Service, please contact us at:
              <br />
              Email: info@illusiodesigns.agency
              <br />
              Phone: +91 76000 48416
            </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
    <Footer navigateTo={navigateTo} />
    </>
  );
}
