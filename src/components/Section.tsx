import React, { type ReactNode } from 'react';

interface SectionProps {
    title: string;
    children: ReactNode;
    className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, className = '' }) => {
    return (
        <section className={`mb-6 ${className}`}>
            <h2 className="text-xl font-bold uppercase border-b-2 border-gray-300 mb-4 pb-1 text-gray-800">
                {title}
            </h2>
            <div className="text-sm text-gray-700">
                {children}
            </div>
        </section>
    );
};
