import * as React from 'react';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const _handleChange = (e: MediaQueryListEvent) => {
      const newDarkMode = e.matches;
      setIsDarkMode(newDarkMode);
    };

    darkModeMediaQuery.addEventListener('change', _handleChange);

    return () => {
      darkModeMediaQuery.removeEventListener('change', _handleChange);
    };
  }, []);

  return isDarkMode;
};

export default useTheme;
