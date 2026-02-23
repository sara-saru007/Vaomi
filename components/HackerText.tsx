import React, { useState, useRef } from 'react';

interface HackerTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  speed?: number;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&";

const HackerText: React.FC<HackerTextProps> = ({ text, className = "", as: Component = "span", speed = 30 }) => {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const scramble = () => {
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, speed);
  };

  const Tag = Component as any;

  return (
    <Tag 
      className={`cursor-default ${className}`}
      onMouseEnter={scramble}
    >
      {display}
    </Tag>
  );
};

export default HackerText;