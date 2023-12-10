import { useState, useEffect } from 'react';
import './spanish.css';

// interface for properly pulling out translation from api
interface TranslationResponse {
  data: {
    translatedText: string;
  };
}
// interface to take only a string and retrun a string
interface TranslationState {
  inputText: string;
  translatedText: string;
}

const SpanishTranslation = () => {
  const [state, setState] = useState<TranslationState>
  // objects with states of a empty strings
  ({ inputText: '',
    translatedText: '' });

  const englishTranslate = async () => {
    try {
      const response = await fetch('https://text-translator2.p.rapidapi.com/translate', {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': '82f97c2969msh293ef0de2213793p1eeeddjsn2a857197075c',
          'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
        },
        body: new URLSearchParams({
          // takes in only english 
          // and returns in spanish 
          source_language: 'en',
          target_language: 'es',
          text: state.inputText,
        }),
      });

      const data: TranslationResponse = await response.json();

      console.log(data);

      // this took me forever this is whats properly extracting the translated text from the response
      const translatedText = data.data.translatedText;

      setState((spanish) => ({ ...spanish, translatedText }));
      console.log('Translated Text:', translatedText);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (state.inputText.trim() === '') {
      // If inputText is empty or only contains whitespace, hide the translated text
      setState((spanish) => ({ ...spanish, translatedText: '' }));
    } else {
      // Otherwise, perform the translation
      englishTranslate();
    }
  }, [state.inputText]);

  return (
    <div className="translation-container">
      <h1>English to Spanish</h1>
      <div className="input-container">
        <input
          value={state.inputText}
          onChange={(event) => setState((spanish) => ({ ...spanish, inputText: event.target.value }))}
          placeholder="Translate to Spanish!!"
        />
      </div>
      {state.translatedText !== '' && (
        <div className="output-container">
          <h2>Translated Text:</h2>
          <p>{state.translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default SpanishTranslation;

