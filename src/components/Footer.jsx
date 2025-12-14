import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Heart,
  LogIn
} from "lucide-react";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white"
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* COMPANY */}
          <div>
            <h4 className="text-2xl font-bold mb-4">TRAZOO</h4>
            <p className="text-gray-300 leading-relaxed">
              Creating memorable welcome kits and branded merchandise for companies
              and institutions across India.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><a href="#process" className="text-gray-300 hover:text-blue-400">How It Works</a></li>
              <li><a href="#who-we-serve" className="text-gray-300 hover:text-blue-400">Who We Serve</a></li>
              <li><a href="#enquiry" className="text-gray-300 hover:text-blue-400">Contact Us</a></li>

              {/* LOGIN LINK */}
              <li>
                <a
                  href="/auth"
                  className="flex items-center gap-2 text-gray-300 hover:text-orange-400 font-semibold"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Get In Touch</h5>

            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3"><Mail className="w-5 h-5" /> inoslifestyles.com</div>
              <div className="flex items-center gap-3"><Phone className="w-5 h-5" /> +91 7024804838</div>
              <div className="flex items-center gap-3"><MapPin className="w-5 h-5" /> India</div>
            </div>

            <div className="flex gap-4 mt-6">
              <Linkedin />
              <Twitter />
              <Instagram />
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-400 flex justify-between">
          <p>
            © 2025 TRAZOO. Made with <Heart className="inline w-4 h-4 text-red-500" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
