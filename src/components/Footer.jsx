import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white"
    >
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Company Info */}
          <div>
            <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TRAZOO
            </h4>
            <p className="text-gray-300 leading-relaxed mb-4">
              Creating memorable welcome kits and branded merchandise for companies
              and institutions across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold mb-4 text-gray-100">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <a href="#process" className="text-gray-300 hover:text-blue-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#who-we-serve" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Who We Serve
                </a>
              </li>
              <li>
                <a href="#enquiry" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-lg font-semibold mb-4 text-gray-100">Get In Touch</h5>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>info@trazoo.com</span>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+91 XXX XXX XXXX</span>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all transform hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-all transform hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all transform hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              &copy; 2025 TRAZOO. All rights reserved. Made with{" "}
              <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in India
            </p>

            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
