import styles from './SettingsCard.module.css';

/**
 * Reusable wrapper for all settings sections.
 */
const SettingsCard = ({
    title,
    description,
    children,
}) => {
    return (
        <section className={styles.card}>
            <header className={styles.header}>
                <h2>{title}</h2>

                {description && (
                    <p>{description}</p>
                )}
            </header>

            <div className={styles.content}>
                {children}
            </div>
        </section>
    );
};

export default SettingsCard;