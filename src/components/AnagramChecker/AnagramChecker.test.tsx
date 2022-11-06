import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import AnagramChecker from "./AnagramChecker";

afterEach(() => {
  cleanup();
});

describe("Test AnagramChecker", () => {
  test("initial rendering", async () => {
    await render(<AnagramChecker />);

    expect(screen.queryByText("Anagram-Checker")).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Wählen Sie zwei Worte und schauen Sie ob es sich um Anagrame handelt."
      )
    ).toBeInTheDocument();

    expect(screen.getByLabelText("first-word")).toBeInTheDocument();
    expect(screen.getByLabelText("second-word")).toBeInTheDocument();
    expect(screen.getByLabelText("submit-button")).toBeInTheDocument();
  });

  test("enter anagrams", async () => {
    await render(<AnagramChecker />);

    const firstInput = screen.getByLabelText("first-word");
    const secondInput = screen.getByLabelText("second-word");
    const submitButton = screen.getByLabelText("submit-button");

    fireEvent.change(firstInput, { target: { value: "Steve" } });
    fireEvent.change(secondInput, { target: { value: "Evets" } });

    fireEvent.click(submitButton);

    expect(
      screen.queryByText("Steve und Evets sind Anagrame")
    ).toBeInTheDocument();
  });

    test("enter non-anagrams", async () => {
      await render(<AnagramChecker />);

      const firstInput = screen.getByLabelText("first-word");
      const secondInput = screen.getByLabelText("second-word");
      const submitButton = screen.getByLabelText("submit-button");

      fireEvent.change(firstInput, { target: { value: "Stefan" } });
      fireEvent.change(secondInput, { target: { value: "Evets" } });

      fireEvent.click(submitButton);
      expect(
        screen.queryByText("Stefan und Evets sind keine Anagrame")
      ).toBeInTheDocument();
    });

    test("enter anagrams and change to non-anagrams", async () => {
      await render(<AnagramChecker />);

      const firstInput = screen.getByLabelText("first-word");
      const secondInput = screen.getByLabelText("second-word");
      const submitButton = screen.getByLabelText("submit-button");

      fireEvent.change(firstInput, { target: { value: "Stefan" } });
      fireEvent.change(secondInput, { target: { value: "Evets" } });

      fireEvent.click(submitButton);
      expect(
        screen.queryByText("Stefan und Evets sind keine Anagrame")
      ).toBeInTheDocument();
    });
});
