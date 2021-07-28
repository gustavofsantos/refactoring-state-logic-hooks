import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

const emailField = () =>
  screen.getByPlaceholderText(/e-mail/i);
const passwordField = () =>
  screen.getByPlaceholderText(/password/i);
const loginButton = () => screen.getByTitle(/login/i);

describe("Login form", () => {
  it("Should render e-mail and password as empty fields", () => {
    render(<App />);

    expect(emailField()).toHaveValue("");
    expect(passwordField()).toHaveValue("");
    expect(loginButton()).toBeDisabled();
  });

  it("Should allow submit valid e-mail and password", () => {
    render(<App />);

    const email = "user@email.com";
    const password = "password12345";

    user.type(emailField(), email);
    user.type(passwordField(), password);

    expect(loginButton()).not.toBeDisabled();
  });

  it("Should not allow submit with invalid email", () => {
    render(<App />);

    const email = "";
    const password = "password12345";

    user.type(emailField(), email);
    user.type(passwordField(), password);

    expect(loginButton()).toBeDisabled();
  });

  it("Should not allow submit with invalid password", () => {
    render(<App />);

    const email = "user@email.com";
    const password = "pass";

    user.type(emailField(), email);
    user.type(passwordField(), password);

    expect(loginButton()).toBeDisabled();
  });
});
