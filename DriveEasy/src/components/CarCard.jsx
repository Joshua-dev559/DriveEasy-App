export default function CarCard({ car, onBook, onCancel, bookingId }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-400"
        />
        <span className="absolute top-3 left-3 bg-gray-900/75 backdrop-blur text-gray-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
          {car.category}
        </span>
        {!car.available && (
          <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            Booked
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-900">
            {car.make} <span className="font-medium text-gray-500">{car.model}</span>
          </h3>
          <p className="text-blue-600 font-bold whitespace-nowrap">
            ${car.pricePerDay}<span className="text-gray-400 text-xs font-normal">/day</span>
          </p>
        </div>

        <p className="text-gray-400 text-sm mb-4">{car.year}</p>

        {car.available ? (
          <button
            onClick={() => onBook(car)}
            className="w-full py-2.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer"
          >
            Book Now →
          </button>
        ) : (
          <button
            onClick={() => onCancel && bookingId && onCancel(bookingId)}
            disabled={!bookingId}
            className="w-full py-2.5 rounded-xl font-semibold text-sm bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
}
