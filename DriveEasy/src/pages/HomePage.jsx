import { Link } from "react-router-dom";

const features = [
  { icon: "🚗", title: "Wide Selection", desc: "Sedans, SUVs, Sports, Luxury and Electric vehicles for every need." },
  { icon: "💳", title: "Easy Booking", desc: "Book in minutes. No hidden fees, no paperwork." },
  { icon: "🛡️", title: "Fully Insured", desc: "Every rental includes comprehensive insurance coverage." },
  { icon: "📍", title: "24/7 Support", desc: "Our team is available around the clock wherever you are." },
];

const stats = [
  { value: "500+", label: "Cars Available" },
  { value: "12K+", label: "Happy Customers" },
  { value: "50+",  label: "Cities Covered" },
  { value: "4.9★", label: "Average Rating" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cars/mustang.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative text-center px-4 max-w-3xl mx-auto">
          <span className="inline-block bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
            🏆 #1 Rated Car Rental Service
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Drive Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dream Car</span> Today
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Premium vehicles, unbeatable prices, and a booking experience so smooth you'll wonder why you ever drove your own car.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition text-base">
              Start Renting →
            </Link>
            <Link to="/fleet" className="border-2 border-white/30 hover:border-white text-white font-semibold px-8 py-3.5 rounded-xl transition text-base">
              Browse Fleet
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-800 py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-blue-400">{s.value}</p>
              <p className="text-gray-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose DriveEasy?</h2>
            <p className="text-gray-500 mt-2">Everything you need for a perfect rental experience</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center">
                <span className="text-4xl block mb-4">{f.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Ready to Hit the Road?</h2>
        <p className="text-white/80 mb-8">Join thousands of drivers who trust DriveEasy for every journey.</p>
        <Link to="/register" className="bg-white text-blue-600 font-bold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition">
          Create Free Account
        </Link>
      </section>
    </div>
  );
}
