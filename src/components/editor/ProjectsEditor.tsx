import React from 'react';
import type { CVProject } from '../../types/cv';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { AddButton } from '../ui/AddButton';

interface ProjectsEditorProps {
    projects: CVProject[];
    onChange: (newProjects: CVProject[]) => void;
}

export const ProjectsEditor: React.FC<ProjectsEditorProps> = ({ projects, onChange }) => {
    const handleChange = (index: number, field: keyof CVProject, value: any) => {
        const updated = [...projects];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const handleKeywordsChange = (index: number, value: string) => {
        // Split by comma for simple editing
        const keywords = value.split(',').map(k => k.trim()).filter(k => k);
        handleChange(index, 'keywords', keywords);
    };

    const addProject = () => {
        onChange([
            {
                name: "Neues Projekt",
                description: "Beschreibung",
                keywords: []
            },
            ...projects
        ]);
    };

    const removeProject = (index: number) => {
        onChange(projects.filter((_, i) => i !== index));
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h3 className="text-white text-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">rocket_launch</span>
                    Projects
                </h3>
                <button
                    onClick={addProject}
                    className="text-primary hover:text-blue-400 text-sm font-bold flex items-center gap-1 transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">add</span> Add
                </button>
            </div>

            {projects.map((proj, index) => (
                <div key={index} className="flex flex-col rounded-xl border border-input-border bg-[#151f29] overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-[#1c2b3a] cursor-pointer hover:bg-[#233648] transition-colors group">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#586e84]">drag_indicator</span>
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-sm">{proj.name || 'New Project'}</span>
                                <span className="text-[#92adc9] text-xs">Project</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); removeProject(index); }}
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
                            value={proj.name}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                        />
                        <TextArea
                            label="Description"
                            value={proj.description}
                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                            className="min-h-[80px]"
                        />
                        <Input
                            label="Keywords (Comma separated)"
                            value={proj.keywords.join(', ')}
                            onChange={(e) => handleKeywordsChange(index, e.target.value)}
                            placeholder="Agile, Scrum, React..."
                        />
                    </div>
                </div>
            ))}

            <AddButton onClick={addProject} label="Add Project" />
        </div>
    );
};
