import {
    CalendarDays,
    ChartColumn,
    CheckSquare,
    LayoutDashboard,
    User,
    Target,
} from 'lucide-react';

import { NavLink } from 'react-router-dom';

import { useApp } from '../../contexts/AppContext';

import styles from './Sidebar.module.css';

const Sidebar = () => {
    const { sidebarCollapsed } = useApp();

    const menuItems = [
        {
            title: 'Dashboard',
            icon: LayoutDashboard,
            path: '/dashboard',
        },
        {
            title: 'Tasks',
            icon: CheckSquare,
            path: '/tasks',
        },
        {
            title: 'Goals',
            icon: Target,
            path: '/goals',
        },
        {
            title: 'Calendar',
            icon: CalendarDays,
            path: '/calendar',
        },
        {
            title: 'Analytics',
            icon: ChartColumn,
            path: '/analytics',
        },
        {
            title: 'Profile',
            icon: User,
            path: '/profile',
        },
    ];

    return (
        <aside
            className={`${styles.sidebar} ${sidebarCollapsed
                ? styles.collapsed
                : ''
                }`}
        >
            <div className={styles.logo}>
                <div className={styles.logoIcon}>
                    M
                </div>

                {!sidebarCollapsed && (
                    <span>Momentum AI</span>
                )}
            </div>

            <nav className={styles.navigation}>
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.title}
                            to={item.path}
                            className={({ isActive }) =>
                                `${styles.navButton} ${isActive
                                    ? styles.active
                                    : ''
                                }`
                            }
                        >
                            <Icon size={20} />

                            {!sidebarCollapsed && (
                                <span>
                                    {item.title}
                                </span>
                            )}
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;