import React from 'react';
import type { CVSkill } from '../types/cv';

interface SkillsProps {
    skills: CVSkill[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
                <div key={index} className="flex justify-between items-center border p-3 rounded-lg border-gray-100 bg-gray-50 break-inside-avoid">
                    <span className="font-bold text-gray-800">{skill.name}</span>
                    <span className="text-sm text-gray-600 font-medium">{skill.level}</span>
                </div>
            ))}
        </div>
    );
};
