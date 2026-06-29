import AppLayout from '../../components/layout/AppLayout';
import PageHeader from '../../components/common/PageHeader';

import ProfileSection from '../../components/settings/ProfileSection';
import ProductivitySection from '../../components/settings/ProductivitySection';


import styles from './SettingsPage.module.css';

const SettingsPage = () => {
    return (
        <AppLayout>
            <div className={styles.page}>
                <PageHeader
                    title="Settings"
                    subtitle="Customize your Momentum AI experience."
                />

                <ProfileSection />

                <ProductivitySection />


            </div>
        </AppLayout>
    );
};

export default SettingsPage;