import styles from './EventDetails.module.css';

const EventDetails = ({ event }) => {
    if (!event) {
        return null;
    }

    const item = event.resource;

    return (
        <div className={styles.container}>
            <h2>{item.title}</h2>

            <p>
                {item.description ||
                    'No description'}
            </p>

            <div className={styles.info}>
                <strong>Type</strong>

                <span>{event.type}</span>
            </div>

            {'priority' in item && (
                <div className={styles.info}>
                    <strong>Priority</strong>

                    <span>{item.priority}</span>
                </div>
            )}

            {'status' in item && (
                <div className={styles.info}>
                    <strong>Status</strong>

                    <span>{item.status}</span>
                </div>
            )}

            {'progress' in item && (
                <div className={styles.info}>
                    <strong>Progress</strong>

                    <span>
                        {item.progress}%
                    </span>
                </div>
            )}
        </div>
    );
};

export default EventDetails;