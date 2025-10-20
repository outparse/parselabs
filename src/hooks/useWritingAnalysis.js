import { useState, useCallback } from 'react';
import { writingRules } from '../utils/writingRules';

export const useWritingAnalysis = () => {
  const [errors, setErrors] = useState([]);
  const [selectedError, setSelectedError] = useState(null);

  const analyzeText = useCallback((text) => {
    const detectedErrors = writingRules.analyzeText(text);
    setErrors(detectedErrors);
  }, []);

  const acceptSuggestion = useCallback((errorIndex, originalText) => {
    const error = errors[errorIndex];
    if (!error) return originalText;
    
    const before = originalText.slice(0, error.index);
    const after = originalText.slice(error.index + error.text.length);
    
    return before + (error.replacement || '') + after;
  }, [errors]);

  const ignoreSuggestion = useCallback((errorIndex) => {
    setErrors(prev => prev.filter((_, index) => index !== errorIndex));
  }, []);

  return {
    errors,
    selectedError,
    setSelectedError,
    analyzeText,
    acceptSuggestion,
    ignoreSuggestion
  };
};
