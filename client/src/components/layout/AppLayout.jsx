import Sidebar from './Sidebar';
import Topbar from './Topbar';

import { useApp } from '../../contexts/AppContext';

import styles from './AppLayout.module.css';

const AppLayout = ({ children }) => {
    const { sidebarCollapsed } = useApp();

    return (
        <div
            className={styles.layout}
            data-sidebar-collapsed={sidebarCollapsed}
        >
            <Sidebar />

            <div className={styles.contentWrapper}>
                <Topbar />

                <main className={styles.pageContent}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AppLayout;