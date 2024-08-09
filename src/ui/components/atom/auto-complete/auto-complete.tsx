import React from 'react';
import { AutoCompleteResult } from '../../../../hooks/use-auto-complete.hooks';

interface AutoCompleteListProps {
  results: AutoCompleteResult[];
  onSelect: (content: string) => void;
}

const AutoCompleteList: React.FC<AutoCompleteListProps> = ({ results, onSelect }) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <ul className="z-10 mt-2 rounded-md border border-gray-300 bg-white shadow-lg">
      {results.map((result, index) => (
        <li key={index} className="cursor-pointer px-4 py-2 hover:bg-gray-200" onClick={() => onSelect(result.content)}>
          {result.content}
        </li>
      ))}
    </ul>
  );
};

export default AutoCompleteList;
