import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/dist-cjs/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
  },
})
