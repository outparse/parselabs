import React from 'react';
import { Check, X } from 'lucide-react';

export const SuggestionBox = ({ error, onAccept, onIgnore, position }) => {
  if (!error) return null;

  const getErrorTypeColor = (type) => {
    switch (type) {
      case 'typo': return 'bg-red-50 border-red-200';
      case 'weak-word': return 'bg-yellow-50 border-yellow-200';
      case 'complex-word': return 'bg-blue-50 border-blue-200';
      case 'passive-voice': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getErrorTypeText = (type) => {
    switch (type) {
      case 'typo': return 'Spelling';
      case 'weak-word': return 'Word Choice';
      case 'complex-word': return 'Clarity';
      case 'passive-voice': return 'Voice';
      default: return 'Suggestion';
    }
  };

  return (
    <div 
      className={`absolute z-50 w-80 p-4 border rounded-lg shadow-lg ${getErrorTypeColor(error.type)}`}
      style={{ top: position.y, left: position.x }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          {getErrorTypeText(error.type)}
        </span>
        <button
          onClick={onIgnore}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{error.suggestion}</p>
      
      {error.replacement && (
        <div className="mb-3">
          <span className="text-sm text-gray-500">Suggestion: </span>
          <span className="text-sm font-medium bg-white px-2 py-1 rounded border">
            {error.replacement}
          </span>
        </div>
      )}
      
      <div className="flex gap-2">
        <button
          onClick={onAccept}
          className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
        >
          <Check size={14} />
          Accept
        </button>
        <button
          onClick={onIgnore}
          className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors"
        >
          Ignore
        </button>
      </div>
    </div>
  );
};
