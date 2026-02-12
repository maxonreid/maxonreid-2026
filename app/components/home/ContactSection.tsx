'use client';

import { useState, FormEvent } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Form submitted:', formData);
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <section
      id="contact"
      className="section contact container"
      aria-labelledby="contact-heading"
    >
      <div className="contact-header">
        <h2 id="contact-heading" className="section-title">
          Get In Touch
        </h2>
        <p className="section-sub">
          Available for new projects, consulting engagements, and technical
          partnerships. Let's build something amazing together.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-card email-card">
            <div className="contact-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div className="contact-content">
              <div className="contact-label mono">EMAIL</div>
              <div className="contact-value">
                <a href="mailto:hello@maxonreid.com" className="contact-link">
                  hello@maxonreid.com
                </a>
              </div>
            </div>
          </div>

          <div className="contact-card location-card">
            <div className="contact-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className="contact-content">
              <div className="contact-label mono">LOCATION</div>
              <div className="contact-value">
                Vientiane, Laos PDR
                <div className="contact-timezone muted small">GMT+7 (Remote-friendly)</div>
              </div>
            </div>
          </div>

          <div className="contact-card links-card">
            <div className="contact-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </div>
            <div className="contact-content">
              <div className="contact-label mono">CONNECT</div>
              <div className="contact-value">
                <a href="#" target="_blank" rel="noopener" className="contact-link">
                  GitHub
                </a>
                <span className="contact-separator">·</span>
                <a href="#" target="_blank" rel="noopener" className="contact-link">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-wrap">
          <div className="form-header">
            <h3 className="form-title">Send a Message</h3>
            <p className="form-subtitle muted">I'll get back to you within 24 hours</p>
          </div>
          
          <form
            className={`contact-form ${isSubmitting ? 'submitting' : ''} ${submitStatus}`}
            id="contact-form"
            onSubmit={handleSubmit}
            aria-label="Contact form"
          >
            <div className="form-grid">
              <label className="field">
                <span className="label">Name *</span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={isSubmitting}
                />
              </label>

              <label className="field">
                <span className="label">Email *</span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={isSubmitting}
                />
              </label>

              <label className="field large">
                <span className="label">Message *</span>
                <textarea
                  name="message"
                  id="contact-message"
                  rows={6}
                  required
                  placeholder="Tell me about your project, timeline, and budget..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  disabled={isSubmitting}
                ></textarea>
              </label>
            </div>

            <div className="form-actions">
              <button 
                className={`cta ${isSubmitting ? 'loading' : ''}`} 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sending...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <span className="success-icon">✓</span>
                    Message Sent!
                  </>
                ) : submitStatus === 'error' ? (
                  'Try Again'
                ) : (
                  'Send Secure Message'
                )}
              </button>
              
              {submitStatus === 'success' && (
                <div className="success-message">
                  Thanks! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="error-message">
                  Something went wrong. Please try again or email me directly.
                </div>
              )}
              
              <div className="form-footer">
                <div className="hint mono">
                  Or email directly: 
                  <a href="mailto:hello@maxonreid.com" className="email-link">
                    hello@maxonreid.com
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
