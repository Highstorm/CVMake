import React from 'react';
import type { CVEducation } from '../types/cv';

interface EducationProps {
    education: CVEducation[];
}

export const Education: React.FC<EducationProps> = ({ education }) => {
    return (
        <div className="space-y-4">
            {education.map((edu, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:justify-between break-inside-avoid">
                    <div className="mb-1 sm:mb-0">
                        <h3 className="font-bold text-gray-800">{edu.studyType}</h3>
                        {edu.area && <div className="text-gray-700">{edu.area}</div>}
                        <div className="text-gray-600">{edu.institution}</div>
                    </div>
                    <div className="text-sm text-gray-600 font-medium whitespace-nowrap text-right">
                        <span>{edu.location}</span>
                        <br />
                        <span>{edu.endDate}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
