import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"

export default {
  input: "app/javascript/application.js",
  output: {
    file: "app/assets/builds/application.js",
    format: "es",
    inlineDynamicImports: true
  },
  plugins: [
    resolve(),
    typescript({ tsconfig: './tsconfig.json' })
  ]
}
