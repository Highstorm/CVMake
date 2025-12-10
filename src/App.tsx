import resumeData from './data/resume.json';
import { Resume } from './components/Resume';
import type { CVData } from './types/cv';

function App() {
  // Cast import to CVData to ensure type safety if JSON import is loose
  const data = resumeData as unknown as CVData;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 print:p-0 print:bg-white">
      <Resume data={data} />
    </div>
  )
}

export default App
