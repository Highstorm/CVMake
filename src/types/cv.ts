export interface CVHeadings {
    education: string;
    projects: string;
    awards: string;
    work: string;
    skills: string;
}

export interface CVLocation {
    address?: string;
}

export interface CVBasics {
    name: string;
    email: string;
    location: CVLocation;
    phone: string;
}

export interface CVEducation {
    institution: string;
    studyType: string;
    location: string;
    endDate: string;
    area?: string;
    startDate?: string;
}

export interface CVWork {
    location: string;
    position: string;
    website?: string;
    startDate: string;
    endDate?: string;
    highlights: (string | null)[];
    company: string;
}

export interface CVSkill {
    name: string;
    level: string;
    keywords: string[];
}

export interface CVProject {
    name: string;
    description: string;
    keywords: string[];
}

export interface CVAward {
    title: string;
    date: string;
    awarder: string;
}

export interface CVData {
    selectedTemplate: number;
    headings: CVHeadings;
    basics: CVBasics;
    education: CVEducation[];
    work: CVWork[];
    skills: CVSkill[];
    projects: CVProject[];
    awards: CVAward[];
    sections: string[];
}
