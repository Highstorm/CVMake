import React from 'react';

export const ProgressBar: React.FC = () => {
    return (
        <div className="flex items-center justify-between gap-4 bg-input-bg p-4 rounded-xl border border-input-border">
            <div className="flex flex-col gap-1">
                <span className="text-white text-sm font-bold">Profile Strength</span>
                <span className="text-[#92adc9] text-xs">Your resume is looking great!</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-[#0d141c] rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-green-500 rounded-full"></div>
                </div>
                <span className="text-green-500 text-sm font-bold">85%</span>
            </div>
        </div>
    );
};
