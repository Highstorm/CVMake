import React from 'react';

interface AddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

export const AddButton: React.FC<AddButtonProps> = ({ label, className = '', ...props }) => {
    return (
        <button
            className={`w-full py-3 border-2 border-dashed border-[#324d67] rounded-xl text-[#92adc9] font-bold text-sm hover:bg-[#1c2b3a] hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2 ${className}`}
            {...props}
        >
            <span className="material-symbols-outlined">add_circle</span>
            {label}
        </button>
    );
};
