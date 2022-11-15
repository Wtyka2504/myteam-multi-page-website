import { Director } from "../types/Director";
import Nikita from "/src/assets/images/avatar-nikita.jpg";
import Cristian from "/src/assets/images/avatar-christian.jpg";
import Cruz from "/src/assets/images/avatar-cruz.jpg";
import Drake from "/src/assets/images/avatar-drake.jpg";
import Griffin from "/src/assets/images/avatar-griffin.jpg";
import Aden from "/src/assets/images/avatar-aden.jpg";

export const directors: Director[] = [
	{
		name: "Nikita Marks",
		role: "Founder & CEO",
		quote:
			"It always amazes me how much talent there is in every corner of the globe.",
		avatar: Nikita,
	},
	{
		name: "Cristian Duncan",
		role: "Co-founder & COO",
		quote:
			"Distributed teams required unique processes. You need to approach work in a new way.",
		avatar: Cristian,
	},
	{
		name: "Cruz Hamer",
		role: "Co-founder & COO",
		quote:
			"Technology is at the forefront of enabling distributed teams. That's where we come in.",
		avatar: Cruz,
	},
	{
		name: "Drake Heaton",
		role: "Business Development Lead",
		quote:
			"Hiring similar people from similar backgrounds is a surefire way to stunt innovation.",
		avatar: Drake,
	},
	{
		name: "Griffin Wise",
		role: "Lead Marketing",
		quote:
			"Unique perspectives shape unique products, which is what you need to survive these days.",
		avatar: Griffin,
	},
	{
		name: "Aden Allan",
		role: "Head of Talent",
		quote:
			"Empowered teams create truly amazing products. Set the north star and let them follow it.",
		avatar: Aden,
	},
];
