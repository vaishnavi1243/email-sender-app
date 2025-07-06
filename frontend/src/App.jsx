import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:5000';

// Icons
const SendIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LoadingSpinner = () => (
  <div className="loading-spinner w-4 h-4"></div>
);

function App() {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.to.trim()) {
      newErrors.to = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.to)) {
      newErrors.to = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/send-email`, formData);
      
      if (response.data.success) {
        toast.success('Email sent successfully! 🎉');
        
        // Show preview URL for Ethereal Email if available
        if (response.data.previewUrl) {
          toast.success(
            <div>
              <div>Preview your email:</div>
              <a 
                href={response.data.previewUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Email
              </a>
            </div>,
            { duration: 8000 }
          );
        }
        
        // Reset form
        setFormData({
          to: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error(response.data.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      
      let errorMessage = 'Failed to send email. Please try again.';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Please try again.';
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Network error. Please check if the server is running.';
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      to: '',
      subject: '',
      message: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <EmailIcon className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Email Sender
          </h1>
          <p className="text-lg text-gray-600">
            Send emails quickly and easily
          </p>
        </div>

        {/* Main Card */}
        <div className="card">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Compose Email
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Fill in the details below to send your email
            </p>
          
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* To Field */}
              <div className="form-group">
                <label htmlFor="to" className="form-label">
                  To <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="to"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  className={`form-input ${errors.to ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="recipient@example.com"
                  disabled={isLoading}
                />
                {errors.to && (
                  <p className="text-sm text-red-600 mt-1">{errors.to}</p>
                )}
              </div>

              {/* Subject Field */}
              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`form-input ${errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Enter email subject"
                  disabled={isLoading}
                />
                {errors.subject && (
                  <p className="text-sm text-red-600 mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-textarea resize-none ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Enter your message here..."
                  rows={6}
                  disabled={isLoading}
                />
                {errors.message && (
                  <p className="text-sm text-red-600 mt-1">{errors.message}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary px-6 py-3 flex-1"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner />
                      <span className="ml-2">Sending...</span>
                    </>
                  ) : (
                    <>
                      <SendIcon />
                      <span className="ml-2">Send Email</span>
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isLoading}
                  className="btn btn-secondary px-6 py-3"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Built with React, Node.js, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
