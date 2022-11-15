import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { screens } from "./scripts/constant/screens";
import { animations } from "./scripts/constant/animations";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "power2.inOut" });

const heroSection = document.querySelector(".js-hero") as HTMLElement;
const aboutSection = document.querySelector(".js-about") as HTMLElement;
const teamSection = document.querySelector(".js-team") as HTMLElement;
const isMobile = matchMedia(`(max-width: ${screens.sm})`).matches;
const scrollTriggerProps = {
	start: "top center",
	once: true,
};
export const heroAnime = () => {
	const header = heroSection.querySelector(".js-hero-header");
	const text = heroSection.querySelector(".js-hero-text");
	const animationHeader = isMobile
		? animations["from-bottom-with-opacity"]
		: animations["from-left-with-opacity"];
	const animationText = isMobile
		? animations["from-bottom-with-opacity"]
		: animations["from-right-with-opacity"];

	gsap.set(header, animationHeader.from);
	gsap.set(text, animationText.from);
	gsap
		.timeline({
			scrollTrigger: {
				trigger: heroSection,
				...scrollTriggerProps,
			},
		})
		.to(header, { ...animationHeader.to, duration: 0.8, delay: 0.2 })
		.to(text, { ...animationText.to, duration: 0.8 }, "<75%");
};

export const aboutAnime = () => {
	const listItems = aboutSection.querySelectorAll(".js-about-list li");
	const line = aboutSection.querySelector(".js-about-line");
	const text = aboutSection.querySelector(".js-about-text");
	const fromLeft = animations["from-left-with-opacity"];
	const listItemsAnime = isMobile
		? fromLeft
		: animations["from-right-with-opacity"];

	gsap.set([line, text], fromLeft.from);
	gsap.set(listItems, listItemsAnime.from);
	gsap
		.timeline({
			scrollTrigger: {
				...scrollTriggerProps,
				trigger: aboutSection,
				end: "75% 75%",
			},
		})
		.to([line, text], { ...fromLeft.to, duration: 0.8, delay: 0.2 })
		.to(
			listItems,
			{ ...listItemsAnime.to, stagger: 0.45, duration: 0.8 },
			"<75%"
		);
};

export const teamAnime = () => {
	const header = teamSection.querySelector(".js-team-header");
	const listItems = teamSection.querySelectorAll(".js-team-list li");
	const animeFromBottom = animations["from-bottom-with-opacity"];

	gsap.set(header, animeFromBottom.from);
	gsap.set(listItems, animeFromBottom.from);
	gsap
		.timeline({
			scrollTrigger: {
				...scrollTriggerProps,
				trigger: teamSection,
			},
		})
		.to(header, { ...animeFromBottom.to, duration: 0.8, delay: 0.2 })
		.to(listItems, { ...animeFromBottom.to, stagger: 0.3, duration: 0.8 });
};

const init = () => {
	heroAnime();
	aboutAnime();
	teamAnime();
};

init();
