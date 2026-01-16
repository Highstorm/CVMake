import React from 'react';
import type { CVAward } from '../../types/cv';
import { Input } from '../ui/Input';
import { AddButton } from '../ui/AddButton';

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
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h3 className="text-white text-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">emoji_events</span>
                    Awards
                </h3>
                <button
                    onClick={addAward}
                    className="text-primary hover:text-blue-400 text-sm font-bold flex items-center gap-1 transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">add</span> Add
                </button>
            </div>

            {awards.map((award, index) => (
                <div key={index} className="flex flex-col rounded-xl border border-input-border bg-[#151f29] overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-[#1c2b3a] cursor-pointer hover:bg-[#233648] transition-colors group">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#586e84]">drag_indicator</span>
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-sm">{award.title || 'New Award'}</span>
                                <span className="text-[#92adc9] text-xs">Award</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); removeAward(index); }}
                                className="p-2 text-[#92adc9] hover:text-red-400 rounded hover:bg-white/10 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                            <span className="material-symbols-outlined text-[#92adc9] group-hover:text-white transition-colors">expand_more</span>
                        </div>
                    </div>

                    <div className="p-4 flex flex-col gap-4 border-t border-input-border">
                        <Input
                            label="Title"
                            value={award.title}
                            onChange={(e) => handleChange(index, 'title', e.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Date"
                                value={award.date}
                                onChange={(e) => handleChange(index, 'date', e.target.value)}
                            />
                            <Input
                                label="Awarder"
                                value={award.awarder}
                                onChange={(e) => handleChange(index, 'awarder', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}

            <AddButton onClick={addAward} label="Add Award" />
        </div>
    );
};
