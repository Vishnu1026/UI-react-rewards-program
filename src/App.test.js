import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders the app correctly", () => {
    render(<App />);
    expect(screen.getByText("Rewards Program")).toBeInTheDocument();
    expect(screen.getByText("Rewards Point Calculator")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Amount Spent($)")).toBeInTheDocument();
    expect(screen.getByText("Calculate Points")).toBeInTheDocument();
  });
  test("calculates reward points correctly", () => {
    render(<App />);
    const amountInput = screen.getByPlaceholderText("Enter Amount Spent($)");
    const calculateButton = screen.getByText("Calculate Points");

    // Enter an amount greater than 100
    fireEvent.change(amountInput, { target: { value: "120" } });
    fireEvent.click(calculateButton);
    expect(screen.getByText("Reward Points: 90")).toBeInTheDocument();

    // Enter an amount between 50 and 100
    fireEvent.change(amountInput, { target: { value: "80" } });
    fireEvent.click(calculateButton);
    expect(screen.getByText("Reward Points: 30")).toBeInTheDocument();

    // Enter an amount less than 50
    fireEvent.change(amountInput, { target: { value: "30" } });
    fireEvent.click(calculateButton);
    expect(screen.getByText("Reward Points: 0")).toBeInTheDocument();
    expect(
      screen.getByText("Amount should be greater than $50")
    ).toBeInTheDocument();
  });
  test("toggles transactions visibility correctly", () => {
    render(<App />);
    const toggleButton = screen.getByText("Show Transactions");

    fireEvent.click(toggleButton);
    expect(screen.getByText("Hide Transactions")).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByText("Show Transactions")).toBeInTheDocument();
  });
});