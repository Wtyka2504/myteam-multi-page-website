type Form = HTMLFormElement;
interface Options {
	prevent?: boolean;
}
interface IFormValidator extends Options {
	form: Form;
}
// type InputValids = {
// 	min?: number;
// 	max?: number;
// 	regex?: string;
// };

export class FormValidator implements IFormValidator {
	form: HTMLFormElement;
	prevent = false;
	constructor(form: Form, options?: Options) {
		this.form = form;
		if (options) this.initOptions(options);
	}
	initOptions(options: Options) {
		this.prevent = options.prevent || false;
	}
}
