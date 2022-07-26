import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./App.scss";
import COLORS_ARRAY from "./colorsArray.js";

let quoteDBUrl =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState(
    "If you want to lift yourself up, lift up someone else."
  );
  const [author, setAuthor] = useState("Booker T. Washington");

  const [randomNumber, setRandomNumber] = useState(0);

  const [quotesArray, setQuotesArray] = useState(null);

  const [accentColor, setAccentColor] = useState("#FF6633");

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
  };

  useEffect(() => {
    fetchQuotes(quoteDBUrl);
  }, [quoteDBUrl]);

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random());
    setRandomNumber(randomInteger);
    setAccentColor(COLORS_ARRAY[randomInteger]);
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
  };

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: accentColor }}>
        <div id="quote-box" style={{ color: accentColor }}>
          <p id="text">"{quote}"</p>
          <p id="author">- {author}</p>
          <div className="buttons">
            <a
              href={`https://twitter.com/intent/tweet?text=${quote}-${author}`}
              id="tweet-quote"
              style={{ backgroundColor: accentColor }}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <button
              style={{ backgroundColor: accentColor }}
              id="new-quote"
              onClick={() => getRandomQuote()}
            >
              Generate a random quote
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
