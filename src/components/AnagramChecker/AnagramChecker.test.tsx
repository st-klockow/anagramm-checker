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

    expect(
      screen.queryByText("es handelt sich um Anagrame")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("es handelt sich nicht um Anagrame")
    ).not.toBeInTheDocument();
  });

  test("enter anagrams", async () => {
    await render(<AnagramChecker />);

    const firstInput = screen.getByLabelText("first-word");
    const secondInput = screen.getByLabelText("second-word");
    const submitButton = screen.getByLabelText("submit-button");

    fireEvent.change(firstInput, { target: { value: "Steve" } });
    fireEvent.change(secondInput, { target: { value: "Evets" } });

    expect(
      screen.queryByText("es handelt sich um Anagrame")
    ).not.toBeInTheDocument();

    fireEvent.click(submitButton);
    expect(
      screen.queryByText("es handelt sich um Anagrame")
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
      screen.queryByText("es handelt sich nicht um Anagrame")
    ).toBeInTheDocument();
  });

  test("enter anagrams and change to non-anagrams", async () => {
    await render(<AnagramChecker />);

    const firstInput = screen.getByLabelText("first-word");
    const secondInput = screen.getByLabelText("second-word");
    const submitButton = screen.getByLabelText("submit-button");

    // enter anagrams
    fireEvent.change(firstInput, { target: { value: "Steve" } });
    fireEvent.change(secondInput, { target: { value: "Evets" } });

    fireEvent.click(submitButton);
    expect(
      screen.queryByText("es handelt sich um Anagrame")
    ).toBeInTheDocument();

    // change first word
    fireEvent.change(firstInput, { target: { value: "Steven" } });

    fireEvent.click(submitButton);
    expect(
      screen.queryByText("es handelt sich nicht um Anagrame")
    ).toBeInTheDocument();
  });
});
