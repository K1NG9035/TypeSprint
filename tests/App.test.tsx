import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../src/App";

beforeEach(() => localStorage.clear());

describe("TypeSprint", () => {
  it("renders the test and updates character feedback while typing", () => {
    render(<App />);
    const input = screen.getByLabelText("Type the passage");
    fireEvent.change(input, { target: { value: "bright" } });
    expect(
      screen.getByLabelText("Typing passage").querySelectorAll(".correct"),
    ).toHaveLength(6);
    expect(screen.getByText("WPM")).toBeInTheDocument();
  });

  it("switches between timed and word modes", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Words"));
    expect(screen.getByText("25 words")).toBeInTheDocument();
  });
});
