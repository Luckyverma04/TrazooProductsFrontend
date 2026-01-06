import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Heart,
  LogIn,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        
        {/* BRAND */}
        <div>
          <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            TRAZOO
          </h4>
          <p className="text-gray-300 mb-2">
            Corporate gifting & welcome kits across India.
          </p>
          <p className="text-gray-400 text-sm">
            Elevating corporate relationships with thoughtful, curated gifts.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#process">How It Works</a></li>
            <li><a href="#who-we-serve">Who We Serve</a></li>
            <li><a href="#enquiry">Contact</a></li>

            <li>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <LogIn size={16} /> Login
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h5 className="text-lg font-semibold mb-4">Contact</h5>
          <div className="space-y-2 text-gray-300">

            {/* EMAIL (Gmail Direct + Fallback) */}
            <a
              href={
                navigator.userAgent.includes("Chrome")
                  ? "https://mail.google.com/mail/?view=cm&fs=1&to=contact@trazooglobal.com"
                  : "mailto:contact@trazooglobal.com"
              }
              className="flex items-center gap-2 hover:text-orange-400 transition-all duration-300 group"
            >
              <Mail size={16} className="group-hover:scale-110 transition-transform" />
              <span className="group-hover:underline">contact@trazooglobal.com</span>
            </a>

            <div className="flex items-center gap-2 group hover:text-orange-400 transition-all duration-300">
              <Phone size={16} className="group-hover:scale-110 transition-transform" />
              <span>+91 7024804838</span>
            </div>

            <div className="flex items-center gap-2 group hover:text-orange-400 transition-all duration-300">
              <MapPin size={16} className="group-hover:scale-110 transition-transform" />
              <span>India</span>
            </div>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-4">
            
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/trazoo-global-llp/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Trazoo Global LLP LinkedIn"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
            >
              <Linkedin size={20} />
            </a>

            {/* Twitter (disabled) */}
            {/* <span
              className="p-2 bg-gray-800 rounded-full opacity-50 cursor-not-allowed"
              aria-label="Twitter not available"
            >
              <Twitter size={20} />
            </span> */}

            {/* Instagram */}
            <a
              href="https://www.instagram.com/trazooglobal/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Trazoo Global Instagram"
              className="p-2 bg-gray-800 rounded-full hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-400">
        © 2025 TRAZOO. Made with{" "}
        <Heart className="inline text-red-500" /> in India
      </div>
    </footer>
  );
};

export default Footer;