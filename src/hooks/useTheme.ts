import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
/**
 * useTheme Hook
 *
 * A convenience hook that provides access to the theme context.
 * Allows components to access and modify the current theme.
 *
 * This hook is already defined in ThemeContext.tsx, but is duplicated here
 * for completeness and to follow the requested project structure.
 *
 * @returns {Object} The theme context containing current theme and setTheme function
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};