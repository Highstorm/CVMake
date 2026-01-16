import React, { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
    return (
        <label className="flex flex-col flex-1">
            <p className="text-[#92adc9] text-sm font-medium leading-normal pb-2">{label}</p>
            <input
                className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-input-border bg-input-bg focus:border-primary h-11 placeholder:text-[#586e84] px-4 text-sm font-normal leading-normal transition-all ${className}`}
                {...props}
            />
        </label>
    );
};
