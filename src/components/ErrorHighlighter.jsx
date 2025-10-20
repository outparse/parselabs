import React from 'react';

export const ErrorHighlighter = ({ text, errors, onErrorClick }) => {
  if (!text) return null;

  const segments = [];
  let lastIndex = 0;

  errors.forEach((error, index) => {
    if (error.index > lastIndex) {
      segments.push({
        text: text.slice(lastIndex, error.index),
        type: 'normal'
      });
    }

    segments.push({
      text: error.text,
      type: error.type,
      errorIndex: index
    });

    lastIndex = error.index + error.text.length;
  });

  if (lastIndex < text.length) {
    segments.push({
      text: text.slice(lastIndex),
      type: 'normal'
    });
  }

  const getHighlightClass = (type) => {
    switch (type) {
      case 'typo': return 'bg-red-100 border-b-2 border-red-300 cursor-pointer';
      case 'weak-word': return 'bg-yellow-100 border-b-2 border-yellow-300 cursor-pointer';
      case 'complex-word': return 'bg-blue-100 border-b-2 border-blue-300 cursor-pointer';
      case 'passive-voice': return 'bg-purple-100 border-b-2 border-purple-300 cursor-pointer';
      default: return '';
    }
  };

  return (
    <div className="whitespace-pre-wrap">
      {segments.map((segment, index) => (
        <span
          key={index}
          className={getHighlightClass(segment.type)}
          onClick={() => segment.errorIndex !== undefined && onErrorClick(segment.errorIndex)}
        >
          {segment.text}
        </span>
      ))}
    </div>
  );
};
