import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🚗</span>
              <span className="text-white font-bold text-lg">DriveEasy</span>
            </div>
            <p className="text-sm leading-relaxed">Premium car rentals for every journey. Simple booking, great cars, unbeatable prices.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <Link to="/about" className="hover:text-white transition">About Us</Link>
              <Link to="/contact" className="hover:text-white transition">Contact</Link>
              <Link to="/fleet" className="hover:text-white transition">Browse Fleet</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <div className="flex flex-col gap-2 text-sm">
              <span>📧 driveeasy@gmail.com</span>
              <span>📞 +254 700 000 000</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          © {new Date().getFullYear()} DriveEasy v1.0.0 — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
