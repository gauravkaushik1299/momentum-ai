import { BarChart3 } from 'lucide-react';

import styles from './EmptyChart.module.css';

const EmptyChart = ({
    message = 'No data available yet.',
}) => {
    return (
        <div className={styles.empty}>
            <BarChart3 size={56} />

            <h3>No Analytics Yet</h3>

            <p>{message}</p>
        </div>
    );
};

export default EmptyChart;