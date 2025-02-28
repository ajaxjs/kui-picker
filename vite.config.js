import { resolve } from 'path';
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist', // 打包输出目录
    lib: {
      entry: resolve(__dirname, "packages/index.js"), // 组件库入口文件
      name: "KuiPicker", // 组件库名称
      fileName: "kui-picker", // 打包后的文件名
    },
    terserOptions: {
      compress: {
        drop_console: true, // 删除 console.* 函数调用
        drop_debugger: true // 删除 debugger 语句
      },
      format: {
        comments: true // 删除所有注释
      }
    }
  },
  plugins: [vue(), tailwindcss()],
});
