import React from 'react';
import type { CVBasics } from '../../types/cv';

interface BasicsEditorProps {
    basics: CVBasics;
    onChange: (newBasics: CVBasics) => void;
}

export const BasicsEditor: React.FC<BasicsEditorProps> = ({ basics, onChange }) => {
    const handleChange = (field: keyof CVBasics, value: any) => {
        onChange({ ...basics, [field]: value });
    };

    const handleLocationChange = (field: string, value: string) => {
        onChange({
            ...basics,
            location: { ...basics.location, [field]: value }
        });
    };

    return (
        <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
            <h3 className="text-lg font-bold text-gray-700">Persönliche Daten</h3>

            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    value={basics.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={basics.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Telefon</label>
                <input
                    type="text"
                    value={basics.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Adresse / Ort</label>
                <input
                    type="text"
                    value={basics.location.address || ''}
                    onChange={(e) => handleLocationChange('address', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
            </div>
        </div>
    );
};
