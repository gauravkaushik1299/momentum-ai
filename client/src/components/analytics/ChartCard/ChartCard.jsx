import styles from './ChartCard.module.css';

const ChartCard = ({
    title,
    subtitle,
    children,
}) => {
    return (
        <section className={styles.card}>
            <header className={styles.header}>
                <h2>{title}</h2>

                {subtitle && (
                    <p>{subtitle}</p>
                )}
            </header>

            <div className={styles.content}>
                {children}
            </div>
        </section>
    );
};

export default ChartCard;