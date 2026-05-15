const express = require("express");
const { randomUUID } = require("crypto");
const { cars } = require("./data");
const db = require("./database");
const auth = require("./authMiddleware");

const router = express.Router();

router.get("/cars", (_req, res) => res.json(cars));

router.get("/cars/:id", (req, res) => {
  const car = cars.find((c) => c.id === req.params.id);
  if (!car) return res.status(404).json({ error: "Car not found" });
  res.json(car);
});

router.get("/bookings", auth, (req, res) => {
  const rows = db.prepare("SELECT * FROM bookings WHERE userId=? ORDER BY createdAt DESC").all(req.user.id);
  res.json(rows);
});

router.post("/bookings", auth, (req, res) => {
  const { carId, startDate, endDate } = req.body;
  if (!carId || !startDate || !endDate)
    return res.status(400).json({ error: "carId, startDate and endDate are required" });

  const car = cars.find((c) => c.id === carId);
  if (!car) return res.status(404).json({ error: "Car not found" });
  if (!car.available) return res.status(409).json({ error: "Car is not available" });

  const days = Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000);
  if (days <= 0) return res.status(400).json({ error: "End date must be after start date" });

  const booking = {
    id: randomUUID(), userId: req.user.id, carId,
    carName: `${car.make} ${car.model}`, carImage: car.image,
    customerName: req.user.name, customerEmail: req.user.email,
    startDate, endDate, totalPrice: days * car.pricePerDay,
    createdAt: new Date().toISOString(),
  };

  db.prepare(`INSERT INTO bookings (id,userId,carId,carName,carImage,customerName,customerEmail,startDate,endDate,totalPrice,createdAt)
    VALUES (?,?,?,?,?,?,?,?,?,?,?)`)
    .run(booking.id, booking.userId, booking.carId, booking.carName, booking.carImage,
      booking.customerName, booking.customerEmail, booking.startDate, booking.endDate,
      booking.totalPrice, booking.createdAt);

  car.available = false;
  res.status(201).json(booking);
});

router.delete("/bookings/:id", auth, (req, res) => {
  const booking = db.prepare("SELECT * FROM bookings WHERE id=? AND userId=?").get(req.params.id, req.user.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });

  db.prepare("DELETE FROM bookings WHERE id=?").run(req.params.id);
  const car = cars.find((c) => c.id === booking.carId);
  if (car) car.available = true;
  res.status(204).send();
});

module.exports = router;
