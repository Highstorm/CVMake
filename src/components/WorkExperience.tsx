import React from 'react';
import type { CVWork } from '../types/cv';

interface WorkExperienceProps {
    work: CVWork[];
}

export const WorkExperience: React.FC<WorkExperienceProps> = ({ work }) => {
    return (
        <div className="space-y-6">
            {work.map((job, index) => (
                <div key={index} className="break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-lg font-bold text-gray-800">{job.position}</h3>
                        <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                            {job.startDate} {job.endDate ? `- ${job.endDate}` : ''}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-3 text-sm">
                        <span className="font-semibold text-gray-700">{job.company}</span>
                        <span className="text-gray-500 italic">{job.location}</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 leading-relaxed marker:text-gray-400">
                        {job.highlights.map((highlight, hIndex) => (
                            highlight && <li key={hIndex} className="pl-1">{highlight}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
