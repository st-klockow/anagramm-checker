import { useState, useRef, RefObject } from "react";

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

  return (
    <div>
      <h1>Anagram-Checker</h1>
      <p>
        Wählen Sie zwei Worte und schauen Sie ob es sich um Anagrame handelt.
      </p>
      <input
        placeholder="erstes Wort"
        ref={firstWord}
        aria-label="first-word"
      />
      <input
        placeholder="zweites Wort"
        ref={secondWord}
        aria-label="second-word"
      />
      <button onClick={isAnagram} aria-label="submit-button">
        testen
      </button>

      {showResult ? (
        anagram ? (
          <p>es handelt sich um Anagrame</p>
        ) : (
          <p>es handelt sich nicht um Anagrame</p>
        )
      ) : null}
    </div>
  );
};
export default AnagramChecker;
