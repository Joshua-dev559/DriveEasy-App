import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import ProtectedRoute from "../components/ProtectedRoute";

vi.mock("../context/AuthContext", () => ({ useAuth: vi.fn() }));
import { useAuth } from "../context/AuthContext";

const wrap = (user) => {
  useAuth.mockReturnValue({ user });
  return render(
    <MemoryRouter initialEntries={["/protected"]}>
      <Routes>
        <Route path="/login" element={<p>Login</p>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/protected" element={<p>Protected</p>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

describe("ProtectedRoute", () => {
  it("renders children when authenticated", () => {
    wrap({ id: "1", name: "Jane" });
    expect(screen.getByText("Protected")).toBeInTheDocument();
  });

  it("redirects to login when not authenticated", () => {
    wrap(null);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
