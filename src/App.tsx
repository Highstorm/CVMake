import { useState } from 'react';
import resumeData from './data/resume.json';
import { Resume } from './components/Resume';
import { EditorLayout } from './components/EditorLayout';
import { BasicsEditor } from './components/editor/BasicsEditor';
import { WorkEditor } from './components/editor/WorkEditor';
import { EducationEditor } from './components/editor/EducationEditor';
import { ProjectsEditor } from './components/editor/ProjectsEditor';
import { AwardsEditor } from './components/editor/AwardsEditor';
import { SkillsEditor } from './components/editor/SkillsEditor';
import type { CVData } from './types/cv';

function App() {
  // Initialize state with default JSON data
  const [cvData, setCvData] = useState<CVData>(resumeData as unknown as CVData);

  return (
    <EditorLayout
      form={
        <div className="space-y-8 pb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">CV Editor</h2>

          <BasicsEditor
            basics={cvData.basics}
            onChange={(newBasics) => setCvData({ ...cvData, basics: newBasics })}
          />

          <WorkEditor
            work={cvData.work}
            onChange={(newWork) => setCvData({ ...cvData, work: newWork })}
          />

          <ProjectsEditor
            projects={cvData.projects}
            onChange={(newProjects) => setCvData({ ...cvData, projects: newProjects })}
          />

          <EducationEditor
            education={cvData.education}
            onChange={(newEducation) => setCvData({ ...cvData, education: newEducation })}
          />

          <AwardsEditor
            awards={cvData.awards}
            onChange={(newAwards) => setCvData({ ...cvData, awards: newAwards })}
          />

          <SkillsEditor
            skills={cvData.skills}
            onChange={(newSkills) => setCvData({ ...cvData, skills: newSkills })}
          />
        </div>
      }
      preview={
        <Resume data={cvData} />
      }
    />
  );
}

export default App
