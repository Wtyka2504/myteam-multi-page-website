import Cross from "/src/assets/images/icon-cross.svg";
import Linkedin from "/src/assets/images/icon-linkedin.svg";
import Twitter from "/src/assets/images/icon-twitter.svg";
import type { Director as TDirector } from "../../types/Director";

const Button = (item: Element) => {
	const div = document.createElement("div");
	const html = `
	
		<button class="directors__btn">
			<img
				class="directors__cross"
				src="${Cross}"
				alt="icon"
			/>
		</button>
	`;

	div.innerHTML = html;

	const btn = div.children[0];
	btn.addEventListener("click", () => {
		item.classList.toggle("active");
	});

	return btn;
};

export const Director = (director: TDirector) => {
	const div = document.createElement("div");
	const html = `
	<li class="directors__item">
		<div class="directors__item-inner relative preserve-3d shadow-lg">
			<div
				class="flex flex-col items-center p-12 bg-state-green relative md-max:text-center"
			>
				<img
					class="avatar-lg"
					src="${director.avatar}"
					alt="Avatar of director"
				/>
				<div class="mt-6 mb-12">
					<p class="text-base !font-bold text-rapture-blue">${director.name}</p>
					<p class="text-sm !font-medium"><i>${director.role}</i></p>
				</div>
			</div>
			<div
				class="flex flex-col items-center px-12 py-20 absolute w-full h-full top-0 left-0 backface-y-1-180 bg-state-green space-y-4"
			>
				<p class="text-base !font-bold text-rapture-blue">${director.name}</p>
				<blockquote class="text-center">${director.quote}</blockquote>
				<div class="flex space-x-6">
					<a href="#">
						<img
							class="icon-sm"
							src="${Twitter}"
							alt="twitter"
						/>
					</a>
					<a href="#">
						<img
						class="icon-sm"
						src="${Linkedin}"
						alt="linkedin"
						/>
					</a>
				</div>
			</div>
		</div>
		<div class="directors__btn-wrapper"></div>
	</li>
	`;

	div.innerHTML = html;

	const item = div.children[0];

	div.querySelector(".directors__btn-wrapper")?.append(Button(item));

	return item;
};
