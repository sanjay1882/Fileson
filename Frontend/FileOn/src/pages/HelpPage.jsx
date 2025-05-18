import React from 'react';
import '../styles/HelpPage.css'; // Import the CSS file

const HelpPage = () => {
  return (
    <div className="help-container">
      <header className="help-header">
        <h1>Help & Support</h1>
        <p>Find answers to common questions or contact us below.</p>
      </header>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>How do I upload a file?</h3>
          <p>Click the plus icon in the top header and choose a file from your computer.</p>
        </div>
        <div className="faq-item">
          <h3>What is the maximum storage limit?</h3>
          <p>You get 50 GB of storage by default. You can upgrade anytime from your profile settings.</p>
        </div>
        <div className="faq-item">
          <h3>How do I reset my password?</h3>
          <p>Navigate to Settings → Account → Security and click "Reset Password".</p>
        </div>
        <div className="faq-item">
          <h3>How can I contact support?</h3>
          <p>You can use the contact form below or email us at support@example.com.</p>
        </div>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default HelpPage;
