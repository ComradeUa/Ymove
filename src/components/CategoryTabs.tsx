import React, { FC } from 'react';

type CategoryTabsProps = {
  active: string;
  onChange: (category: string) => void;
};
const CategoryTabs: FC<CategoryTabsProps> = ({ active, onChange }) => {
  const categories: string[] = ['Streaming', 'On Tv', 'For Rent', 'In Theaters'];

  return (
    <div className="flex rounded-full border border-slate-800 overflow-hidden">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`px-5 py-2 text-sm font-medium transition-colors 
            ${
              active === category
                ? 'bg-slate-800 text-emerald-400'
                : 'bg-white text-slate-800 hover:bg-slate-100'
            }`}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
