import React from 'react';
import type { CVWork } from '../../types/cv';

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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-700">Berufserfahrung</h3>
                <button
                    onClick={addJob}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                    + Job
                </button>
            </div>

            {work.map((job, index) => (
                <div key={index} className="border p-4 rounded-lg bg-white shadow-sm space-y-3 relative group">
                    <button
                        onClick={() => removeJob(index)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-600 font-bold"
                        title="Job löschen"
                    >
                        ✕
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-500">Firma</label>
                            <input
                                type="text"
                                value={job.company}
                                onChange={(e) => handleChange(index, 'company', e.target.value)}
                                className="block w-full rounded border-gray-300 text-sm p-1 border"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500">Position</label>
                            <input
                                type="text"
                                value={job.position}
                                onChange={(e) => handleChange(index, 'position', e.target.value)}
                                className="block w-full rounded border-gray-300 text-sm p-1 border"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500">Start</label>
                            <input
                                type="text"
                                value={job.startDate}
                                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                                className="block w-full rounded border-gray-300 text-sm p-1 border"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500">Ende</label>
                            <input
                                type="text"
                                value={job.endDate || ''}
                                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                                className="block w-full rounded border-gray-300 text-sm p-1 border"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Highlights</label>
                        <div className="space-y-2 pl-2 border-l-2 border-gray-100">
                            {job.highlights.map((hl, hlIndex) => (
                                <div key={hlIndex} className="flex gap-2">
                                    <textarea
                                        value={hl || ''}
                                        onChange={(e) => handleHighlightChange(index, hlIndex, e.target.value)}
                                        className="block w-full rounded border-gray-300 text-sm p-1 border resize-y min-h-[50px]"
                                    />
                                    <button
                                        onClick={() => removeHighlight(index, hlIndex)}
                                        className="text-red-400 hover:text-red-600 self-start"
                                    >
                                        -
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addHighlight(index)}
                                className="text-blue-600 text-xs hover:underline"
                            >
                                + Highlight hinzufügen
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
