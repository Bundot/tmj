import React from 'react';
import { motion } from 'framer-motion';
import { EditIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface EditOverlayProps {
    onEdit: () => void;
    children: React.ReactNode;
    className?: string;
    label?: string;
}

export const EditOverlay: React.FC<EditOverlayProps> = ({
    onEdit,
    children,
    className = '',
    label = 'Edit'
}) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className={`relative group ${className}`}>
            {children}

            <motion.div
                className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none border-2 border-primary border-dashed rounded-lg z-10"
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                    }}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg flex items-center gap-2 pointer-events-auto transform scale-90 group-hover:scale-100 transition-transform"
                >
                    <EditIcon size={16} />
                    {label}
                </button>
            </motion.div>
        </div>
    );
};
