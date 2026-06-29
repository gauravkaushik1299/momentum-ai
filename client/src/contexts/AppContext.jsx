/* eslint-disable react-refresh/only-export-components */

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [sidebarCollapsed, setSidebarCollapsed] =
        useState(false);

    const [theme, setTheme] = useState(() => {
        return (
            localStorage.getItem("theme") ||
            "light"
        );
    });

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem(
            "theme",
            theme
        );
    }, [theme]);

    const toggleSidebar = () => {
        setSidebarCollapsed((previous) => !previous);
    };

    const toggleTheme = () => {
        setTheme((previous) =>
            previous === "light"
                ? "dark"
                : "light"
        );
    };

    const value = useMemo(
        () => ({
            sidebarCollapsed,

            toggleSidebar,

            theme,

            toggleTheme,
        }),
        [sidebarCollapsed, theme]
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
        throw new Error(
            "useApp must be used inside AppProvider."
        );
    }

    return context;
};