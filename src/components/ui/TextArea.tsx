import React, { type TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, className = '', ...props }) => {
    return (
        <label className="flex flex-col flex-1">
            <p className="text-[#92adc9] text-sm font-medium leading-normal pb-2">{label}</p>
            <textarea
                className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-input-border bg-input-bg focus:border-primary min-h-[120px] placeholder:text-[#586e84] p-4 text-sm font-normal leading-normal transition-all ${className}`}
                {...props}
            />
        </label>
    );
};
