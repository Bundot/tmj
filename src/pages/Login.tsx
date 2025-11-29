import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

export const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const success = await login(username, password);
        if (success) {
            navigate('/');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card w-full max-w-md p-8 rounded-lg border border-border shadow-lg"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

                {error && (
                    <div className="bg-error/10 text-error p-3 rounded-md mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 rounded-md bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Enter password"
                        />
                    </div>

                    <Button fullWidth type="submit">
                        Login
                    </Button>

                    <div className="text-center mt-4">
                        <a href="/" className="text-sm text-muted-foreground hover:text-primary">
                            Return to Home
                        </a>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};
