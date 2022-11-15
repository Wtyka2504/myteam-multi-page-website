import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { screens } from "./scripts/constant/screens";
import { animations } from "./scripts/constant/animations";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "power2.inOut" });

const section = document.querySelector(".js-contact") as HTMLElement;
const form = section.querySelector(".js-form") as HTMLElement;
const isMobile = matchMedia(`(max-width: ${screens.sm})`).matches;
const scrollTriggerProps = {
	start: "top center",
	once: true,
};
const pageAnime = () => {
	const headers = section.querySelectorAll(".js-header");
	const listItems = section.querySelectorAll(".js-list li");
	const formLabels = form.querySelectorAll("label");
	const fromLeft = animations["from-left-with-opacity"];
	const fromRight = animations["from-right-with-opacity"];
	const formLabelsAnime = isMobile ? fromLeft : fromRight;

	gsap.set(headers, fromLeft.from);
	gsap.set(listItems, fromLeft.from);
	gsap.set(formLabels, formLabelsAnime.from);
	gsap
		.timeline()
		.to(headers, {
			scrollTrigger: {
				...scrollTriggerProps,
				trigger: headers,
			},
			...fromLeft.to,
			duration: 0.6,
			delay: 0.3,
		})
		.to(listItems, { ...fromLeft.to, stagger: 0.3, duration: 0.8 }, "<50%");
	gsap.to(formLabels, {
		scrollTrigger: {
			...scrollTriggerProps,
			trigger: form,
		},
		...formLabelsAnime.to,
		stagger: 0.3,
		duration: 0.8,
		delay: 0.2,
	});
};

const init = () => {
	pageAnime();

	form.addEventListener("submit", (e) => {
		e.preventDefault();
	});
};

init();
