/* eslint-disable react-refresh/only-export-components */

import {
    createContext,
    useContext,
    useMemo,
    useState,
} from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [theme, setTheme] = useState('light');

    const toggleSidebar = () => {
        setIsSidebarCollapsed((prev) => !prev);
    };

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const value = useMemo(
        () => ({
            isSidebarCollapsed,
            toggleSidebar,
            theme,
            toggleTheme,
        }),
        [isSidebarCollapsed, theme]
    );

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useApp must be used within AppProvider.');
    }

    return context;
};