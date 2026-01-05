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

        <div>
          <h4 className="text-2xl font-bold mb-4">TRAZOO</h4>
          <p className="text-gray-300">
            Corporate gifting & welcome kits across India.
          </p>
        </div>

        <div>
          <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#process">How It Works</a></li>
            <li><a href="#who-we-serve">Who We Serve</a></li>
            <li><a href="#enquiry">Contact</a></li>

            {/* ✅ FIXED LOGIN */}
            <li>
              <Link
                to="/auth"
                className="flex items-center gap-2 text-orange-400 font-semibold"
              >
                <LogIn size={16} /> Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-lg font-semibold mb-4">Contact</h5>
          <div className="space-y-2 text-gray-300">
            <div className="flex gap-2"><Mail size={16} /> info@trazoo.in</div>
            <div className="flex gap-2"><Phone size={16} /> +91 7024804838</div>
            <div className="flex gap-2"><MapPin size={16} /> India</div>
          </div>

          <div className="flex gap-4 mt-4">
            <Linkedin />
            <Twitter />
            <Instagram />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-gray-400">
        © 2025 TRAZOO. Made with <Heart className="inline text-red-500" /> in India
      </div>
    </footer>
  );
};

export default Footer;
