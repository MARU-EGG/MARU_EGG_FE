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
    <div className="mb-4">
      <ul className="z-10 rounded-md bg-white">
        {results.map((result, index) => (
          <li
            key={index}
            className="cursor-pointer px-[16px] py-2 font-pretendard font-normal text-[#3A3A3A] hover:rounded-md hover:bg-[#F7F7F7]"
            onClick={() => onSelect(result.content)}
          >
            {result.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoCompleteList;
