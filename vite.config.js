import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isCloudflare = process.env.CF_PAGES === '1';
  const base = (command === 'build' && !isCloudflare) ? '/vaav-restaurant/' : '/'

  return {
    plugins: [react()],
    base,
  }
})
