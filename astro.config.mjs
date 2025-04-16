import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { autolinkConfig } from "./plugins/rehype-autolink-config";
import rehypeSlug from "rehype-slug";
import alpinejs from "@astrojs/alpinejs";
import AstroPWA from "@vite-pwa/astro";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	site: "https://alumnilift.netlify.app",
	vite: {
		define: {
			__DATE__: `'${new Date().toISOString()}'`,
		},
	},
	integrations: [
		tailwind(),
		sitemap(),
		alpinejs(),
		AstroPWA({
			mode: "production",
			base: "/",
			scope: "/",
			registerType: "autoUpdate",
			manifest: {
				name: "AlumniLift - Alumni powering the future of research, one project at a time",
				short_name: "AlumniLift",
				theme_color: "#ffffff",
			},
			workbox: {
				navigateFallback: "/404",
				globPatterns: ["*.js"],
			},
			devOptions: {
				enabled: false,
				navigateFallbackAllowlist: [/^\/404$/],
				suppressWarnings: true,
			},
		}),
		icon(),
	],
	markdown: {
		rehypePlugins: [
			rehypeSlug,
			// This adds links to headings
			[rehypeAutolinkHeadings, autolinkConfig],
		],
	},
	experimental: {
		contentCollectionCache: true,
	},
});