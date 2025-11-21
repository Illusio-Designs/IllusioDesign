import '@/styles/pages/PrivacyPolicy.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy({ navigateTo }) {
  return (
    <>
      <Header navigateTo={navigateTo} />
      <section className="privacy-section" id="privacy">
      <div className="privacy-container">
        <h2>Privacy Policy</h2>
        <p className="last-updated">Last Updated: November 15, 2024</p>
        
        <div className="privacy-content">
          <div className="privacy-block">
            <h3>1. Information We Collect</h3>
            <p>
              We collect information that you provide directly to us, including name, email address, 
              phone number, and any other information you choose to provide when you contact us or 
              use our services.
            </p>
          </div>
          
          <div className="privacy-block">
            <h3>2. How We Use Your Information</h3>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Respond to your inquiries and fulfill your requests</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Monitor and analyze trends, usage, and activities</li>
            </ul>
          </div>
          
          <div className="privacy-block">
            <h3>3. Information Sharing</h3>
            <p>
              We do not share your personal information with third parties except as described in 
              this policy. We may share information with service providers who perform services on 
              our behalf, and when required by law or to protect our rights.
            </p>
          </div>
          
          <div className="privacy-block">
            <h3>4. Data Security</h3>
            <p>
              We take reasonable measures to help protect your personal information from loss, theft, 
              misuse, unauthorized access, disclosure, alteration, and destruction.
            </p>
          </div>
          
          <div className="privacy-block">
            <h3>5. Your Rights</h3>
            <p>
              You have the right to access, update, or delete your personal information. You may also 
              opt out of receiving promotional communications from us by following the instructions in 
              those messages.
            </p>
          </div>
          
          <div className="privacy-block">
            <h3>6. Cookies and Tracking</h3>
            <p>
              We use cookies and similar tracking technologies to collect information about your 
              browsing activities. You can control cookies through your browser settings.
            </p>
          </div>
          
          <div className="privacy-block">
            <h3>7. Changes to This Policy</h3>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes 
              by posting the new policy on this page and updating the &quot;Last Updated&quot; date.
            </p>
          </div>
          
          <div className="privacy-block">
            <h3>8. Contact Us</h3>
            <p>
              If you have any questions about this privacy policy, please contact us at:
              <br />
              Email: info@illusiodesigns.agency
              <br />
              Phone: +91 76000 48416
            </p>
          </div>
        </div>
      </div>
    </section>
    <Footer navigateTo={navigateTo} />
    </>
  );
}
