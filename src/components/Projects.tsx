import React from 'react';
import type { CVProject } from '../types/cv';

interface ProjectsProps {
    projects: CVProject[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {projects.map((project, index) => (
                <div key={index} className="break-inside-avoid">
                    <div className="flex items-baseline gap-2 mb-1">
                        <h3 className="font-bold text-gray-800">{project.name}</h3>
                    </div>
                    <p className="text-gray-700 mb-2 leading-relaxed">
                        {project.description}
                    </p>
                    {project.keywords && project.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-x-2 gap-y-1">
                            {project.keywords.map((keyword, kIndex) => (
                                <span key={kIndex} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
