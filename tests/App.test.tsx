import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../src/App";

beforeEach(() => localStorage.clear());

describe("TypeSprint", () => {
  it("renders the test and updates character feedback while typing", () => {
    render(<App />);
    const input = screen.getByLabelText("Type the passage");
    const firstWord = (screen.getByLabelText("Typing passage").textContent ?? "")
      .split(" ")[0];
    fireEvent.change(input, { target: { value: firstWord } });
    expect(
      screen.getByLabelText("Typing passage").querySelectorAll(".correct"),
    ).toHaveLength(firstWord.length);
    expect(screen.getByText("WPM")).toBeInTheDocument();
  });

  it("switches between timed and word modes", () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole("button", { name: "Words" })[0]);
    expect(screen.getByText("25 words")).toBeInTheDocument();
  });

  it("switches passage style", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Sentences" }));
    expect(screen.getByRole("button", { name: "Sentences" })).toHaveClass(
      "selected",
    );
  });
});
