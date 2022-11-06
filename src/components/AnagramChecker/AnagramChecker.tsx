import { useState, useRef, RefObject } from "react";
import { styled } from "@mui/material";

const AnagramChecker = () => {
  const firstWord = useRef<HTMLInputElement>(null);
  const secondWord = useRef<HTMLInputElement>(null);

  const [anagram, setAnagram] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const formatStrings = (word: RefObject<HTMLInputElement>) => {
    /**
     * formats and sorts input-string alphabetically
     *
     * @param {RefObject<HTMLInputElement>} word - The input value.
     * @returns {string} - returns the alphabetically sorted string
     */
    return word.current?.value?.toLocaleLowerCase().split("").sort().join("");
  };

  const isAnagram = () => {
    const createResult = () => {
      /**
       * checks if two strings are anagrams
       *
       * @returns {boolean} - returns true if the words are anagrams and false if they are not
       */

      const sortedFirstWord = formatStrings(firstWord);
      const sortedSecondWord = formatStrings(secondWord);

      if (sortedFirstWord !== sortedSecondWord) return false;
      return true;
    };

    setAnagram(createResult);

    // renders the result after the first test
    setShowResult(true);
  };

  const Container = styled("section")({
    padding: 20,
    fontFamily: "sans-serif",
  });

  const Input = styled("input")({
    padding: 5,
    marginRight: 5,
  });
  const Button = styled("button")({
    padding: "5px 10px",
  })

  return (
    <Container>
      <h1>Anagram-Checker</h1>
      <p>
        Wählen Sie zwei Worte und schauen Sie ob es sich um Anagrame handelt.
      </p>
      <Input
        placeholder="erstes Wort"
        ref={firstWord}
        aria-label="first-word"
      />
      <Input
        placeholder="zweites Wort"
        ref={secondWord}
        aria-label="second-word"
      />
      <Button onClick={isAnagram} aria-label="submit-button">
        testen
      </Button>

      {showResult ? (
        anagram ? (
          <p>es handelt sich um Anagrame</p>
        ) : (
          <p>es handelt sich nicht um Anagrame</p>
        )
      ) : null}
    </Container>
  );
};
export default AnagramChecker;
