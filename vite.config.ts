import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import myPlugin from './plugins'
export default defineConfig({
  plugins: [vue(),myPlugin('dev','test')]
})
