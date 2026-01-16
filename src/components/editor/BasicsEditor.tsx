import React from 'react';
import type { CVBasics } from '../../types/cv';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';

interface BasicsEditorProps {
    basics: CVBasics;
    onChange: (newBasics: CVBasics) => void;
}

export const BasicsEditor: React.FC<BasicsEditorProps> = ({ basics, onChange }) => {
    const handleChange = (field: keyof CVBasics, value: any) => {
        onChange({ ...basics, [field]: value });
    };

    const handleNameChange = (type: 'first' | 'last', value: string) => {
        const parts = basics.name.split(' ');
        const lastName = parts.length > 1 ? parts.pop() : '';
        const firstName = parts.join(' ');

        let newName = '';
        if (type === 'first') {
            newName = `${value} ${lastName}`.trim();
        } else {
            newName = `${firstName} ${value}`.trim();
        }
        handleChange('name', newName);
    };

    // Derived values for inputs
    const nameParts = basics.name.split(' ');
    const lastName = nameParts.length > 1 ? nameParts.pop() || '' : '';
    const firstName = nameParts.join(' ');

    return (
        <div className="flex flex-col gap-8">
            {/* Personal Details Section */}
            <div className="flex flex-col gap-4">
                <h3 className="text-white text-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">person</span>
                    Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="First Name"
                        value={firstName}
                        onChange={(e) => handleNameChange('first', e.target.value)}
                        placeholder="e.g. John"
                    />
                    <Input
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => handleNameChange('last', e.target.value)}
                        placeholder="e.g. Doe"
                    />
                    <Input
                        label="Job Title"
                        value={basics.label || ''}
                        onChange={(e) => handleChange('label', e.target.value)}
                        placeholder="e.g. Software Engineer"
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        value={basics.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="e.g. john@example.com"
                    />
                    <Input
                        label="Phone"
                        value={basics.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                    />
                    <Input
                        label="Location"
                        value={basics.location.address || ''}
                        onChange={(e) => {
                            onChange({
                                ...basics,
                                location: {
                                    ...basics.location,
                                    address: e.target.value
                                }
                            });
                        }}
                        placeholder="City, Country"
                    />
                    <Input
                        label="Website"
                        value={basics.url || ''}
                        onChange={(e) => handleChange('url', e.target.value)}
                        placeholder="https://example.com"
                    />
                </div>
            </div>

            <hr className="border-[#233648]" />

            {/* Summary Section */}
            <div className="flex flex-col gap-4">
                <h3 className="text-white text-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">article</span>
                    Professional Summary
                </h3>
                <TextArea
                    label="Summary"
                    value={basics.summary || ''}
                    onChange={(e) => handleChange('summary', e.target.value)}
                    placeholder="Brief professional summary..."
                />
            </div>

            <hr className="border-[#233648]" />
        </div>
    );
};
