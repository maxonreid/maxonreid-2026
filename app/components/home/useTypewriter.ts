import { useState, useEffect } from 'react';

export function useTypewriter(texts: string[], typingSpeed = 80, pauseTime = 3000, fadeSpeed = 15) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(() => {
      if (!isFading) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsFading(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        } else {
          setIsFading(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isFading ? fadeSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isFading, textIndex, texts, typingSpeed, fadeSpeed, pauseTime]);

  return displayText;
}
