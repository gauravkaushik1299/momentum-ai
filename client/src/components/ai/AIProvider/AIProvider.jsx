import {
    useMemo,
    useState,
} from 'react';

import AIContext from './AIContext';

const AIProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [loading, setLoading] =
        useState(false);

    const [response, setResponse] =
        useState('');

    const value = useMemo(
        () => ({
            isOpen,

            loading,

            response,

            setLoading,

            setResponse,

            openPanel: () =>
                setIsOpen(true),

            closePanel: () =>
                setIsOpen(false),

            togglePanel: () =>
                setIsOpen((prev) => !prev),
        }),
        [
            isOpen,
            loading,
            response,
        ]
    );

    return (
        <AIContext.Provider value={value}>
            {children}
        </AIContext.Provider>
    );
};

export default AIProvider;