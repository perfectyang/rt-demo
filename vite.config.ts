import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'
// import { getExportsRuntime, getExportsStatic } from 'pkg-exports'

const paths = (dir: string) => resolve(__dirname, '.', dir)

// const exports = await getExportsRuntime(paths('src/utils/index.ts'))
// const exports = await import(paths('src/utils/index.js'))
// console.log('exports', Object.keys(exports))
// const arr = Object.keys(exports)



// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': paths('src'),
    },
  },
  plugins: [
    react(),
    AutoImport({
      // eslintrc: {
      //   enabled: true, // <-- this
      // },
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      ],
      imports: [
        {
          '@/utils': [
            // 'goRun',
            // 'testRun'
          ]
        }
      ],
      dts: './auto-imports.d.ts',
    })
  ],
  base: './',
})
