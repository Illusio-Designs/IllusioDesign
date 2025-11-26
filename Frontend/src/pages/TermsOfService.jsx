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
        <h1 className="section-title">
          <SplitText splitBy="words" animation="fadeUp" delay={0.1} trigger="onScroll" as="span">
            Terms of Service
          </SplitText>
        </h1>
        <ScrollReveal animation="fadeUp" delay={0.1} duration={2.0}>
          <p className="last-updated">Last Updated: November 15, 2024</p>
        </ScrollReveal>
        
        <div className="terms-content">
          <ScrollReveal animation="fadeUp" delay={0.1} duration={2.0}>
            <div className="terms-block">
            <h3>
              <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                Definitions
              </SplitText>
            </h3>
            <p>
              <strong>&quot;Illusio Designs&quot;</strong> (or &quot;we&quot; or &quot;us&quot;): refers to Illusio Designs, a development and design agency, including its officers, directors, employees, agents, and affiliates.
            </p>
            <p>
              <strong>&quot;Website&quot;</strong>: refers to Illusio Designs&apos; website located at illusiodesigns.agency, including any subdomains, mobile versions, and related content and functionality.
            </p>
            <p>
              <strong>&quot;Services&quot;</strong>: refers to the development, design, marketing, and other services provided by Illusio Designs, as well as any related software, documentation, and other materials provided by Illusio Designs through the use of the Website&apos;s Contacts form.
            </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.15} duration={2.0}>
            <div className="terms-block">
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  General
                </SplitText>
              </h3>
            <p>
              These Terms of Use (&quot;Terms&quot;) govern your access to and use of the Website, and the ordering of services and products provided by Illusio Designs (&quot;Services&quot;). By accessing or using the Services, you agree to be bound by these Terms. Please read these Terms carefully. If you do not agree, you must not access or use the Services through the Website.
            </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.2} duration={2.0}>
            <div className="terms-block">
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  Eligibility
                </SplitText>
              </h3>
            <p>
              You must be at least 18 years of age to use the Services, unless you are between 14 and 18 (or the age of majority established by law in your jurisdiction) and are under the supervision of a parent or legal guardian who has agreed to these Terms. Individuals under the age of 14 are prohibited from requesting Services. By accessing or using the Services, you represent and warrant that you meet these requirements and are capable of entering into a legally binding agreement.
            </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.25} duration={2.0}>
            <div className="terms-block">
              <h3>
                <SplitText splitBy="words" animation="fadeUp" delay={0.08} trigger="onScroll" as="span">
                  License to Use the Website
                </SplitText>
              </h3>
            <p>
              Subject to these Terms, Illusio Designs grants you a limited, non-exclusive, non-transferable, and revocable license to access and use the Website solely for personal and non-commercial use.
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
