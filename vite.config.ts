import { tanstackRouter } from "@tanstack/router-plugin/vite"
import * as path from "node:path"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			quoteStyle: "double",
			semicolons: false,
			routesDirectory: "./src/pages",
			generatedRouteTree: "./src/pageTree.gen.ts",
		}),
		visualizer({
			open: true,
		}),
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
	],
	resolve: {
		alias: {
			src: path.resolve(__dirname, "./src"),
		},
	},
})
