import {
    Bell,
    ChevronDown,
    LogOut,
    Menu,
    Settings,
} from 'lucide-react';

import {
    useEffect,
    useRef,
    useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import useCurrentUser from '../../hooks/useCurrentUser';

import styles from './Topbar.module.css';

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

    const [menuOpen, setMenuOpen] =
        useState(false);

    const profileRef = useRef(null);

    /**
     * Close menu when clicking outside.
     */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener(
            'mousedown',
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            );
        };
    }, []);

    /**
     * Close menu on Escape key.
     */
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        };

        document.addEventListener(
            'keydown',
            handleEscape
        );

        return () => {
            document.removeEventListener(
                'keydown',
                handleEscape
            );
        };
    }, []);

    /**
     * Logout user.
     */
    const handleLogout = async () => {
        try {
            await logout();

            setMenuOpen(false);

            navigate('/login', {
                replace: true,
            });
        } catch (error) {
            console.error(
                'Logout failed:',
                error
            );
        }
    };

    return (
        <header className={styles.topbar}>
            <button
                className={styles.iconButton}
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
            >
                <Menu size={20} />
            </button>

            <div className={styles.right}>
                <button
                    className={styles.iconButton}
                    aria-label="Notifications"
                >
                    <Bell size={20} />
                </button>

                <div
                    className={styles.profile}
                    ref={profileRef}
                >
                    <button
                        className={styles.profileButton}
                        onClick={() =>
                            setMenuOpen(
                                (previous) =>
                                    !previous
                            )
                        }
                    >
                        {photoURL ? (
                            <img
                                src={photoURL}
                                alt={fullName}
                                className={styles.avatar}
                            />
                        ) : (
                            <div
                                className={
                                    styles.avatarFallback
                                }
                            >
                                {initials}
                            </div>
                        )}

                        <ChevronDown
                            size={18}
                            className={
                                menuOpen
                                    ? styles.rotate
                                    : ''
                            }
                        />
                    </button>

                    {menuOpen && (
                        <div
                            className={styles.menu}
                        >
                            <div
                                className={
                                    styles.userInfo
                                }
                            >
                                <strong>
                                    {fullName}
                                </strong>

                                <span>
                                    {email}
                                </span>
                            </div>

                            <button
                                className={
                                    styles.menuItem
                                }
                            >
                                <Settings
                                    size={16}
                                />

                                Settings
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
                                    size={16}
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