import styles from './Card.module.css';

/**
 * Reusable Card component.
 *
 * Used across the application for dashboard widgets,
 * analytics, AI suggestions, task summaries, and more.
 */
const Card = ({
    title,
    subtitle,
    children,
    className = '',
}) => {
    return (
        <section className={`${styles.card} ${className}`}>
            {(title || subtitle) && (
                <header className={styles.header}>
                    {title && <h3 className={styles.title}>{title}</h3>}

                    {subtitle && (
                        <p className={styles.subtitle}>{subtitle}</p>
                    )}
                </header>
            )}

            <div className={styles.content}>{children}</div>
        </section>
    );
};

export default Card;