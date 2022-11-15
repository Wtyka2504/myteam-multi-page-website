/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./index.html", "./pages/*.html", "./src/**/*.{js,ts}"],
	theme: {
		extend: {
			textOpacity: ["active"],
			gridTemplateColumns: {
				"footer-desktop": "auto 1fr 1fr",
			},
			gridTemplateRows: {
				"footer-desktop": "repeat(2, auto)",
			},
			maxWidth: {
				240: "240px",
				445: "445px",
				540: "540px",
				730: "730px",
				900: "900px",
				"1/2": "50%",
				1: "100%",
			},
			screens: {
				lg: "1180px",
				xl: "1440px",

				"xl-max": {
					max: "1440px",
				},
				"lg-max": {
					max: "1180px",
				},
				"md-max": {
					max: "768px",
				},
				"sm-max": {
					max: "640px",
				},
				"xsm-max": {
					max: "420px",
				},
			},
			colors: {
				white: "#fff",
				black: "#000",
				midnight: "#014E56",
				coral: "#F67E7E",
				"rapture-blue": "#79C8C7",
				"police-blue": "#2C6269",
				"jungle-green": "#004047",
				"state-green": "#012F34",
				"dark-green": "#002529",
			},
		},

		fontSize: {
			"3xl": [
				"10rem",
				{
					fontWeight: 700,
					lineHeight: "10rem",
				},
			],
			"2xl": [
				"6.4rem",
				{
					fontWeight: 700,
					lineHeight: "5.6rem",
				},
			],
			xl: [
				"4.8rem",
				{
					fontWeight: 700,
					lineHeight: "4.8rem",
				},
			],
			l: [
				"3.2rem",
				{
					fontWeight: 700,
					lineHeight: "3.2rem",
				},
			],
			base: [
				"1.8rem",
				{
					fontWeight: 600,
					lineHeight: "2.8rem",
				},
			],
			sm: [
				"1.5rem",
				{
					fontWeight: 600,
					lineHeight: "2.5rem",
				},
			],
			xsm: [
				"1.3rem",
				{
					fontWeight: 500,
					lineHeight: "1.8rem",
				},
			],
		},
		container: {
			padding: {
				DEFAULT: "2rem",
				lg: "4rem",
				md: "2.5rem",
			},
			center: true,
		},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				".avatar-lg": {
					width: "9.6rem",
					height: "9.6rem",
					border: "2px solid var(--rapture-blue)",
					"border-radius": "50%",
				},
				".avatar": {
					width: "6.2rem",
					height: "6.2rem",
					border: "2px solid var(--rapture-blue)",
					"border-radius": "50%",
				},
				".icon-lg": {
					width: "5.6rem",
					height: "5.6rem",
				},
				".icon": {
					width: "2.4rem",
				},
				".icon-sm": {
					width: "2rem",
				},
				".rotate-y-180": {
					transform: "rotateY(180deg)",
				},
				".backface-y-1-180": {
					transform: "translateZ(-1rem) rotateY(180deg)",
				},
				".preserve-3d": {
					"transform-style": "preserve-3d",
				},
				"backface-visible": {
					"backface-visibility": "visible",
				},
				"animation-complete": {
					"animation-duration": "0ms",
				},
			});
		},
	],
};
