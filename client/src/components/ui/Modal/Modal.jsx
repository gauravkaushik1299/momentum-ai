import { X } from 'lucide-react';
import { useEffect } from 'react';

import styles from './Modal.module.css';

/**
 * Reusable modal component.
 */
const Modal = ({
    isOpen,
    title,
    children,
    onClose,
}) => {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener(
                'keydown',
                handleEscape
            );
        }

        return () => {
            document.removeEventListener(
                'keydown',
                handleEscape
            );
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className={styles.overlay}
            onClick={onClose}
        >
            <div
                className={styles.modal}
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                <header className={styles.header}>
                    <h2>{title}</h2>

                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </header>

                <div className={styles.body}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;