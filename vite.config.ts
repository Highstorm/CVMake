import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'fs-save-plugin',
      configureServer(server) {
        server.middlewares.use('/api/save', (req, res, next) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const data = JSON.parse(body);

                // Define path to resume.json relative to project root
                const filePath = path.resolve(__dirname, 'src/data/resume.json');

                // Write the updated JSON to file
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

                res.statusCode = 200;
                res.end(JSON.stringify({ success: true, message: 'Saved successfully' }));
              } catch (error) {
                console.error('Error saving file:', error);
                res.statusCode = 500;
                res.end(JSON.stringify({ success: false, message: 'Failed to save file' }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
})
