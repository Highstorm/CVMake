import React from 'react';
import type { CVProject } from '../../types/cv';

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
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-700">Kompetenzen / Projekte</h3>
                <button
                    onClick={addProject}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                    + Kompetenz
                </button>
            </div>

            {projects.map((proj, index) => (
                <div key={index} className="border p-4 rounded-lg bg-white shadow-sm space-y-3 relative group">
                    <button
                        onClick={() => removeProject(index)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-600 font-bold"
                        title="Eintrag löschen"
                    >
                        ✕
                    </button>

                    <div>
                        <label className="block text-xs font-medium text-gray-500">Titel</label>
                        <input
                            type="text"
                            value={proj.name}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                            className="block w-full rounded border-gray-300 text-sm p-1 border"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500">Beschreibung</label>
                        <textarea
                            value={proj.description}
                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                            className="block w-full rounded border-gray-300 text-sm p-1 border resize-y min-h-[60px]"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500">Keywords (Kommagetrennt)</label>
                        <input
                            type="text"
                            value={proj.keywords.join(', ')}
                            onChange={(e) => handleKeywordsChange(index, e.target.value)}
                            className="block w-full rounded border-gray-300 text-sm p-1 border"
                            placeholder="Agile, Scrum, ..."
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
