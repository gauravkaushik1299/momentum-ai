import {
    CalendarDays,
    ChartColumn,
    CheckSquare,
    LayoutDashboard,
    Settings,
    Target,
} from 'lucide-react';

import { NavLink } from 'react-router-dom';

import { useApp } from '../../contexts/AppContext';

import styles from './Sidebar.module.css';

const Sidebar = () => {
    const { isSidebarCollapsed } = useApp();

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
            title: 'Settings',
            icon: Settings,
            path: '/settings',
        },
    ];

    return (
        <aside
            className={`${styles.sidebar} ${isSidebarCollapsed
                ? styles.collapsed
                : ''
                }`}
        >
            <div className={styles.logo}>
                <div className={styles.logoIcon}>
                    M
                </div>

                {!isSidebarCollapsed && (
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

                            {!isSidebarCollapsed && (
                                <span>{item.title}</span>
                            )}
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;