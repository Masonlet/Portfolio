export default {
  root: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'public/index.html',
        projects: 'public/projects.html',
        contacts: 'public/contacts.html',
        resume: 'public/resume.html'
      }
    }
  }
}
