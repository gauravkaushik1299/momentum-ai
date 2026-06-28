import Card from '../../ui/Card';

import styles from './StatCard.module.css';

/**
 * Dashboard statistics card.
 */
const StatCard = ({
    title,
    value,
    icon: Icon,
    accent = 'primary',
}) => {
    return (
        <Card className={styles.card}>
            <div className={styles.header}>
                <span className={styles.title}>
                    {title}
                </span>

                {Icon && (
                    <div
                        className={`${styles.icon} ${styles[accent]}`}
                    >
                        <Icon size={18} />
                    </div>
                )}
            </div>

            <h2 className={styles.value}>
                {value}
            </h2>
        </Card>
    );
};

export default StatCard;