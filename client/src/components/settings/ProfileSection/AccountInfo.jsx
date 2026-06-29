import {
    CalendarDays,
    CheckCircle2,
    LogIn,
    ShieldCheck,
} from 'lucide-react';

import SettingsCard from '../SettingsCard';

import { useAuth } from '../../../contexts/AuthContext';

import styles from './AccountInfo.module.css';

const AccountInfo = () => {
    const { user } = useAuth();

    return (
        <SettingsCard
            title="Account Information"
            description="Your authentication details."
        >
            <div className={styles.grid}>
                <div className={styles.item}>
                    <ShieldCheck size={20} />

                    <div>
                        <strong>Provider</strong>

                        <span>Google</span>
                    </div>
                </div>

                <div className={styles.item}>
                    <CheckCircle2 size={20} />

                    <div>
                        <strong>Email Verified</strong>

                        <span>
                            {user?.emailVerified
                                ? 'Yes'
                                : 'No'}
                        </span>
                    </div>
                </div>

                <div className={styles.item}>
                    <CalendarDays size={20} />

                    <div>
                        <strong>Member Since</strong>

                        <span>
                            {user?.metadata
                                ?.creationTime ??
                                '-'}
                        </span>
                    </div>
                </div>

                <div className={styles.item}>
                    <LogIn size={20} />

                    <div>
                        <strong>Last Login</strong>

                        <span>
                            {user?.metadata
                                ?.lastSignInTime ??
                                '-'}
                        </span>
                    </div>
                </div>
            </div>
        </SettingsCard>
    );
};

export default AccountInfo;