import React, { FC } from 'react';
import { Button } from './ui/button';

type SearchButtonProps = {
  onClickHandle: () => void;
};

const SearchButton: FC<SearchButtonProps> = ({ onClickHandle }) => {
  return (
    <Button onClick={onClickHandle} variant="outline">
      Search
    </Button>
  );
};

export default React.memo(SearchButton);
