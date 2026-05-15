import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CarCard from "../components/CarCard";

const car = { id: "1", make: "Toyota", model: "Camry", year: 2022, pricePerDay: 55, available: true, category: "Sedan", image: "" };

describe("CarCard", () => {
  it("renders car details", () => {
    render(<CarCard car={car} onBook={() => {}} />);
    expect(screen.getByText("Toyota")).toBeInTheDocument();
    expect(screen.getByText(/\$55/)).toBeInTheDocument();
    expect(screen.getByText("Sedan")).toBeInTheDocument();
  });

  it("calls onBook when Book Now is clicked", () => {
    const onBook = vi.fn();
    render(<CarCard car={car} onBook={onBook} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onBook).toHaveBeenCalledWith(car);
  });

  it("shows Cancel Booking button when car is unavailable", () => {
    render(<CarCard car={{ ...car, available: false }} onBook={() => {}} />);
    expect(screen.getByText("Cancel Booking")).toBeInTheDocument();
  });
});
