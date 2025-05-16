import { Metadata } from 'next';
import { ContactForm } from '@/components/contact/contact-form';

export const metadata: Metadata = {
  title: 'Contact - EB Art',
  description: 'Get in touch with the artist.',
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Contact</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Email</h3>
                <p className="text-gray-600">artist@example.com</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Studio Location</h3>
                <p className="text-gray-600">
                  123 Art Street<br />
                  Creative District<br />
                  City, State 12345
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Social Media</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
} 