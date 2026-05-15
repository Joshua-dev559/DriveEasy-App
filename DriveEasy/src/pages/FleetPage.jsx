import { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import BookingModal from "../components/BookingModal";
import { getCars, getBookings, createBooking, cancelBooking } from "../api";

const CATEGORIES = ["All", "Sedan", "SUV", "Sports", "Luxury", "Electric"];

export default function FleetPage() {
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAll = async () => {
    try {
      const [carsData, bookingsData] = await Promise.all([getCars(), getBookings()]);
      setCars(carsData);
      setBookings(bookingsData);
    } catch {
      setError("Failed to load cars. Is the API running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleBook = async (formData) => {
    const saved = await createBooking(formData);
    fetchAll();
    return saved;
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    await cancelBooking(bookingId);
    fetchAll();
  };

  // Map carId → bookingId for the logged-in user's bookings
  const bookedCarMap = Object.fromEntries(bookings.map((b) => [b.carId, b.id]));

  const filtered = filter === "All" ? cars : cars.filter((c) => c.category === filter);
  const available = cars.filter((c) => c.available).length;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500 text-lg">{error}</p>
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-900 py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/DriveEasy-App/cars/bmw.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative">
          <h1 className="text-4xl font-extrabold text-white mb-2">Our Fleet</h1>
          <p className="text-gray-400">{available} of {cars.length} cars available to book right now</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition cursor-pointer
                ${filter === cat ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onBook={setSelectedCar}
              onCancel={handleCancel}
              bookingId={bookedCarMap[car.id]}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-16 text-lg">No cars in this category.</p>
        )}
      </section>

      {selectedCar && (
        <BookingModal
          car={selectedCar}
          onSubmit={handleBook}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </div>
  );
}
