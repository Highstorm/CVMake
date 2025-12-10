import React from 'react';
import type { CVSkill } from '../../types/cv';

interface SkillsEditorProps {
    skills: CVSkill[];
    onChange: (newSkills: CVSkill[]) => void;
}

export const SkillsEditor: React.FC<SkillsEditorProps> = ({ skills, onChange }) => {
    const handleChange = (index: number, field: keyof CVSkill, value: any) => {
        const updated = [...skills];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const addSkill = () => {
        onChange([
            {
                name: "Neue Fähigkeit",
                level: "Level",
                keywords: []
            },
            ...skills
        ]);
    };

    const removeSkill = (index: number) => {
        onChange(skills.filter((_, i) => i !== index));
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-700">Skills / Sprachen</h3>
                <button
                    onClick={addSkill}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                    + Skill
                </button>
            </div>

            {skills.map((skill, index) => (
                <div key={index} className="border p-4 rounded-lg bg-white shadow-sm space-y-3 relative group">
                    <button
                        onClick={() => removeSkill(index)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-600 font-bold"
                        title="Eintrag löschen"
                    >
                        ✕
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-500">Name</label>
                            <input
                                type="text"
                                value={skill.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                                className="block w-full rounded border-gray-300 text-sm p-1 border"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500">Level</label>
                            <input
                                type="text"
                                value={skill.level}
                                onChange={(e) => handleChange(index, 'level', e.target.value)}
                                className="block w-full rounded border-gray-300 text-sm p-1 border"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
