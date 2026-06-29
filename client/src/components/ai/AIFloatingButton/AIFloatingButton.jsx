import { Bot } from 'lucide-react';

import { useAI } from '../AIProvider';

import styles from './AIFloatingButton.module.css';

const AIFloatingButton = () => {
    const { togglePanel } =
        useAI();

    return (
        <button
            className={styles.button}
            onClick={togglePanel}
            aria-label="Open AI Assistant"
        >
            <Bot size={26} />
        </button>
    );
};

export default AIFloatingButton;