import { Link } from "react-router-dom";

const team = [
  { name: "Joshua", role: "CEO & Founder", avatar: "J", bio: "Passionate about making car rental effortless." },
  { name: "Maya",   role: "Head of Operations", avatar: "M", bio: "Logistics expert ensuring every rental runs like clockwork." },
  { name: "David",  role: "Lead Engineer", avatar: "D", bio: "Built the platform from scratch with a focus on speed and simplicity." },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-900 py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/DriveEasy-App/cars/bmw.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">DriveEasy</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            We started with a simple idea: renting a car should be as easy as ordering a coffee. Since 2018, we've been making that a reality.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              DriveEasy exists to remove every friction point from the car rental experience. No queues, no confusing contracts, no surprise charges — just you, a great car, and the open road.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              We believe mobility should be accessible to everyone, which is why we offer a fleet ranging from budget-friendly sedans to premium luxury vehicles at transparent prices.
            </p>
            <Link to="/fleet" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition inline-block">
              Explore Our Fleet →
            </Link>
          </div>
          <img src={`${import.meta.env.BASE_URL}cars/bmw.jpg`} alt="Our fleet" className="rounded-2xl shadow-xl w-full object-cover h-72" />
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Meet the Team</h2>
            <p className="text-gray-500 mt-2">The people behind every smooth rental</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((m) => (
              <div key={m.name} className="bg-white rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {m.avatar}
                </div>
                <h3 className="font-bold text-gray-900">{m.name}</h3>
                <p className="text-blue-600 text-sm font-medium mb-2">{m.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
