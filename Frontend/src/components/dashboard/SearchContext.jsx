'use client';

import { createContext, useContext, useState } from 'react';

const SearchContext = createContext({ query: '', setQuery: () => {} });

export const useDashSearch = () => useContext(SearchContext);

export function DashSearchProvider({ children }) {
  const [query, setQuery] = useState('');
  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
