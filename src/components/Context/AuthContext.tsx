import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    username: string;
    email: string;
    password: string;
}

interface AuthContextProps {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        // Check for user in localStorage (pagerefers)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        //set defalut admin username and password
        const admin = { username: 'admin', email: 'admin@example.com', password: 'admin' };
        if (!localStorage.getItem('admin')) {
            localStorage.setItem('admin', JSON.stringify(admin));
        }
    }, []);

    const login = (user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
