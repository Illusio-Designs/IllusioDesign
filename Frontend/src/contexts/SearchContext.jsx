'use client';

import { createContext, useContext, useState } from 'react';

// Default value for SSR safety
const defaultContextValue = {
  searchQuery: '',
  updateSearch: () => {},
  clearSearch: () => {},
};

const SearchContext = createContext(defaultContextValue);

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');

  const updateSearch = (query) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <SearchContext.Provider value={{ searchQuery, updateSearch, clearSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  // Return context or default value (for SSR safety)
  return context || defaultContextValue;
}

