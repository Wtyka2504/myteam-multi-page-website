type Form = HTMLFormElement;

type Length = {
	length: number;
	message?: string;
};
type FormElement = {
	element: HTMLInputElement | HTMLTextAreaElement;
	valids: YupProps;
};
type Errors = {
	required?: string;
	length?: string;
	min?: string;
	max?: string;
	empty: boolean;
	[index: string]: string | undefined | boolean;
};
type OnInputEvent = (element: Element, errors: Errors) => void;
type YupProps = {
	name: string;
	required?: {
		value: boolean;
		message?: string;
	};
	length?: Length;
	min?: Length;
	max?: Length;
	onInput?: OnInputEvent;
};
interface IFormOptions {
	onSubmit?: () => void;
	onInput?: OnInputEvent;
}
interface IFormValidator {
	form: Form;
	validations: YupProps[];
	options?: IFormOptions;
}
interface IFormConstructor {
	form: Form;
	validations: IYup[];
}

export class FormValidator implements IFormValidator {
	form;
	elements: FormElement[];
	validations;
	options;
	errors: {
		[name: string]: Errors;
	} = {};
	constructor({ form, validations }: IFormConstructor, options?: IFormOptions) {
		const validProps = validations.map((yup) => yup.get());
		this.form = form;
		this.elements = validProps
			.map((valids) => {
				return { element: form.elements.namedItem(valids.name), valids };
			})
			.filter((element) => element.element !== null) as FormElement[];
		this.validations = validProps;
		this.options = options;
		this.initValidations();
		this.initForm();
	}
	initValidations() {
		this.elements.forEach(
			({ element, valids: { name, min, max, length, required, onInput } }) => {
				this.errors[name] = {
					required: undefined,
					length: undefined,
					min: undefined,
					max: undefined,
					empty: false,
				};
				if (element === null) return;
				if (element instanceof Element)
					element.addEventListener("input", () => {
						const value = (element as HTMLInputElement).value.trim();
						if (!value) this.errors[name].empty = true;
						else this.errors[name].empty = false;

						if (min) {
							if (min.length > value.length)
								this.errors[name].min = min.message;
							else this.errors[name].min = undefined;
						}
						if (max) {
							if (max.length < value.length)
								this.errors[name].max = max.message;
							else this.errors[name].max = undefined;
						}
						if (length) {
							if (length.length !== value.length)
								this.errors[name].length = length.message;
							else this.errors[name].length = undefined;
						}
						if (required) {
							if (required.value && value.length === 0)
								this.errors[name].required = required.message;
							else this.errors[name].required = undefined;
						}
						if (onInput) onInput(element, this.errors[name]);
						else if (this.options?.onInput)
							this.options.onInput(element, this.errors[name]);
					});
			}
		);
	}
	initForm() {
		this.form.addEventListener("submit", (e) => {
			e.preventDefault();

			if (!this.isFormCorrect) return;
			if (this?.options?.onSubmit) this.options.onSubmit();
		});
	}
	get isAnyError() {
		return Object.values(this.errors)
			.map((error) => Object.values(error))
			.some((value) => value !== undefined);
	}
	get isAnyRequiredElementEmpty() {
		return this.elements.some(({ element, valids: { required } }) => {
			if (!required) return false;
			if (!element.value.trim()) return true;
			return false;
		});
	}
	get isFormCorrect() {
		if (this.isAnyError) return false;
		if (this.isAnyRequiredElementEmpty) return false;
		return true;
	}
	onInput(
		element: Element | RadioNodeList,
		onInput: (element: Element, errors: { [name: string]: Errors }) => void
	) {
		if (element instanceof Element)
			element.addEventListener("input", () => {
				onInput(element, this.errors);
			});
		else
			element.forEach((el) =>
				el.addEventListener("input", () => {
					onInput(el as Element, this.errors);
				})
			);
	}
}
interface IYup {
	required: (bool: boolean, message?: string) => IYup;
	max: (length: number, message?: string) => IYup;
	min: (length: number, message?: string) => IYup;
	onInput: (handler: (element: Element, errors: Errors) => void) => IYup;
	get: () => YupProps;
}
export const Yup = (name: string) => {
	const props: YupProps = {
		name,
	};
	const self: IYup = {
		required: (bool: boolean, message?: string) => {
			props.required = {
				value: bool,
				message,
			};
			return self;
		},
		max: (length: number, message?: string) => {
			props.max = {
				length,
				message,
			};
			return self;
		},
		min: (length: number, message?: string) => {
			props.min = {
				length,
				message,
			};
			return self;
		},
		onInput: (handler) => {
			props.onInput = handler;
			return self;
		},
		get: () => props,
	};
	return self;
};
