import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 7000,
    /** macOS often binds Control Center (AirPlay) to 7000; next free port is used if so. */
    strictPort: false,
  },
})
