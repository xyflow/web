import { defineConfig } from 'tsup'
import packageJson from './package.json'

export default defineConfig({
  name: packageJson.name,
  format: 'esm',
  dts: true,
  bundle: false,
  entry: [
    'src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/__tests__',
    '!**/*.{test,spec}.{ts,tsx}'
  ]
})
