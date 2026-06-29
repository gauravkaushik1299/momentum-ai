import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

import { useAuth } from '../../contexts/AuthContext';

import Button from '../../components/ui/Button';

import styles from './LoginPage.module.css';

const LoginPage = () => {
    const {
        login,
        user,
        loading,
    } = useAuth();

    const navigate = useNavigate();

    const [isSigningIn, setIsSigningIn] = useState(false);

    useEffect(() => {
        if (!loading && user) {
            navigate('/dashboard', {
                replace: true,
            });
        }
    }, [loading, user, navigate]);

    const handleLogin = async () => {
        try {
            setIsSigningIn(true);

            await login();
        } catch (error) {
            console.error('Google login failed:', error);
        } finally {
            setIsSigningIn(false);
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <div className={styles.logo}>
                    M
                </div>

                <h1>Momentum AI</h1>

                <p>
                    Plan smarter.
                    Work faster.
                    Stay focused.
                </p>

                <Button
                    onClick={handleLogin}
                    disabled={loading || isSigningIn}
                    leftIcon={<LogIn size={18} />}
                >
                    {isSigningIn
                        ? 'Signing in...'
                        : 'Continue with Google'}
                </Button>
            </div>
        </main>
    );
};

export default LoginPage;