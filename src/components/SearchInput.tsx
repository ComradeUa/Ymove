import React, { type FC } from 'react';
import { Input } from './ui/input';

type SearchInputProps = {
  value: string;
  onChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleSearch: () => void;
};
const SearchInput: FC<SearchInputProps> = ({ value, onChangeQuery, onHandleSearch }) => {
  return (
    <div className="flex justify-center gap-4 mb-5">
      <Input
        type="text"
        value={value}
        placeholder={value}
        onChange={onChangeQuery}
        className="w-[50%]"
        onKeyDown={(e) => e.key == 'Enter' && onHandleSearch()}
      />
    </div>
  );
};

export default SearchInput;
