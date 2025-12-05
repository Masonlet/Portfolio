import { defineConfig } from 'vite'

export default defineConfig({
  root: 'public',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: 'esbuild',
    assetsDir: '',   
    rollupOptions: {
      input: {
        main: 'public/index.html',
        projects: 'public/projects.html',
        contacts: 'public/contacts.html',
        resume: 'public/resume.html'
      }
    },
  },
});
