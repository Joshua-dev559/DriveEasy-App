import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { cancelBooking } from "../api";

const today = new Date().toISOString().split("T")[0];

export default function BookingModal({ car, onSubmit, onClose }) {
  const { user } = useAuth();
  const [form, setForm] = useState({ startDate: today, endDate: "" });
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const days = form.startDate && form.endDate
    ? Math.max(0, Math.ceil((new Date(form.endDate) - new Date(form.startDate)) / 86400000))
    : 0;

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const saved = await onSubmit({ carId: car.id, ...form });
      setBooking(saved);
    } catch (err) {
      setError(err.response?.data?.error || "Booking failed");
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    setCancelling(true);
    try {
      await cancelBooking(booking.id);
      setCancelled(true);
    } catch {
      setError("Failed to cancel booking. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  // Cancelled screen
  if (cancelled) return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 text-center shadow-2xl">
        <div className="text-5xl mb-3">❌</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Cancelled</h2>
        <p className="text-gray-500 text-sm mb-6">Your booking for the <strong>{car.make} {car.model}</strong> has been cancelled and the car is now available again.</p>
        <button onClick={onClose} className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-xl transition">
          Close
        </button>
      </div>
    </div>
  );

  // Success screen
  if (booking) return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 text-center shadow-2xl">
        <div className="text-5xl mb-3">✅</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Booking Confirmed!</h2>
        <p className="text-gray-500 text-sm mb-6">Your booking has been saved successfully.</p>
        <div className="bg-gray-50 rounded-xl p-4 text-left text-sm space-y-2 mb-6">
          <div className="flex justify-between"><span className="text-gray-500">Car</span><span className="font-semibold">{booking.carName}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Name</span><span>{booking.customerName}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Pick-up</span><span>{booking.startDate}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Return</span><span>{booking.endDate}</span></div>
          <div className="flex justify-between border-t pt-2"><span className="text-gray-500">Total</span><span className="font-bold text-blue-600">${booking.totalPrice}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Ref</span><span className="text-xs text-gray-400">{booking.id.slice(0,8).toUpperCase()}</span></div>
        </div>
        {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2 mb-3">{error}</p>}
        <button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition mb-2">
          Done
        </button>
        <button onClick={handleCancel} disabled={cancelling}
          className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-semibold py-3 rounded-xl transition text-sm disabled:opacity-50">
          {cancelling ? "Cancelling…" : "✕ Cancel this booking"}
        </button>
      </div>
    </div>
  );

  // Booking form
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="relative h-44">
          <img src={car.image} alt={car.make} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <h2 className="text-white font-bold text-xl">{car.make} {car.model}</h2>
            <p className="text-white/75 text-sm">{car.year} · {car.category} · ${car.pricePerDay}/day</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2 mb-4">{error}</p>}

          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-xs font-semibold text-gray-600">
                Pick-up Date
                <input type="date" name="startDate" value={form.startDate} min={today} onChange={handle} required
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500 bg-gray-50" />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold text-gray-600">
                Return Date
                <input type="date" name="endDate" value={form.endDate} min={form.startDate || today} onChange={handle} required
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500 bg-gray-50" />
              </label>
            </div>

            {days > 0 && (
              <div className="flex justify-between items-center bg-blue-50 rounded-xl px-4 py-3 text-sm text-blue-800">
                <span>{days} day{days > 1 ? "s" : ""} × ${car.pricePerDay}/day</span>
                <strong className="text-base">${days * car.pricePerDay}</strong>
              </div>
            )}

            <div className="flex gap-3">
              <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition">Confirm Booking</button>
              <button type="button" onClick={onClose} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
