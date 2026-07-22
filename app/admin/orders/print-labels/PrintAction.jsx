'use client';
import { useEffect } from 'react';

export default function PrintAction() {
  useEffect(() => {
    // Automatically open print dialog when the page loads
    window.print();
  }, []);

  return (
    <div className="flex gap-4">
      <button 
        onClick={() => window.close()} 
        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>
      <button 
        onClick={() => window.print()} 
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
      >
        Print Labels
      </button>
    </div>
  );
}
