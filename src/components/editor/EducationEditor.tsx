import React from 'react';
import type { CVEducation } from '../../types/cv';
import { Input } from '../ui/Input';
import { AddButton } from '../ui/AddButton';

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
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h3 className="text-white text-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">school</span>
                    Education
                </h3>
                <button
                    onClick={addEducation}
                    className="text-primary hover:text-blue-400 text-sm font-bold flex items-center gap-1 transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">add</span> Add
                </button>
            </div>

            {education.map((edu, index) => (
                <div key={index} className="flex flex-col rounded-xl border border-input-border bg-[#151f29] overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-[#1c2b3a] cursor-pointer hover:bg-[#233648] transition-colors group">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#586e84]">drag_indicator</span>
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-sm">{edu.institution || 'New Institution'}</span>
                                <span className="text-[#92adc9] text-xs">{edu.studyType || 'Degree'}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); removeEducation(index); }}
                                className="p-2 text-[#92adc9] hover:text-red-400 rounded hover:bg-white/10 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                            <span className="material-symbols-outlined text-[#92adc9] group-hover:text-white transition-colors">expand_more</span>
                        </div>
                    </div>

                    <div className="p-4 flex flex-col gap-4 border-t border-input-border">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Institution"
                                value={edu.institution}
                                onChange={(e) => handleChange(index, 'institution', e.target.value)}
                            />
                            <Input
                                label="Degree"
                                value={edu.studyType}
                                onChange={(e) => handleChange(index, 'studyType', e.target.value)}
                            />
                            <Input
                                label="Date/Period"
                                value={edu.endDate}
                                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                                placeholder="2024"
                            />
                            <Input
                                label="Location"
                                value={edu.location}
                                onChange={(e) => handleChange(index, 'location', e.target.value)}
                            />
                        </div>
                        <Input
                            label="Area of Study"
                            value={edu.area || ''}
                            onChange={(e) => handleChange(index, 'area', e.target.value)}
                        />
                    </div>
                </div>
            ))}

            <AddButton onClick={addEducation} label="Add Education" />
        </div>
    );
};
