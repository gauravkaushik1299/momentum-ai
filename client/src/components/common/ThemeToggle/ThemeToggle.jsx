import { Moon, Sun } from "lucide-react";

import { useApp } from "../../../contexts/AppContext";

import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
    const {
        theme,
        toggleTheme,
    } = useApp();

    return (
        <button
            className={styles.toggle}
            onClick={toggleTheme}
            aria-label="Toggle Theme"
        >
            <Sun
                size={17}
                className={
                    theme === "light"
                        ? styles.active
                        : ""
                }
            />

            <div
                className={`${styles.knob} ${theme === "dark"
                    ? styles.dark
                    : ""
                    }`}
            />

            <Moon
                size={17}
                className={
                    theme === "dark"
                        ? styles.active
                        : ""
                }
            />
        </button>
    );
};

export default ThemeToggle;