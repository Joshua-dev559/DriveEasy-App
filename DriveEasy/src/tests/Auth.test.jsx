import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const mockLogin    = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../context/AuthContext", () => ({ useAuth: () => ({ login: mockLogin }) }));
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});
vi.mock("../api", () => ({
  loginUser:    vi.fn().mockResolvedValue({ token: "tok", user: { id: "1", name: "Jane", email: "jane@example.com" } }),
  registerUser: vi.fn().mockResolvedValue({ token: "tok", user: { id: "2", name: "Bob",  email: "bob@example.com" } }),
}));

const wrap = (ui) =>
  render(<MemoryRouter initialEntries={["/"]}><Routes><Route path="*" element={ui} /></Routes></MemoryRouter>);

describe("LoginPage", () => {
  beforeEach(() => { mockLogin.mockReset(); mockNavigate.mockReset(); });

  it("renders email and password fields", () => {
    wrap(<LoginPage />);
    expect(screen.getByPlaceholderText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
  });

  it("calls loginUser and login on submit", async () => {
    const { loginUser } = await import("../api");
    const user = userEvent.setup();
    wrap(<LoginPage />);
    await user.type(screen.getByPlaceholderText("jane@example.com"), "jane@example.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "secret123");
    fireEvent.submit(screen.getByPlaceholderText("••••••••").closest("form"));
    await waitFor(() => expect(loginUser).toHaveBeenCalledWith({ email: "jane@example.com", password: "secret123" }));
    await waitFor(() => expect(mockLogin).toHaveBeenCalled());
  });

  it("shows error on failed login", async () => {
    const { loginUser } = await import("../api");
    loginUser.mockRejectedValueOnce({ response: { data: { error: "Invalid email or password" } } });
    const user = userEvent.setup();
    wrap(<LoginPage />);
    await user.type(screen.getByPlaceholderText("jane@example.com"), "bad@example.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "wrong");
    fireEvent.submit(screen.getByPlaceholderText("••••••••").closest("form"));
    await waitFor(() => expect(screen.getByText("Invalid email or password")).toBeInTheDocument());
  });
});

describe("RegisterPage", () => {
  beforeEach(() => { mockLogin.mockReset(); mockNavigate.mockReset(); });

  it("renders all fields", () => {
    wrap(<RegisterPage />);
    expect(screen.getByPlaceholderText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("jane@example.com")).toBeInTheDocument();
  });

  it("calls registerUser and navigates on success", async () => {
    const { registerUser } = await import("../api");
    const user = userEvent.setup();
    wrap(<RegisterPage />);
    await user.type(screen.getByPlaceholderText("Jane Doe"), "Bob");
    await user.type(screen.getByPlaceholderText("jane@example.com"), "bob@example.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "pass1234");
    fireEvent.submit(screen.getByPlaceholderText("••••••••").closest("form"));
    await waitFor(() => expect(registerUser).toHaveBeenCalledWith({ name: "Bob", email: "bob@example.com", password: "pass1234" }));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
  });

  it("shows error on duplicate email", async () => {
    const { registerUser } = await import("../api");
    registerUser.mockRejectedValueOnce({ response: { data: { error: "Email already registered" } } });
    const user = userEvent.setup();
    wrap(<RegisterPage />);
    await user.type(screen.getByPlaceholderText("Jane Doe"), "Jane");
    await user.type(screen.getByPlaceholderText("jane@example.com"), "jane@example.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "pass1234");
    fireEvent.submit(screen.getByPlaceholderText("••••••••").closest("form"));
    await waitFor(() => expect(screen.getByText("Email already registered")).toBeInTheDocument());
  });
});
