import {
    Bell,
    ChevronDown,
    LogOut,
    Menu,
    User,
} from "lucide-react";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import ThemeToggle from "../common/ThemeToggle/ThemeToggle";
import useAnalytics from "../../hooks/useAnalytics";
import useCurrentUser from "../../hooks/useCurrentUser";

import NotificationsDropdown from "./NotificationsDropdown";

import styles from "./Topbar.module.css";

/**
 * Application top navigation bar.
 */
const Topbar = () => {
    const { toggleSidebar } = useApp();

    const { logout } = useAuth();

    const navigate = useNavigate();

    const {
        fullName,
        email,
        photoURL,
        initials,
    } = useCurrentUser();

    const {
        overdueTasks,
        dueTodayTasks,
        activeGoals,
    } = useAnalytics();

    const notificationCount =
        overdueTasks.length +
        dueTodayTasks.length +
        (activeGoals > 0 ? 1 : 0);

    const [menuOpen, setMenuOpen] =
        useState(false);

    const [imageError, setImageError] =
        useState(false);

    const [
        notificationsOpen,
        setNotificationsOpen,
    ] = useState(false);

    const profileRef = useRef(null);

    const notificationRef =
        useRef(null);

    /*
    =====================================
    Close dropdowns when clicking outside
    =====================================
    */

    useEffect(() => {
        const handleClickOutside = (
            event
        ) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(
                    event.target
                )
            ) {
                setMenuOpen(false);
            }

            if (
                notificationRef.current &&
                !notificationRef.current.contains(
                    event.target
                )
            ) {
                setNotificationsOpen(
                    false
                );
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    /*
    =====================================
    Close on Escape
    =====================================
    */

    useEffect(() => {
        const handleEscape = (
            event
        ) => {
            if (
                event.key === "Escape"
            ) {
                setMenuOpen(false);

                setNotificationsOpen(
                    false
                );
            }
        };

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, []);

    /*
    =====================================
    Settings
    =====================================
    */

    const handleOpenSettings = () => {
        setMenuOpen(false);

        navigate("/settings");
    };

    /*
    =====================================
    Logout
    =====================================
    */

    const handleLogout = async () => {
        try {
            await logout();

            setMenuOpen(false);

            navigate("/login", {
                replace: true,
            });
        } catch (error) {
            console.error(
                "Logout failed:",
                error
            );
        }
    };

    return (
        <header
            className={styles.topbar}
        >
            <button
                className={
                    styles.iconButton
                }
                onClick={
                    toggleSidebar
                }
                aria-label="Toggle Sidebar"
            >
                <Menu size={20} />
            </button>

            <div
                className={styles.right}
            >
                <ThemeToggle />


                {/* ==========================
                    Notifications
                ========================== */}

                <div
                    className={
                        styles.notification
                    }
                    ref={
                        notificationRef
                    }
                >
                    <button
                        className={
                            styles.iconButton
                        }
                        aria-label="Notifications"
                        onClick={() => {
                            setMenuOpen(
                                false
                            );

                            setNotificationsOpen(
                                (
                                    previous
                                ) =>
                                    !previous
                            );
                        }}
                    >
                        <Bell size={20} />

                        {notificationCount >
                            0 && (
                                <span
                                    className={
                                        styles.badge
                                    }
                                >
                                    {notificationCount >
                                        9
                                        ? "9+"
                                        : notificationCount}
                                </span>
                            )}
                    </button>

                    {notificationsOpen && (
                        <NotificationsDropdown />
                    )}
                </div>

                {/* ==========================
                    Profile
                ========================== */}

                <div
                    className={
                        styles.profile
                    }
                    ref={profileRef}
                >
                    <button
                        className={
                            styles.profileButton
                        }
                        onClick={() => {
                            setNotificationsOpen(
                                false
                            );

                            setMenuOpen(
                                (
                                    previous
                                ) =>
                                    !previous
                            );
                        }}
                    >
                        {photoURL && !imageError ? (
                            <img
                                src={photoURL}
                                alt={fullName}
                                className={styles.avatar}
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className={styles.avatarFallback}>
                                {initials}
                            </div>
                        )}

                        <ChevronDown
                            size={18}
                            className={
                                menuOpen
                                    ? styles.rotate
                                    : ""
                            }
                        />
                    </button>

                    {menuOpen && (
                        <div
                            className={
                                styles.menu
                            }
                        >
                            <div
                                className={
                                    styles.userInfo
                                }
                            >
                                <strong>
                                    {
                                        fullName
                                    }
                                </strong>

                                <span>
                                    {email}
                                </span>
                            </div>

                            <button
                                className={
                                    styles.menuItem
                                }
                                onClick={
                                    handleOpenSettings
                                }
                            >
                                <User
                                    size={
                                        16
                                    }
                                />

                                Profile
                            </button>

                            <hr
                                className={
                                    styles.divider
                                }
                            />

                            <button
                                className={
                                    styles.menuItem
                                }
                                onClick={
                                    handleLogout
                                }
                            >
                                <LogOut
                                    size={
                                        16
                                    }
                                />

                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Topbar;