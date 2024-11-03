import React, { useEffect } from 'react';

const ThemeManager = () => {
    const setThemeBasedOnTime = () => {
        const hour = new Date().getHours();
        return hour >= 18 || hour < 6; // 6 PM to 6 AM
    };

    useEffect(() => {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const timeBasedDark = setThemeBasedOnTime();
        const initialMode = prefersDark || timeBasedDark;

        // Apply the theme
        document.body.classList.toggle('dark-mode', initialMode);

        // Set up a listener for system preference changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            const newMode = e.matches || setThemeBasedOnTime();
            document.body.classList.toggle('dark-mode', newMode);
        };
        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return null; // This component does not render anything
};

export default ThemeManager; 