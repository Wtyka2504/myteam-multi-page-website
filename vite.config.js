import { defineConfig } from "vite";
import { resolve } from "path";

const pageData = {
	"/index.html": {
		title: "My team",
		page: "home",
	},
	"/pages/about.html": {
		title: "My team - About",
		page: "about",
	},
	"/pages/contact.html": {
		title: "My team - Contact",
		page: "contact",
	},
};

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
