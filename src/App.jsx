import React from 'react';
import { TextEditor } from './components/TextEditor';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          WriteBetter
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          AI-powered writing assistant that helps you write clearer, more professional content.
          No signup required to try!
        </p>
      </div>
      
      <TextEditor />
      
      <div className="text-center mt-12 text-gray-500">
        <p>Trusted by 10,000+ writers and professionals</p>
      </div>
    </div>
  );
}

export default App;
