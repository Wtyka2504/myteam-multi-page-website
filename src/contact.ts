import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { screens } from "./scripts/constant/screens";
import { animations } from "./scripts/constant/animations";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "power2.inOut" });

const section = document.querySelector(".js-contact") as HTMLElement;
const form = section.querySelector(".js-form") as HTMLFormElement;
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
const enableWrongField = (
	field: HTMLInputElement | HTMLTextAreaElement,
	message: string
) => {
	const label = field.closest(".label") as HTMLLabelElement;
	const span = label.querySelector(".js-input-message") as HTMLSpanElement;

	field.classList.add("wrong");
	span.textContent = message;
};
const disableWrongField = (field: HTMLInputElement | HTMLTextAreaElement) => {
	const label = field.closest(".label") as HTMLLabelElement;
	const span = label.querySelector(".js-input-message") as HTMLSpanElement;

	field.classList.remove("wrong");
	span.textContent = "";
};
const formSubmit = (fields: { [name: string]: string }) => {
	console.log(fields);
};
const isEmailCorrect = (string: string) => {
	return /^[^@\s]+@[^@\s]+\.[^@\s]+$/gim.test(string);
};
const formInit = () => {
	const name = form.elements.namedItem("name") as HTMLInputElement;
	const email = form.elements.namedItem("email") as HTMLInputElement;
	const company = form.elements.namedItem("company") as HTMLInputElement;
	const title = form.elements.namedItem("title") as HTMLInputElement;
	const message = form.elements.namedItem("message") as HTMLTextAreaElement;

	[name, message, email].forEach((field) => {
		field.addEventListener("focusin", () => disableWrongField(field));
	});

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		let isFormCorrect = true;
		[name, message, email].forEach((field) => {
			const value = field.value.trim();
			if (value) return;
			enableWrongField(field, "This field is required");
			isFormCorrect = false;
		});
		if (!isEmailCorrect(email.value.trim())) {
			isFormCorrect = false;
			enableWrongField(email, "Please use a valid email address");
		}
		console.log(isEmailCorrect(email.value.trim()));
		if (!isFormCorrect) return;

		formSubmit({
			name: name.value,
			email: email.value,
			company: company.value,
			title: title.value,
			message: message.value,
		});
	});
};
const init = () => {
	pageAnime();
	formInit();
};

init();
