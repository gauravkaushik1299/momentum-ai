import styles from './Loader.module.css';

/**
 * Full-screen loading indicator.
 */
const Loader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.spinner} />

            <p>Loading...</p>
        </div>
    );
};

export default Loader;