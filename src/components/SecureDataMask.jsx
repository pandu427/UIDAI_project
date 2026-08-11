import { useEffect, useRef, useState } from "react";
import "./SecureDataMask.css";

const MASK_CHARACTER = "X";
const REVEAL_DURATION = 10000;

const maskSensitiveValue = (value) => {
  if (!value) return "";

  const cleanValue = String(value);

  if (cleanValue.length <= 4) {
    return MASK_CHARACTER.repeat(cleanValue.length);
  }

  const visiblePart = cleanValue.slice(-4);
  const maskedLength = cleanValue.length - 4;

  return `${MASK_CHARACTER.repeat(maskedLength)}${visiblePart}`;
};

const formatValue = (value) => {
  if (!value) return "";
  const cleanValue = String(value);

  if (cleanValue.length === 12) {
    return `${cleanValue.slice(0, 4)}-${cleanValue.slice(4, 8)}-${cleanValue.slice(8)}`;
  }

  return cleanValue;
};

const SecureDataMask=({ value, label = "Sensitive data", iconOnly = true }) =>{
  const [revealedValue, setRevealedValue] = useState(null);
  const timeoutRef = useRef(null);
  const isRevealed = revealedValue !== null;

  const clearRevealTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const hideSensitiveValue = () => {
    clearRevealTimeout();
    setRevealedValue(null);
  };

  const revealSensitiveValue = () => {
    clearRevealTimeout();
    setRevealedValue(String(value));

    timeoutRef.current = setTimeout(() => {
      setRevealedValue(null);
      timeoutRef.current = null;
    }, REVEAL_DURATION);
  };

  useEffect(() => {
    return () => clearRevealTimeout();
  }, []);

  useEffect(() => {
    clearRevealTimeout();
    setRevealedValue(null);
  }, [value]);

  const displayedValue = isRevealed
    ? formatValue(revealedValue)
    : formatValue(maskSensitiveValue(value));

  return (
    <div className="secure-data">
      <div
        className="secure-data__value"
        aria-label={isRevealed ? `${label} revealed` : `${label} masked`}
      >
        {displayedValue}
      </div>

      <button
        type="button"
        className={`secure-data__button ${iconOnly ? "secure-data__button--icon" : ""}`}
        onClick={isRevealed ? hideSensitiveValue : revealSensitiveValue}
        aria-label={isRevealed ? `Hide ${label}` : `Reveal ${label}`}
        aria-pressed={isRevealed}
      >
        {iconOnly ? (
          <>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              {isRevealed ? <><path d="M3 3l18 18" /><path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" /><path d="M9.9 5.1A10.6 10.6 0 0 1 12 4.9c5.2 0 8.7 5.1 8.7 7.1a9.7 9.7 0 0 1-2.2 3.5" /><path d="M6.1 6.2C3.8 8 3.3 10.4 3.3 12c0 2 3.5 7.1 8.7 7.1 1.2 0 2.3-.3 3.3-.8" /></> : <><path d="M2.8 12S6.2 5.1 12 5.1 21.2 12 21.2 12 17.8 18.9 12 18.9 2.8 12 2.8 12Z" /><circle cx="12" cy="12" r="2.7" /></>}
            </svg>
            <span className="sr-only">{isRevealed ? "Hide" : "Reveal"}</span>
          </>
        ) : (isRevealed ? "Hide" : "Tap to Reveal")}
      </button>

      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {isRevealed ? `${label} revealed` : `${label} is masked`}
      </span>
    </div>
  );
}

export default SecureDataMask;
