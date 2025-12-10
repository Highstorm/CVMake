import React, { type ReactNode } from 'react';

interface EditorLayoutProps {
    form: ReactNode;
    preview: ReactNode;
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({ form, preview }) => {
    return (
        <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-gray-100">
            {/* Editor Panel - Left/Top */}
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-300 bg-white p-6 shadow-md z-10 print:hidden">
                {form}
            </div>

            {/* Preview Panel - Right/Bottom */}
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto bg-gray-500/10 p-4 lg:p-10 flex justify-center items-start print:p-0 print:bg-white print:w-full print:h-auto print:block print:overflow-visible">
                <div className="print:w-full">
                    {preview}
                </div>
            </div>
        </div>
    );
};
