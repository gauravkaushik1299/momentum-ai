import styles from './Button.module.css';

/**
 * Reusable button component.
 *
 * Props:
 * - variant: primary | secondary | danger | ghost
 * - size: small | medium | large
 * - loading: boolean
 * - disabled: boolean
 * - leftIcon: JSX Element
 * - rightIcon: JSX Element
 */
const Button = ({
    children,
    type = 'button',

    variant = 'primary',

    size = 'medium',

    loading = false,

    disabled = false,

    leftIcon,

    rightIcon,

    className = '',

    ...props
}) => {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={`
                ${styles.button}
                ${styles[variant]}
                ${styles[size]}
                ${className}
            `}
            {...props}
        >
            {loading && (
                <span className={styles.spinner} />
            )}

            {!loading && leftIcon}

            <span>
                {children}
            </span>

            {!loading && rightIcon}
        </button>
    );
};

export default Button;