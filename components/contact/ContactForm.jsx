'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { COUNTRIES } from '@/lib/countries';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    description: '',
    _hp: '', // spam honeypot
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [serverMessage, setServerMessage] = useState('');

  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address (e.g., name@example.com).';
    }

    if (!formData.country.trim()) {
      errors.country = 'Please select your country.';
    }

    if (!formData.description.trim()) {
      errors.description = 'Please enter a description for your message.';
    } else if (formData.description.trim().length < 10) {
      errors.description = 'Description must be at least 10 characters long.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error as user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    // Clear server error if modifying
    if (status === 'error') {
      setStatus('idle');
      setServerMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus('submitting');
    setServerMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setServerMessage(data.error || 'Failed to send message. Please try again.');
        return;
      }

      setStatus('success');
      setServerMessage(data.message || 'Your message has been received. Thank you for reaching out!');
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        country: '',
        description: '',
        _hp: '',
      });
      setFieldErrors({});
    } catch (err) {
      setStatus('error');
      setServerMessage('A network error occurred. Please check your connection and try again.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setServerMessage('');
    setFieldErrors({});
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xs border border-slate-200/80">
      {/* Success Notification Banner */}
      {status === 'success' && (
        <div
          role="status"
          aria-live="polite"
          className="mb-8 p-5 bg-emerald-50/90 border border-emerald-200 rounded-xl flex items-start gap-3.5 transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-emerald-950">Message Sent Successfully</h3>
            <p className="text-xs sm:text-sm text-emerald-800 mt-1 leading-relaxed">
              {serverMessage}
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-3 text-xs font-semibold text-emerald-900 underline hover:text-emerald-950 transition-colors"
            >
              Send another message →
            </button>
          </div>
        </div>
      )}

      {/* Global Server Error Banner */}
      {status === 'error' && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-left transition-all"
        >
          <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs sm:text-sm font-bold text-rose-950">Unable to send message</h4>
            <p className="text-xs text-rose-800 mt-0.5 leading-relaxed">{serverMessage}</p>
          </div>
        </div>
      )}

      {/* Contact Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Honeypot field (hidden from real users) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-hp">Do not fill this field</label>
          <input
            id="contact-hp"
            type="text"
            name="_hp"
            tabIndex={-1}
            autoComplete="off"
            value={formData._hp}
            onChange={handleChange}
          />
        </div>

        {/* 1. Name Field */}
        <div>
          <label htmlFor="contact-name" className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
            Name <span className="text-rose-500 font-bold" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
            className={`w-full px-3.5 sm:px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
              fieldErrors.name
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/20'
                : 'border-slate-300 hover:border-slate-400 focus:border-blue-500 focus:ring-blue-100'
            }`}
          />
          {fieldErrors.name && (
            <p id="name-error" className="text-xs text-rose-600 mt-1.5 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{fieldErrors.name}</span>
            </p>
          )}
        </div>

        {/* 2. Email Field */}
        <div>
          <label htmlFor="contact-email" className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
            Email <span className="text-rose-500 font-bold" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            className={`w-full px-3.5 sm:px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
              fieldErrors.email
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/20'
                : 'border-slate-300 hover:border-slate-400 focus:border-blue-500 focus:ring-blue-100'
            }`}
          />
          {fieldErrors.email && (
            <p id="email-error" className="text-xs text-rose-600 mt-1.5 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{fieldErrors.email}</span>
            </p>
          )}
        </div>

        {/* 3. Country Field */}
        <div>
          <label htmlFor="contact-country" className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
            Country <span className="text-rose-500 font-bold" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <select
            id="contact-country"
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.country)}
            aria-describedby={fieldErrors.country ? 'country-error' : undefined}
            className={`w-full px-3.5 sm:px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 transition-all ${
              fieldErrors.country
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/20'
                : 'border-slate-300 hover:border-slate-400 focus:border-blue-500 focus:ring-blue-100'
            }`}
          >
            <option value="">Select your country</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          {fieldErrors.country && (
            <p id="country-error" className="text-xs text-rose-600 mt-1.5 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{fieldErrors.country}</span>
            </p>
          )}
        </div>

        {/* 4. Description Field */}
        <div>
          <label htmlFor="contact-description" className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
            Description <span className="text-rose-500 font-bold" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <textarea
            id="contact-description"
            name="description"
            required
            rows={5}
            value={formData.description}
            onChange={handleChange}
            placeholder="Have a question, feedback, or suggestion? Please share the details of your inquiry here..."
            aria-invalid={Boolean(fieldErrors.description)}
            aria-describedby={fieldErrors.description ? 'desc-error' : undefined}
            className={`w-full px-3.5 sm:px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all resize-y min-h-[120px] ${
              fieldErrors.description
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/20'
                : 'border-slate-300 hover:border-slate-400 focus:border-blue-500 focus:ring-blue-100'
            }`}
          />
          {fieldErrors.description && (
            <p id="desc-error" className="text-xs text-rose-600 mt-1.5 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{fieldErrors.description}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl text-sm transition-all shadow-xs disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
