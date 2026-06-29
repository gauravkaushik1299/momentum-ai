import { AppProvider } from '../contexts/AppContext';
import { AuthProvider } from '../contexts/AuthContext';

import { AIProvider } from '../components/ai/AIProvider';

const Providers = ({ children }) => {
    return (
        <AppProvider>
            <AuthProvider>
                <AIProvider>
                    {children}
                </AIProvider>
            </AuthProvider>
        </AppProvider>
    );
};

export default Providers;