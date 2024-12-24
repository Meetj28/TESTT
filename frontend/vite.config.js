import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@convergencelabs/monaco-collab-ext": "@convergencelabs/monaco-collab-ext",
//     },
//   },
//   optimizeDeps: {
//     include: ["@convergencelabs/monaco-collab-ext"],
//   },
// });
