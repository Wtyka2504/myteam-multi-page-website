/* eslint-disable indent */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Director } from "./scripts/components/Director/Director";
import { directors } from "./scripts/constant/about-cards";
import { animations } from "./scripts/constant/animations";
import { screens } from "./scripts/constant/screens";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

// or only core styles
import "@splidejs/splide/css/core";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "power2.inOut" });

const heroSection = document.querySelector(".js-hero") as HTMLElement;
const directorsSection = document.querySelector(".js-directors") as HTMLElement;
const directorsList = directorsSection.querySelector(
	".js-directors-list"
) as HTMLElement;
const directorsItems = directors.map((director) => Director(director));
const clientsSection = document.querySelector(".js-clients") as HTMLElement;
const clientCarouselSection = clientsSection.querySelector(
	".js-clients-carousel"
);
const clientsList = clientsSection.querySelector(
	".js-clients-list"
) as HTMLElement;
const matchMobileBreakpoint = matchMedia(`(max-width: ${screens.sm})`);
const isMobile = matchMobileBreakpoint.matches;
const scrollTriggerProps = {
	start: "top center",
	once: true,
};
const carousel = isMobile
	? undefined
	: new Splide(".splide", {
			type: "loop",
			perPage: clientsList.children.length,
			drag: false,
			gap: 30,
			arrows: false,
			autoScroll: {
				autoStart: false,
				speed: 0.5,
				pauseOnHover: false,
				pauseOnFocus: false,
			},
	  }).mount({ AutoScroll });
const heroAnime = () => {
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
		.to(header, { ...animationHeader.to, delay: 0.2 })
		.to(text, animationText.to, "<75%")
		.duration(1.6);
};

const directorsAnime = () => {
	const header = directorsSection.querySelector(".js-directors-header");
	const anime = animations["from-bottom-with-opacity"];

	gsap.set([header, ...directorsItems], anime.from);
	gsap
		.timeline({
			scrollTrigger: {
				trigger: directorsSection,
				...scrollTriggerProps,
			},
		})
		.to(header, { ...anime.to, delay: 0.2, duration: 0.8 })
		.to(directorsItems, { ...anime.to, stagger: 0.2, duration: 0.8 });
};

const clientsAnime = () => {
	const header = clientsSection.querySelector(".js-clients-header");
	const anime = animations["from-bottom-with-opacity"];

	gsap.set([header, clientCarouselSection], anime.from);
	gsap
		.timeline({
			scrollTrigger: {
				...scrollTriggerProps,
				trigger: clientsSection,
			},
		})
		.to([header, clientCarouselSection], {
			...anime.to,
			delay: 0.2,
			duration: 0.8,
			onComplete: () => {
				if (!carousel) return;
				setTimeout(() => {
					carousel.Components.AutoScroll?.play();
				}, 300);
			},
		});
};

const init = () => {
	directorsList.append(...directorsItems);
	heroAnime();
	directorsAnime();
	clientsAnime();

	// I hope, I will fix it in the future
};

init();
