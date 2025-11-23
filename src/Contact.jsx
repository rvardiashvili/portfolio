import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare, Phone, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [formData, setFormData] = useState({
    'entry.1220524789': '', // Full Name
    'entry.2070541075': '', // Email
    'entry.863523076': '',  // Phone Number
    'entry.1740138137': ''  // Details
  });
  const [status, setStatus] = useState(''); // 'idle' | 'sending' | 'success' | 'error'

  const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLScYhclwiOs9teDkvUgQUonQRn-VvQAF5ZeGlxXhqrieWqRuTA/formResponse";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formBody = new URLSearchParams();
    for (const key in formData) {
      formBody.append(key, formData[key]);
    }
    formBody.append("usp", "pp_url");

    try {
      // This fetch request sends the data to Google Forms in the background.
      // mode: 'no-cors' prevents the browser from blocking the request due to CORS policy,
      // and crucially, it prevents the browser from following the redirect to the Google "Thank You" page.
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      });

      // Because of 'no-cors', we can't see the response status (it will be 0),
      // but if the code reaches here, the network request was sent successfully.
      setStatus('success');
      setFormData({ 
        'entry.1220524789': '',
        'entry.2070541075': '',
        'entry.863523076': '',
        'entry.1740138137': ''
      });

    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    // Map friendly input names to the specific Google Entry IDs
    const inputNameToEntryId = {
        'full-name': 'entry.1220524789',
        'email': 'entry.2070541075',
        'phone': 'entry.863523076',
        'details': 'entry.1740138137'
    };
    
    setFormData(prev => ({
      ...prev,
      [inputNameToEntryId[e.target.name]]: e.target.value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 text-white min-h-screen flex flex-col">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-widest w-fit">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
        <div className="mb-10">
            <h1 className="text-4xl font-serif mb-4">Get in Touch</h1>
            <p className="text-slate-300 text-lg leading-relaxed">
            Have a project in mind or just want to say hi? Send me a message and I'll get back to you as soon as possible.
            </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl">
            {status === 'success' ? (
                <div className="text-center py-12 flex flex-col items-center animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-300">Thanks for reaching out. Your message has been received.</p>
                    <button 
                        onClick={() => setStatus('idle')}
                        className="mt-6 text-sm font-bold uppercase tracking-widest text-purple-400 hover:text-purple-300"
                    >
                        Send Another
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="full-name" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                            <input
                                type="text"
                                id="full-name"
                                name="full-name"
                                required
                                value={formData['entry.1220524789']}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData['entry.2070541075']}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Phone Number</label>
                        <div className="relative group">
                            <Phone className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                value={formData['entry.863523076']}
                                onChange={handleChange}
                                placeholder="(123) 456-7890"
                                className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="details" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Details / Message</label>
                        <div className="relative group">
                            <MessageSquare className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                            <textarea
                                id="details"
                                name="details"
                                required
                                value={formData['entry.1740138137']}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Tell me about your project..."
                                className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all resize-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'sending' ? (
                            <span>Sending...</span>
                        ) : (
                            <>
                                <span>Send Message</span>
                                <Send size={18} />
                            </>
                        )}
                    </button>

                    {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-400 text-sm justify-center mt-4 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                            <AlertCircle size={16} />
                            <span>Something went wrong. Please try again.</span>
                        </div>
                    )}
                </form>
            )}
        </div>
      </div>
    </div>
  );
}
