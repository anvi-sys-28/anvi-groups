import React, { useState } from 'react';
import { Mail, MapPin, CheckCircle, AlertCircle, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'General Corporate Enquiry',
    message: ''
  });

  const [status, setStatus] = useState({ type: null, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple frontend validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields (Name, Email, Message).'
      });
      return;
    }

    const emailSubject = `[${formData.subject}] Enquiry from ${formData.name}`;
    const emailBody = `Hello ANVI GROUPS Team,\n\nName: ${formData.name}\nEmail: ${formData.email}\n${formData.company ? `Company: ${formData.company}\n` : ''}Inquiry Type: ${formData.subject}\n\nMessage:\n${formData.message}\n\nBest regards,\n${formData.name}`;

    const mailtoUrl = `mailto:support@anvigroups.in?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    setStatus({
      type: 'success',
      message: 'Opening your email client to send your message directly to support@anvigroups.in...'
    });

    // Redirect to mail for support@anvigroups.in
    window.location.href = mailtoUrl;
  };

  return (
    <div className="anvi-page contact-page">
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="page-hero-tag">GET IN TOUCH</span>
          <h1 className="page-hero-title">Let's Start a Conversation.</h1>
          <p className="page-hero-lead">
            Whether you are exploring investment partnerships, enterprise technology integration, or media enquiries, ANVI GROUPS welcomes your reach out.
          </p>
        </div>
      </section>

      {/* CONTACT MAIN SECTION */}
      <section className="section contact-main-section">
        <div className="container">
          <div className="contact-grid">
            {/* CONTACT INFO SIDEBAR */}
            <div className="contact-info-col">
              <h3 className="contact-info-title">Corporate Headquarters</h3>
              <p className="contact-info-desc">
                ANVI GROUPS Global Headquarters is located in Kapra, Hyderabad, Telangana, INDIA, overseeing international operations and enterprise platforms across India, Italy, Malta, Spain, USA, Canada, and Dubai.
              </p>

              <div className="info-cards-list">
                <div className="info-card-item">
                  <MapPin className="info-icon" size={24} />
                  <div>
                    <strong>Global Headquarters</strong>
                    <p>Kapra, Hyderabad, Telangana, INDIA</p>
                  </div>
                </div>

                <div className="info-card-item">
                  <Mail className="info-icon" size={24} />
                  <div>
                    <strong>Email Enquiries</strong>
                    <p>Support: <a href="mailto:support@anvigroups.in">support@anvigroups.in</a></p>
                    <p>Director (Jashwanth Rao Gajvelli): <a href="mailto:jashwanth@anvigroups.in">jashwanth@anvigroups.in</a></p>
                    <p>Managing Director: <a href="mailto:rohan@anvigroups.in">rohan@anvigroups.in</a></p>
                    <p>Legal Advisor: <a href="mailto:vasavi@anvigroups.in">vasavi@anvigroups.in</a></p>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="contact-form-col">
              <div className="contact-form-card">
                <h3 className="form-card-title">Send Us a Message</h3>
                <p className="form-card-subtitle">
                  Fill out the form below to send your message directly to support@anvigroups.in.
                </p>

                {status.message && (
                  <div className={`form-status-alert ${status.type}`}>
                    {status.type === 'success' ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span>{status.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="anvi-contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Your Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">Company / Organization</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Company or Organization"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject / Inquiry Type</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        <option value="General Corporate Enquiry">General Corporate Enquiry</option>
                        <option value="Business Partnership">Business & Partnership</option>
                        <option value="Technology Solutions">ANVI Technologies Inquiry</option>
                        <option value="Infrastructure Development">ANVI Infra Development</option>
                        <option value="Trade & Logistics">Global Trade & Logistics</option>
                        <option value="Investor Relations">Investor Relations</option>
                        <option value="Media & Press">Media & Press</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Describe your enquiry or proposal..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="anvi-submit-btn">
                    <span>Send Message to support@anvigroups.in</span>
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP / GLOBAL FOOTPRINT SECTION */}
      <section className="section map-section">
        <div className="container">
          <SectionHeading
            subtitle="GLOBAL FOOTPRINT"
            title="Strategic Presence Across World Markets"
            description="ANVI GROUPS maintains active commercial hubs, technological partnerships, and strategic trade corridors across India, Italy, Malta, Spain, USA, Canada, and Dubai."
          />
          <div className="map-placeholder-box">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80"
              alt="ANVI GROUPS Global Footprint"
              className="map-img"
            />
            <div className="map-overlay-card">
              <h4>ANVI GROUPS Global Presence</h4>
              <p>INDIA · ITALY · MALTA · SPAIN · USA · CANADA · DUBAI</p>
            </div>
          </div>

          <div className="footprint-countries-grid">
            {[
              {
                country: 'INDIA',
                hub: 'Headquarters & Engineering Hub',
                desc: 'Software development, enterprise cloud platforms, and large-scale industrial operations.'
              },
              {
                country: 'ITALY',
                hub: 'European Commercial & Design',
                desc: 'Strategic trade networks, luxury architecture, and high-value European commercial initiatives.'
              },
              {
                country: 'MALTA',
                hub: 'Mediterranean Maritime & Trade',
                desc: 'Strategic maritime logistics, international trade compliance, and cross-border distribution.'
              },
              {
                country: 'SPAIN',
                hub: 'Southern European Distribution',
                desc: 'Multimodal freight routing, supply chain coordination, and industrial commerce corridors.'
              },
              {
                country: 'USA',
                hub: 'Enterprise Software & Ventures',
                desc: 'Advanced software architectures, venture capital allocation, and enterprise partnerships.'
              },
              {
                country: 'CANADA',
                hub: 'North American Tech Hub',
                desc: 'Next-generation tech engineering, digital platform scaling, and cross-border commercial trade.'
              },
              {
                country: 'DUBAI',
                hub: 'Middle East Corporate Gateway',
                desc: 'Global commodities trading, regional logistics leadership, and Middle Eastern investments.'
              }
            ].map((loc) => (
              <div key={loc.country} className="footprint-country-card">
                <div className="country-flag-header">
                  <span className="country-name">{loc.country}</span>
                </div>
                <span className="country-hub-badge">{loc.hub}</span>
                <p className="country-desc">{loc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
