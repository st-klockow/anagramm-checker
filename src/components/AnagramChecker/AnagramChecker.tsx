import { useState, useRef } from "react";

const AnagramChecker = () => {
  const firstWord = useRef<HTMLInputElement>(null);
  const secondWord = useRef<HTMLInputElement>(null);

  const [anagram, setAnagram] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const isAnagram = () => {

    const result = () => {
      /**
       * checks if two strings are an anagram
       * words are getting sorted alphabetically and compared
       *
       * @returns {boolean} - returns true if the words are anagrams and false if they are not
       */

      if (firstWord.current?.value.length !== secondWord.current?.value.length)
        return false;

      // lowercase both words and sort alphabetically
      const sortedFirstWord = firstWord.current?.value
        .toLocaleLowerCase()
        .split("")
        .sort()
        .join("");
      const sortedSecondWord = secondWord.current?.value
        .toLocaleLowerCase()
        .split("")
        .sort()
        .join("");

      if (sortedFirstWord !== sortedSecondWord) return false;
      return true;
    };

    setAnagram(result);

    // renders the result after the first test
    setShowResult(true);
  };

  return (
    <div>
      <h1>Anagram-Checker</h1>
      <p>
        Wählen Sie zwei Worte und schauen Sie ob es sich um Anagrame handelt.
      </p>
      <input placeholder="erstes Wort" ref={firstWord} />
      <input placeholder="zweites Wort" ref={secondWord} />
      <button onClick={isAnagram} role="">
        testen
      </button>

      {
        // initially it's hidden, but rendered after the first test
        showResult ? (
          anagram ? (
            <p>es handelt sich um Anagrame</p>
          ) : (
            <p>es handelt sich nicht um Anagrame</p>
          )
        ) : null
      }
    </div>
  );
};
export default AnagramChecker;
