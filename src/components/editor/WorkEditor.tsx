import React from 'react';
import type { CVWork } from '../../types/cv';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { AddButton } from '../ui/AddButton';

interface WorkEditorProps {
    work: CVWork[];
    onChange: (newWork: CVWork[]) => void;
}

export const WorkEditor: React.FC<WorkEditorProps> = ({ work, onChange }) => {
    const handleChange = (index: number, field: keyof CVWork, value: any) => {
        const updatedWork = [...work];
        updatedWork[index] = { ...updatedWork[index], [field]: value };
        onChange(updatedWork);
    };

    const handleHighlightChange = (workIndex: number, highlightIndex: number, value: string) => {
        const updatedWork = [...work];
        const updatedHighlights = [...updatedWork[workIndex].highlights];
        updatedHighlights[highlightIndex] = value;
        updatedWork[workIndex] = { ...updatedWork[workIndex], highlights: updatedHighlights };
        onChange(updatedWork);
    };

    const addHighlight = (index: number) => {
        const updatedWork = [...work];
        updatedWork[index] = {
            ...updatedWork[index],
            highlights: [...updatedWork[index].highlights, ""]
        };
        onChange(updatedWork);
    };

    const removeHighlight = (workIndex: number, highlightIndex: number) => {
        const updatedWork = [...work];
        const updatedHighlights = updatedWork[workIndex].highlights.filter((_, i) => i !== highlightIndex);
        updatedWork[workIndex] = { ...updatedWork[workIndex], highlights: updatedHighlights };
        onChange(updatedWork);
    };

    const addJob = () => {
        onChange([
            {
                company: "Neue Firma",
                position: "Position",
                startDate: "2024-01",
                location: "",
                highlights: []
            },
            ...work
        ]);
    };

    const removeJob = (index: number) => {
        onChange(work.filter((_, i) => i !== index));
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h3 className="text-white text-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">work</span>
                    Experience
                </h3>
                <button
                    onClick={addJob}
                    className="text-primary hover:text-blue-400 text-sm font-bold flex items-center gap-1 transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">add</span> Add
                </button>
            </div>

            {work.map((job, index) => (
                <div key={index} className="flex flex-col rounded-xl border border-input-border bg-[#151f29] overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-[#1c2b3a] cursor-pointer hover:bg-[#233648] transition-colors group">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#586e84] cursor-grab active:cursor-grabbing">drag_indicator</span>
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-sm">{job.company || 'New Company'}</span>
                                <span className="text-[#92adc9] text-xs">{job.position || 'New Position'}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); removeJob(index); }}
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
                                label="Employer"
                                value={job.company}
                                onChange={(e) => handleChange(index, 'company', e.target.value)}
                            />
                            <Input
                                label="Job Title"
                                value={job.position}
                                onChange={(e) => handleChange(index, 'position', e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Start Date"
                                type="text"
                                value={job.startDate}
                                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                                placeholder="YYYY-MM"
                            />
                            <Input
                                label="End Date"
                                type="text"
                                value={job.endDate || ''}
                                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                                placeholder="YYYY-MM or Present"
                            />
                        </div>

                        <div>
                            <p className="text-[#92adc9] text-sm font-medium leading-normal pb-2">Highlights</p>
                            <div className="flex flex-col gap-2">
                                {job.highlights.map((hl, hlIndex) => (
                                    <div key={hlIndex} className="flex gap-2 items-start">
                                        <TextArea
                                            label={`Highlight ${hlIndex + 1}`}
                                            value={hl || ''}
                                            onChange={(e) => handleHighlightChange(index, hlIndex, e.target.value)}
                                            className="min-h-[80px]"
                                        />
                                        <button
                                            onClick={() => removeHighlight(index, hlIndex)}
                                            className="mt-8 text-[#92adc9] hover:text-red-400 transition-colors"
                                        >
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => addHighlight(index)}
                                    className="w-full py-3 border-2 border-dashed border-[#324d67] rounded-xl text-[#92adc9] font-bold text-sm hover:bg-[#1c2b3a] hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2 mt-2"
                                >
                                    <span className="material-symbols-outlined">add_circle</span>
                                    Add Highlight
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <AddButton onClick={addJob} label="Add Experience" />
        </div>
    );
};
