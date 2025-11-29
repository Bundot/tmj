import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface User {
    username: string;
    name: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check localStorage for persisted session
        const storedAuth = localStorage.getItem('tmj-auth');
        if (storedAuth) {
            const { isAuthenticated, user } = JSON.parse(storedAuth);
            if (isAuthenticated) {
                setIsAuthenticated(true);
                setUser(user);
            }
        }
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        console.log('🔐 LOGIN ATTEMPT:');
        console.log('Username:', username);
        console.log('Password:', password);

        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('username', username)
                .single();

            console.log('📊 Supabase Response:');
            console.log('Data:', data);
            console.log('Error:', error);

            if (error || !data) {
                console.error('❌ Login error:', error);
                return false;
            }

            // Verify password (in production, use proper bcrypt verification)
            if (password === 'TMJ') { // Replace with proper password verification
                const user = { name: data.name, username: data.username };
                setUser(user);
                setIsAuthenticated(true);
                localStorage.setItem('tmj-auth', JSON.stringify({ isAuthenticated: true, user }));
                console.log('✅ Login successful!');
                return true;
            }
            console.log('❌ Password mismatch');
            return false;
        } catch (error) {
            console.error('❌ Login error:', error);
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('tmj-auth');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
