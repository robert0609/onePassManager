import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import ElementPlus from 'unplugin-element-plus/vite';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData(source: string, filename: string): Promise<string> {
          const absoluteThemeFileName = path.resolve(__dirname, './src/assets/css/_theme.scss');
          const relativeThemeFileName = path.relative(path.dirname(filename), absoluteThemeFileName);
          const result = `
            @import '${relativeThemeFileName}';
            ${source}
          `;
          return Promise.resolve(result);
        }
      }
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  plugins: [
    vue(),
    vueJsx(),
    ElementPlus()
  ],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, 'src') }
    ],
  },
  build: {
    minify: true,
    sourcemap: true,
    rollupOptions: {
      plugins: [
        visualizer(
          {
            filename: path.resolve(__dirname, 'stats.html'),
            template: 'treemap',
            sourcemap: true
          }
        )
      ]
    }
  },
  server: {
    proxy: {
      '/webapi': {
        target: 'http://192.168.1.4:18888',
        changeOrigin: true
      },
      '/login': {
        target: 'http://192.168.1.4:18888',
        changeOrigin: true
      }
    }
  }
})
