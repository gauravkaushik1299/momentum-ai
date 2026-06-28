import Sidebar from './Sidebar';
import Topbar from './Topbar';

import styles from './AppLayout.module.css';

const AppLayout = ({ children }) => {
    return (
        <div className={styles.layout}>
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