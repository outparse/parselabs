import React, { useState, useRef, useCallback } from 'react';
import { ErrorHighlighter } from './ErrorHighlighter';
import { SuggestionBox } from './SuggestionBox';
import { useWritingAnalysis } from '../hooks/useWritingAnalysis';

export const TextEditor = () => {
  const [text, setText] = useState('');
  const [suggestionPosition, setSuggestionPosition] = useState({ x: 0, y: 0 });
  const textareaRef = useRef(null);
  
  const {
    errors,
    selectedError,
    setSelectedError,
    analyzeText,
    acceptSuggestion,
    ignoreSuggestion
  } = useWritingAnalysis();

  const handleTextChange = useCallback((e) => {
    const newText = e.target.value;
    setText(newText);
    analyzeText(newText);
  }, [analyzeText]);

  const handleErrorClick = useCallback((errorIndex) => {
    const error = errors[errorIndex];
    if (!error || !textareaRef.current) return;

    const textarea = textareaRef.current;
    const rect = textarea.getBoundingClientRect();
    setSuggestionPosition({ x: rect.left + 20, y: rect.top + 100 });
    setSelectedError({ ...error, index: errorIndex });
  }, [errors, text]);

  const handleAcceptSuggestion = useCallback(() => {
    if (selectedError) {
      const newText = acceptSuggestion(selectedError.index, text);
      setText(newText);
      analyzeText(newText);
      setSelectedError(null);
    }
  }, [selectedError, acceptSuggestion, text, analyzeText]);

  const handleIgnoreSuggestion = useCallback(() => {
    if (selectedError) {
      ignoreSuggestion(selectedError.index);
      setSelectedError(null);
    }
  }, [selectedError, ignoreSuggestion]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg border">
        <div className="border-b p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Try Our Writing Assistant
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Start writing or paste your text below to see real-time suggestions
          </p>
        </div>
        
        <div className="p-6 relative">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              placeholder="Start writing here... The editor will highlight errors and suggest improvements in real-time."
              className="w-full h-64 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
            
            <div className="absolute inset-0 p-4 pointer-events-none">
              <div className="h-full w-full font-mono text-sm whitespace-pre-wrap">
                <ErrorHighlighter
                  text={text}
                  errors={errors}
                  onErrorClick={handleErrorClick}
                />
              </div>
            </div>
          </div>

          <SuggestionBox
            error={selectedError}
            onAccept={handleAcceptSuggestion}
            onIgnore={handleIgnoreSuggestion}
            position={suggestionPosition}
          />
        </div>

        <div className="border-t p-4 bg-gray-50 rounded-b-lg">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-100 border-red-300 border-2 rounded"></div>
                <span className="text-gray-600">Spelling</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-100 border-yellow-300 border-2 rounded"></div>
                <span className="text-gray-600">Word Choice</span>
              </div>
            </div>
            
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Sign Up for More Features
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
