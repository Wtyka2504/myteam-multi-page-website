type IAnimations = {
	[key: string]: {
		from: {
			[prop: string]: string | number;
		};
		to: {
			[prop: string]: string | number;
		};
	};
};

export const animations: IAnimations = {
	"from-left-with-opacity": {
		from: {
			x: "-100%",
			opacity: 0,
		},
		to: {
			x: "0%",
			opacity: 1,
		},
	},

	"from-right-with-opacity": {
		from: {
			x: "100%",
			opacity: 0,
		},
		to: {
			x: "0%",
			opacity: 1,
		},
	},
	"from-top-with-opacity": {
		from: {
			y: "-100%",
			opacity: 0,
		},
		to: {
			y: "0%",
			opacity: 1,
		},
	},
	"from-bottom-with-opacity": {
		from: {
			y: "100%",
			opacity: 0,
		},
		to: {
			y: "0%",
			opacity: 1,
		},
	},
};
