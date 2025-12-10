import React from 'react';
import type { CVEducation } from '../../types/cv';

interface EducationEditorProps {
    education: CVEducation[];
    onChange: (newEducation: CVEducation[]) => void;
}

export const EducationEditor: React.FC<EducationEditorProps> = ({ education, onChange }) => {
    const handleChange = (index: number, field: keyof CVEducation, value: any) => {
        const updated = [...education];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const addEducation = () => {
        onChange([
            {
                institution: "Neue Einrichtung",
                studyType: "Abschluss",
                location: "Ort",
                endDate: "2024",
                area: "Fachbereich"
            },
            ...education
        ]);
    };

    const removeEducation = (index: number) => {
        onChange(education.filter((_, i) => i !== index));
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-700">Ausbildung</h3>
                <button
                    onClick={addEducation}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                    + Ausbildung
                </button>
            </div>

            {education.map((edu, index) => (
                <div key={index} className="border p-4 rounded-lg bg-white shadow-sm space-y-3 relative group">
                    <button
                        onClick={() => removeEducation(index)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-600 font-bold"
                        title="Eintrag löschen"
                    >
                        ✕
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-500">Institution</label>
                            <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => handleChange(index, 'institution', e.target.value)}
                                className="block w-full rounded border-gray-300 text-sm p-1 border"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500">Abschluss</label>
                            <input
                                type="text"
                                value={edu.studyType}
                                onChange={(e) => handleChange(index, 'studyType', e.target.value)}
                                className="block w-full rounded border-gray-300 text-sm p-1 border"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500">Zeitraum / Ende</label>
                            <input
                                type="text"
                                value={edu.endDate}
                                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                                className="block w-full rounded border-gray-300 text-sm p-1 border"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500">Ort</label>
                            <input
                                type="text"
                                value={edu.location}
                                onChange={(e) => handleChange(index, 'location', e.target.value)}
                                className="block w-full rounded border-gray-300 text-sm p-1 border"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-medium text-gray-500">Fachbereich</label>
                            <input
                                type="text"
                                value={edu.area || ''}
                                onChange={(e) => handleChange(index, 'area', e.target.value)}
                                className="block w-full rounded border-gray-300 text-sm p-1 border"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
