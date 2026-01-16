import React from 'react';
import type { CVData } from '../types/cv';
import { Header } from './Header';
import { Section } from './Section';
import { WorkExperience } from './WorkExperience';
import { Projects } from './Projects';
import { Education } from './Education';
import { Awards } from './Awards';
import { Skills } from './Skills';

import { Profile } from './Profile';

interface ResumeProps {
    data: CVData;
}

export const Resume: React.FC<ResumeProps> = ({ data }) => {
    const { headings } = data;

    return (
        <div className="max-w-[210mm] mx-auto bg-white p-[15mm_20mm] shadow-lg print:shadow-none text-base leading-normal">
            <Header basics={data.basics} />

            {/* 
         Order based on JSON 'sections': 
         ["templates", "profile", "work", "projects", "awards", "education", "skills"]
      */}

            {data.basics.summary && (
                <Section title={headings.profile}>
                    <Profile summary={data.basics.summary} />
                </Section>
            )}


            <Section title={headings.work}>
                <WorkExperience work={data.work} />
            </Section>

            <Section title={headings.projects}>
                <Projects projects={data.projects} />
            </Section>

            <Section title={headings.awards}>
                <Awards awards={data.awards} />
            </Section>

            <Section title={headings.education}>
                <Education education={data.education} />
            </Section>

            <Section title={headings.skills}>
                <Skills skills={data.skills} />
            </Section>
        </div>
    );
};
