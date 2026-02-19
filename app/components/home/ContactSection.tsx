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
      className="py-24 px-0 w-[92%] max-w-[1200px] mx-auto"
      aria-labelledby="contact-heading"
    >
      <div className="text-center mb-12">
        <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold mb-4">
          Get In Touch
        </h2>
        <p className="text-xl text-[#9ea0a8] max-w-2xl mx-auto">
          Available for new projects, consulting engagements, and technical
          partnerships. Let's build something amazing together.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 flex gap-4 hover:bg-white/[0.03] transition-colors">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#d6b46b]/10 flex items-center justify-center text-[#d6b46b]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-mono text-xs text-[#9ea0a8] tracking-wider mb-1">EMAIL</div>
              <div className="text-[#e6e7ea]">
                <a href="mailto:hello@maxonreid.com" className="hover:text-[#d6b46b] transition-colors">
                  hello@maxonreid.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 flex gap-4 hover:bg-white/[0.03] transition-colors">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#d6b46b]/10 flex items-center justify-center text-[#d6b46b]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-mono text-xs text-[#9ea0a8] tracking-wider mb-1">LOCATION</div>
              <div className="text-[#e6e7ea]">
                Vientiane, Laos PDR
                <div className="text-sm text-[#9ea0a8] mt-1">GMT+7 (Remote-friendly)</div>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 flex gap-4 hover:bg-white/[0.03] transition-colors">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#d6b46b]/10 flex items-center justify-center text-[#d6b46b]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-mono text-xs text-[#9ea0a8] tracking-wider mb-1">CONNECT</div>
              <div className="text-[#e6e7ea] flex gap-2">
                <a href="#" target="_blank" rel="noopener" className="hover:text-[#d6b46b] transition-colors">
                  GitHub
                </a>
                <span className="text-[#9ea0a8]">·</span>
                <a href="https://www.linkedin.com/in/maxontorres/" target="_blank" rel="noopener" className="hover:text-[#d6b46b] transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Send a Message</h3>
            <p className="text-sm text-[#9ea0a8]">I'll get back to you within 24 hours</p>
          </div>
          
          <form
            className={`space-y-6 ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}
            id="contact-form"
            onSubmit={handleSubmit}
            aria-label="Contact form"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#e6e7ea]">Name *</span>
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
                  className="bg-white/[0.02] border border-white/[0.06] rounded-lg px-4 py-3 text-[#e6e7ea] placeholder:text-[#9ea0a8] focus:outline-none focus:border-[#d6b46b] transition-colors"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#e6e7ea]">Email *</span>
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
                  className="bg-white/[0.02] border border-white/[0.06] rounded-lg px-4 py-3 text-[#e6e7ea] placeholder:text-[#9ea0a8] focus:outline-none focus:border-[#d6b46b] transition-colors"
                />
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-sm font-medium text-[#e6e7ea]">Message *</span>
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
                  className="bg-white/[0.02] border border-white/[0.06] rounded-lg px-4 py-3 text-[#e6e7ea] placeholder:text-[#9ea0a8] focus:outline-none focus:border-[#d6b46b] transition-colors resize-none"
                ></textarea>
              </label>
            </div>

            <div className="space-y-4">
              <button 
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  isSubmitting 
                    ? 'bg-[#d6b46b]/50 cursor-not-allowed' 
                    : submitStatus === 'success'
                    ? 'bg-green-600 hover:bg-green-700'
                    : submitStatus === 'error'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-[#d6b46b] hover:bg-[#b99046]'
                } text-[#0a0a0c]`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-[#0a0a0c] border-t-transparent rounded-full animate-spin"></span>
                    Sending...
                  </span>
                ) : submitStatus === 'success' ? (
                  <span className="flex items-center justify-center gap-2">
                    <span>✓</span>
                    Message Sent!
                  </span>
                ) : submitStatus === 'error' ? (
                  'Try Again'
                ) : (
                  'Send Secure Message'
                )}
              </button>
              
              {submitStatus === 'success' && (
                <div className="text-center text-green-400 text-sm">
                  Thanks! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="text-center text-red-400 text-sm">
                  Something went wrong. Please try again or email me directly.
                </div>
              )}
              
              <div className="text-center">
                <div className="font-mono text-xs text-[#9ea0a8]">
                  Or email directly: 
                  <a href="mailto:hello@maxonreid.com" className="text-[#d6b46b] hover:underline ml-2">
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
