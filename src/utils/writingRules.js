export const writingRules = {
  commonTypos: {
    'teh': 'the', 'adn': 'and', 'recieve': 'receive', 'seperate': 'separate',
    'occured': 'occurred', 'definately': 'definitely', 'arguement': 'argument'
  },
  
  weakWords: ['very', 'really', 'just', 'quite', 'somewhat', 'actually', 'basically'],
  
  complexWords: {
    'utilize': 'use', 'terminate': 'end', 'commence': 'start', 'approximately': 'about',
    'facilitate': 'help', 'implement': 'start', 'leverage': 'use'
  },
  
  checkPassiveVoice: (text) => {
    const passivePatterns = [
      /\b(am|is|are|was|were|be|being|been)\s+\w+ed\b/gi,
      /\b(get|gets|got|gotten)\s+\w+ed\b/gi
    ];
    
    const matches = [];
    passivePatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        matches.push({
          text: match[0],
          index: match.index,
          type: 'passive-voice',
          suggestion: 'Consider using active voice',
          replacement: match[0] // In real app, you'd generate active voice alternative
        });
      }
    });
    return matches;
  },
  
  analyzeText: (text) => {
    const errors = [];
    
    // Check for common typos
    Object.entries(writingRules.commonTypos).forEach(([wrong, correct]) => {
      const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        errors.push({
          text: match[0],
          index: match.index,
          type: 'typo',
          suggestion: `Did you mean "${correct}"?`,
          replacement: correct
        });
      }
    });
    
    // Check for weak words
    writingRules.weakWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        errors.push({
          text: match[0],
          index: match.index,
          type: 'weak-word',
          suggestion: `"${word}" can often be removed for stronger writing`,
          replacement: '' // Suggest removal
        });
      }
    });
    
    // Check for complex words
    Object.entries(writingRules.complexWords).forEach(([complex, simple]) => {
      const regex = new RegExp(`\\b${complex}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        errors.push({
          text: match[0],
          index: match.index,
          type: 'complex-word',
          suggestion: `Consider using "${simple}" for clearer writing`,
          replacement: simple
        });
      }
    });
    
    // Check passive voice
    errors.push(...writingRules.checkPassiveVoice(text));
    
    return errors.sort((a, b) => a.index - b.index);
  }
};
