import { defineConfig } from "vite";
import { resolve } from "path";
import autoprefixer from "autoprefixer";

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				home: resolve(__dirname, "index.html"),
				about: resolve(__dirname, "pages/about.html"),
				contact: resolve(__dirname, "pages/contact.html"),
			},
		},
	},
});
