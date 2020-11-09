import React from 'react';

export const ThemeContext = React.createContext('light');

const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider value="dark">
    {children}
  </ThemeContext.Provider>
);
export default ThemeProvider;
