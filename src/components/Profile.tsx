import React from 'react';

interface ProfileProps {
    summary?: string;
}

export const Profile: React.FC<ProfileProps> = ({ summary }) => {
    if (!summary) return null;

    return (
        <div className="text-gray-700 whitespace-pre-wrap">
            {summary}
        </div>
    );
};
