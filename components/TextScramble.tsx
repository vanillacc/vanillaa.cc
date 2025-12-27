import React, { useEffect, useState, useRef, useCallback } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  revealSpeed?: number;
  startDelay?: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/*-._';

const TextScramble: React.FC<TextScrambleProps> = ({ 
  text, 
  className,
  scrambleSpeed = 30, 
  revealSpeed = 0.5,
  startDelay = 0
}) => {
  const [displayText, setDisplayText] = useState(() => 
    text.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
  );
  
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);
    
    let iteration = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsScrambling(false);
      }

      iteration += revealSpeed;
    }, scrambleSpeed);
  }, [text, scrambleSpeed, revealSpeed, isScrambling]);

  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      scramble();
    }, startDelay);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startDelay, scramble]); 

  return (
    <span 
      className={`${className} inline-block`}
      aria-label={text}
    >
      {displayText}
    </span>
  );
};

export default TextScramble;
