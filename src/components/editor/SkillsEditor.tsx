import React from 'react';
import type { CVSkill } from '../../types/cv';
import { Input } from '../ui/Input';
import { AddButton } from '../ui/AddButton';

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
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h3 className="text-white text-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">psychology</span>
                    Skills
                </h3>
                <button
                    onClick={addSkill}
                    className="text-primary hover:text-blue-400 text-sm font-bold flex items-center gap-1 transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">add</span> Add
                </button>
            </div>

            {skills.map((skill, index) => (
                <div key={index} className="flex flex-col rounded-xl border border-input-border bg-[#151f29] overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-[#1c2b3a] cursor-pointer hover:bg-[#233648] transition-colors group">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#586e84]">drag_indicator</span>
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-sm">{skill.name || 'New Skill'}</span>
                                <span className="text-[#92adc9] text-xs">{skill.level || 'Level'}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); removeSkill(index); }}
                                className="p-2 text-[#92adc9] hover:text-red-400 rounded hover:bg-white/10 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                            <span className="material-symbols-outlined text-[#92adc9] group-hover:text-white transition-colors">expand_more</span>
                        </div>
                    </div>

                    <div className="p-4 flex flex-col gap-4 border-t border-input-border">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Name"
                                value={skill.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                            />
                            <Input
                                label="Level"
                                value={skill.level}
                                onChange={(e) => handleChange(index, 'level', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}

            <AddButton onClick={addSkill} label="Add Skill" />
        </div>
    );
};
