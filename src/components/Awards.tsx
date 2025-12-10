import React from 'react';
import type { CVAward } from '../types/cv';

interface AwardsProps {
    awards: CVAward[];
}

export const Awards: React.FC<AwardsProps> = ({ awards }) => {
    return (
        <div className="space-y-3">
            {awards.map((award, index) => (
                <div key={index} className="flex justify-between items-baseline break-inside-avoid border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                    <div>
                        <h3 className="font-bold text-gray-800">{award.title}</h3>
                        <div className="text-gray-600 text-sm">{award.awarder}</div>
                    </div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">
                        {award.date}
                    </div>
                </div>
            ))}
        </div>
    );
};
