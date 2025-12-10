import React from 'react';
import type { CVAward } from '../../types/cv';

interface AwardsEditorProps {
    awards: CVAward[];
    onChange: (newAwards: CVAward[]) => void;
}

export const AwardsEditor: React.FC<AwardsEditorProps> = ({ awards, onChange }) => {
    const handleChange = (index: number, field: keyof CVAward, value: any) => {
        const updated = [...awards];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const addAward = () => {
        onChange([
            {
                title: "Neues Zertifikat",
                date: "2024",
                awarder: "Aussteller"
            },
            ...awards
        ]);
    };

    const removeAward = (index: number) => {
        onChange(awards.filter((_, i) => i !== index));
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-700">Zertifikate / Awards</h3>
                <button
                    onClick={addAward}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                    + Zertifikat
                </button>
            </div>

            {awards.map((award, index) => (
                <div key={index} className="border p-4 rounded-lg bg-white shadow-sm space-y-3 relative group">
                    <button
                        onClick={() => removeAward(index)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-600 font-bold"
                        title="Eintrag löschen"
                    >
                        ✕
                    </button>

                    <div className="grid grid-cols-1 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-500">Titel</label>
                            <input
                                type="text"
                                value={award.title}
                                onChange={(e) => handleChange(index, 'title', e.target.value)}
                                className="block w-full rounded border-gray-300 text-sm p-1 border"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-500">Datum</label>
                                <input
                                    type="text"
                                    value={award.date}
                                    onChange={(e) => handleChange(index, 'date', e.target.value)}
                                    className="block w-full rounded border-gray-300 text-sm p-1 border"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500">Aussteller</label>
                                <input
                                    type="text"
                                    value={award.awarder}
                                    onChange={(e) => handleChange(index, 'awarder', e.target.value)}
                                    className="block w-full rounded border-gray-300 text-sm p-1 border"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
