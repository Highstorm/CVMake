import React, { type ReactNode, useEffect, useState } from 'react';

interface EditorLayoutProps {
    form: ReactNode;
    preview: ReactNode;
    onSave?: () => void;
    isSaving?: boolean;
    lastSaved?: Date | null;
    currentLanguage?: 'de' | 'en';
    onLanguageChange?: (lang: 'de' | 'en') => void;
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({ form, preview, onSave, isSaving, lastSaved, currentLanguage = 'de', onLanguageChange }) => {
    const [timeAgo, setTimeAgo] = useState('Unsaved changes');

    useEffect(() => {
        if (!lastSaved) {
            setTimeAgo('Unsaved changes');
            return;
        }

        const updateTime = () => {
            const now = new Date();
            const diffInSeconds = Math.floor((now.getTime() - lastSaved.getTime()) / 1000);

            if (diffInSeconds < 60) {
                setTimeAgo('Saved just now');
            } else {
                const diffInMinutes = Math.floor(diffInSeconds / 60);
                setTimeAgo(`Saved ${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`);
            }
        };

        updateTime();
        const interval = setInterval(updateTime, 60000); // 1 minute

        return () => clearInterval(interval);
    }, [lastSaved]);

    return (
        <div className="font-display bg-background-dark text-white h-screen overflow-hidden print:h-auto print:overflow-visible flex flex-col">
            {/* Top Navigation Bar */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#233648] bg-surface-dark px-6 py-3 shrink-0 z-20 print:hidden">
                <div className="flex items-center gap-4 text-white">
                    <div className="size-8 bg-primary/20 flex items-center justify-center rounded-lg text-primary">
                        <span className="material-symbols-outlined">description</span>
                    </div>
                    <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">CV Forge</h2>
                </div>
                <div className="flex flex-1 justify-end gap-6 items-center">
                    <div className="flex gap-3">
                        <div className="relative inline-block text-left">
                            <select
                                value={currentLanguage}
                                onChange={(e) => onLanguageChange?.(e.target.value as 'de' | 'en')}
                                className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-3 bg-surface-dark border border-[#324d67] hover:bg-[#1c2b3a] text-white text-sm font-bold transition-colors appearance-none pr-8 focus:outline-none focus:ring-1 focus:ring-primary"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                    backgroundPosition: `right 0.5rem center`,
                                    backgroundSize: `1.5em 1.5em`,
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                <option value="de">DE</option>
                                <option value="en">EN</option>
                            </select>
                        </div>
                        <button
                            onClick={onSave}
                            disabled={isSaving}
                            className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-surface-dark border border-[#324d67] hover:bg-[#1c2b3a] text-white text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined text-[18px] mr-2">save</span>
                            <span className="truncate">{isSaving ? 'Saving...' : 'Save'}</span>
                        </button>
                        <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-surface-dark border border-[#324d67] hover:bg-[#1c2b3a] text-white text-sm font-bold transition-colors">
                            <span className="material-symbols-outlined text-[18px] mr-2">dashboard</span>
                            <span className="truncate">Templates</span>
                        </button>
                        <button
                            className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary hover:bg-blue-600 text-white text-sm font-bold transition-colors shadow-lg shadow-blue-900/20"
                            onClick={() => window.print()}
                        >
                            <span className="material-symbols-outlined text-[18px] mr-2">download</span>
                            <span className="truncate">Export PDF</span>
                        </button>
                    </div>
                    <div className="h-8 w-[1px] bg-[#324d67]"></div>
                    <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-[#324d67] bg-gray-700" data-alt="User profile avatar">
                        <span className="material-symbols-outlined text-white w-full h-full flex items-center justify-center">person</span>
                    </div>
                </div>
            </header>

            {/* Main Workspace */}
            <div className="flex flex-1 overflow-hidden relative print:overflow-visible print:h-auto print:block">
                {/* Left Column: Editor */}
                <aside className="w-full lg:w-[45%] xl:w-[40%] flex flex-col bg-surface-dark border-r border-[#233648] z-10 print:hidden">
                    {/* Document Title Header */}
                    <div className="px-6 py-4 border-b border-[#233648] bg-surface-dark sticky top-0 z-10 shadow-sm">
                        <div className="flex flex-wrap justify-between items-center gap-3">
                            <div className="flex min-w-48 flex-col gap-1">
                                <div className="flex items-center gap-2 group cursor-pointer">
                                    <p className="text-white tracking-tight text-xl font-bold leading-tight group-hover:underline decoration-dashed underline-offset-4">Senior Designer Resume</p>
                                    <span className="material-symbols-outlined text-[#92adc9] text-sm opacity-0 group-hover:opacity-100 transition-opacity">edit</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#92adc9] text-xs font-medium">
                                    <span className="w-2 h-2 rounded-full bg-green-500 block"></span>
                                    {timeAgo}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Form Content */}
                    <div className="flex-1 overflow-y-auto p-6 pb-20 scroll-smooth">
                        <div className="max-w-2xl mx-auto flex flex-col gap-8">


                            {form}

                            {/* Custom Section Adder */}
                            <div className="pt-2">
                                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-surface-dark border border-[#324d67] hover:bg-[#1c2b3a] text-primary text-sm font-bold leading-normal w-full transition-colors">
                                    <span className="material-symbols-outlined mr-2">playlist_add</span>
                                    Add Custom Section
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Right Column: Live Preview */}
                <main className="hidden lg:flex flex-1 bg-[#0d141c] relative justify-center overflow-hidden print:block print:bg-white print:overflow-visible print:h-auto print:w-full print:m-0">
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 z-0 opacity-10 print:hidden" style={{ backgroundImage: "radial-gradient(#324d67 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
                    </div>

                    {/* Toolbar Floating */}
                    <div className="absolute bottom-8 right-8 z-30 flex items-center gap-2 bg-[#1c2b3a]/90 backdrop-blur border border-[#324d67] p-1.5 rounded-full shadow-xl print:hidden">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors" title="Zoom Out">
                            <span className="material-symbols-outlined text-[20px]">remove</span>
                        </button>
                        <span className="text-xs font-mono text-[#92adc9] w-12 text-center">100%</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors" title="Zoom In">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                        </button>
                        <div className="w-[1px] h-4 bg-[#324d67] mx-1"></div>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors" title="Fit to Screen">
                            <span className="material-symbols-outlined text-[20px]">fit_screen</span>
                        </button>
                    </div>

                    {/* Preview Scroll Container */}
                    <div className="w-full h-full overflow-y-auto p-12 flex justify-center scroll-smooth z-10 print:p-0 print:overflow-visible print:block print:w-full print:m-0">
                        {/* The Paper (A4 Size approximation for screen) */}
                        <div className="relative bg-white w-[210mm] min-h-[297mm] paper-shadow mx-auto shrink-0 origin-top transform scale-90 xl:scale-100 transition-transform print:shadow-none print:transform-none print:m-0 print:w-full print:min-h-0">
                            {preview}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
