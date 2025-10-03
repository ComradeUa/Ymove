import React, { type FC } from 'react';
import { Input } from './ui/input';

type SearchInputProps = {
  value: string;
  onChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleSearch: () => void;
};

const SearchInput: FC<SearchInputProps> = ({ value, onChangeQuery, onHandleSearch }) => {
  return (
    <div className="flex justify-center mb-5 px-4">
      <Input
        type="text"
        value={value}
        placeholder="Search movies..."
        onChange={onChangeQuery}
        onKeyDown={(e) => e.key === 'Enter' && onHandleSearch()}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl"
      />
    </div>
  );
};

export default SearchInput;
