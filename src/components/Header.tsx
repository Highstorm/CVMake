import React from 'react';
import type { CVBasics } from '../types/cv';

interface HeaderProps {
    basics: CVBasics;
}

export const Header: React.FC<HeaderProps> = ({ basics }) => {
    return (
        <header className="mb-8 border-b-2 border-gray-800 pb-6 flex justify-between items-end">
            <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    {basics.name}
                </h1>
                <div className="flex flex-col text-sm text-gray-600 gap-1">
                    {basics.location.address && <span>{basics.location.address}</span>}
                </div>
            </div>
            <div className="flex flex-col text-right text-sm text-gray-600 gap-1 font-medium">
                <a href={`mailto:${basics.email}`} className="hover:text-blue-600 hover:underline">
                    {basics.email}
                </a>
                <span>{basics.phone}</span>
            </div>
        </header>
    );
};
