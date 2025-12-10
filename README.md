# CVMake

CVMake is a flexible, highly customizable web application designed to generate a professional Curriculum Vitae (CV) from a structured JSON data file.

Instead of wrestling with Word documents or rigid online builders, CVMake allows you to maintain your career data in a clean `resume.json` file and renders it into a pixel-perfect layout using React and Tailwind CSS. The final output is optimized for printing to PDF via your browser.

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually included with Node.js)

### Installation
1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone https://github.com/Highstorm/CVMake.git
    cd CVMake
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Running the Application
Start the local development server:
```bash
npm run dev
```
Open the URL shown in your terminal (usually `http://localhost:5173`) in your web browser (Chrome or Edge recommended for best PDF export).

---

## 📝 How It Works

### The Input: `resume.json`
The heart of your CV is the data file located at:
`src/data/resume.json`

This file contains all the content displayed on your CV. To update your CV, simply edit this JSON file. The data is structured into several key sections:

- **`basics`**: Personal information (Name, Email, Phone, Location).
- **`headings`**: Customizable titles for the sections (e.g., "Experience" vs "Berufserfahrung").
- **`work`**: Array of your job history.
    - `highlights`: A list of bullet points describing your achievements.
- **`education`**: Array of your academic background.
- **`projects`**: Significant projects or competencies.
- **`skills`**: Language skills or technical domains.
- **`awards`**: Certificates and qualifications.

#### Example Data Structure
```json
{
  "basics": {
    "name": "Max Mustermann",
    "email": "max@example.com",
    "location": { "address": "Berlin, DE" }
  },
  "work": [
    {
      "company": "Tech Corp",
      "position": "Senior Developer",
      "startDate": "2020-01",
      "highlights": [
        "Improved system performance by 50%",
        "Led a team of 5 developers"
      ]
    }
  ]
}
```

### The Output: Generating the PDF
CVMake relies on the browser's native print engine to generate the PDF. I have optimized the CSS (`@media print`) to ensure it looks exactly like the screen version.

1.  Open the application in your browser (`http://localhost:5173`).
2.  Press `Cmd + P` (Mac) or `Ctrl + P` (Windows) to open the print dialog.
3.  **Destination**: Select "Save as PDF".
4.  **Margins**: Set to "Default" or "None" (The app handles margins internally).
5.  **Options**: Ensure **"Background graphics"** is CHECKED (required for styling).
6.  Click **Save**.

---

## 🎨 Customization

### Changing the Layout
The visual structure is defined in React components located in `src/components`.
- `Resume.tsx`: The main container that orchestrates the sections.
- `Header.tsx`, `WorkExperience.tsx`, etc.: Individual section components.

### Styling
Styling is handled with **Tailwind CSS**.
- **Global Styles & Print Settings**: `src/index.css`.
- **Component Styles**: Applied directly via className items in the components.

If you need to adjust spacing, fonts, or colors, modify the relevant component or the global CSS.

### Print Adjustments
The `src/index.css` file contains a `@media print` block.
- **Page Breaks**: The app is configured to allow sections to break across pages seamlessly.
- **Page Margins**: Top margins for subsequent pages (page 2+) are defined here (`margin: 20mm 0`).

---

## 🛠 Tech Stack
- **Vite**: Super fast build tool and dev server.
- **React**: UI library for building the component structure.
- **TypeScript**: Ensures data safety and helps prevent errors when editing the JSON structure.
- **Tailwind CSS (v4)**: Utility-first CSS framework for rapid styling.
