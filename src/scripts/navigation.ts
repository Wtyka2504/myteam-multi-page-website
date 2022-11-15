import { gsap } from "gsap";

gsap.defaults({ ease: "power1.inOut" });

const nav = document.querySelector(".js-nav") as HTMLElement;
const wrapper = nav.querySelector(".js-nav-wrapper") as HTMLElement;
const wrapperInner = nav.querySelector(".js-nav-wrapper-inner") as HTMLElement;
const navShow = nav.querySelector(".js-nav-show") as HTMLButtonElement;
const navHide = nav.querySelector(".js-nav-hide") as HTMLButtonElement;

export const showNav = () => {
	gsap
		.timeline({ onStart: () => wrapper.classList.add("active") })
		.fromTo(
			wrapper,
			{ opacity: 0, duration: 0 },
			{ opacity: 1, duration: 0.25 }
		)
		.to(wrapperInner, { x: "0%", duration: 0.25 }, ">-.1");
};
export const hideNav = () => {
	gsap
		.timeline({
			onComplete: function () {
				wrapper.classList.remove("active");
				wrapper.style.removeProperty("opacity");
				wrapperInner.style.removeProperty("transform");
			},
		})
		.to(wrapperInner, { x: "100%", duration: 0.25 })
		.to(wrapper, { opacity: 0, duration: 0.25 });
};
export const init = () => {
	navShow.addEventListener("click", showNav);
	navHide.addEventListener("click", hideNav);
	wrapper.addEventListener("click", (e) => {
		if (e.currentTarget !== e.target) return;
		hideNav();
	});
};
