import { useState } from 'react';
import resumeDataDe from './data/resume.de.json';
import resumeDataEn from './data/resume.en.json';
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
  const [language, setLanguage] = useState<'de' | 'en'>(() => {
    const saved = localStorage.getItem('cv_language_preference');
    return (saved === 'en' ? 'en' : 'de');
  });

  const getInitialData = (lang: 'de' | 'en') => {
    return (lang === 'en' ? resumeDataEn : resumeDataDe) as unknown as CVData;
  };

  const [cvData, setCvData] = useState<CVData>(getInitialData(language));
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/save?lang=${language}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cvData),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      setLastSaved(new Date());
      // Optional: Show success feedback (toast, etc.)
      console.log('Saved successfully');
    } catch (error) {
      console.error('Error saving:', error);
      // Optional: Show error feedback
    } finally {
      setIsSaving(false);
    }
  };



  const handleLanguageChange = (newLang: 'de' | 'en') => {
    setLanguage(newLang);
    localStorage.setItem('cv_language_preference', newLang);
    setCvData(getInitialData(newLang));
  };

  return (
    <EditorLayout
      onSave={handleSave}
      isSaving={isSaving}
      lastSaved={lastSaved}
      currentLanguage={language}
      onLanguageChange={handleLanguageChange}
      form={
        <div className="space-y-8 pb-10">

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
