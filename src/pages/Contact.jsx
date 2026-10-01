import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'General Enquiry',
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

    // Success state simulation
    setStatus({
      type: 'success',
      message: 'Thank you for reaching out to ANVI GROUPS. Our executive team will respond shortly.'
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: 'General Enquiry',
      message: ''
    });
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
                ANVI GROUPS Global Headquarters is located in the financial district, overseeing international operations across 12 countries.
              </p>

              <div className="info-cards-list">
                <div className="info-card-item">
                  <MapPin className="info-icon" size={24} />
                  <div>
                    <strong>Global Headquarters</strong>
                    <p>ANVI Tower, Level 42, Financial Center Blvd, NY 10005, USA</p>
                  </div>
                </div>

                <div className="info-card-item">
                  <Mail className="info-icon" size={24} />
                  <div>
                    <strong>Email Enquiries</strong>
                    <p>General: info@anvigroups.com</p>
                    <p>Investor Relations: ir@anvigroups.com</p>
                  </div>
                </div>

                <div className="info-card-item">
                  <Phone className="info-icon" size={24} />
                  <div>
                    <strong>Phone Directory</strong>
                    <p>Main Switchboard: +1 (800) 555-ANVI</p>
                    <p>Media Desk: +1 (800) 555-0199</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="contact-form-col">
              <div className="contact-form-card">
                <h3 className="form-card-title">Send Us a Message</h3>
                <p className="form-card-subtitle">
                  Fill out the form below and our corporate relations team will connect with you.
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
                        placeholder="John Doe"
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
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Company / Organization</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Acme Corp"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject / Inquiry Type</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="General Enquiry">General Corporate Enquiry</option>
                      <option value="Business Partnership">Business & Partnership</option>
                      <option value="Technology Solutions">ANVI Technologies Inquiry</option>
                      <option value="Infrastructure Development">ANVI Infra Development</option>
                      <option value="Investor Relations">Investor Relations</option>
                      <option value="Media & Press">Media & Press</option>
                    </select>
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
                    <span>Send Enquiry</span>
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP / LOCATION PLACEHOLDER SECTION */}
      <section className="section map-section">
        <div className="container">
          <SectionHeading
            subtitle="GLOBAL FOOTPRINT"
            title="Our Offices Around The World"
            description="ANVI GROUPS operates regional hubs across New York, London, Singapore, Tokyo, and Mumbai."
          />
          <div className="map-placeholder-box">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80"
              alt="Global Operations Map"
              className="map-img"
            />
            <div className="map-overlay-card">
              <h4>ANVI GROUPS Global Presence</h4>
              <p>5 Global Hubs | 12 Regional Offices | 15,000+ Personnel</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
