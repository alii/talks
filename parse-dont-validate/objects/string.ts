import {Schema} from './schema';

export interface StringSchema extends Schema<string> {
	min(minimum: number): StringSchema;
	max(maximum: number): StringSchema;
	email(): StringSchema;
	url(): StringSchema;
}

export type StringDefinition = {
	readonly isEmail: boolean;
	readonly isURL: boolean;
	readonly min: number;
	readonly max: number | undefined;
};

export const string = (
	def: StringDefinition = {
		isEmail: false,
		isURL: false,
		min: 0,
		max: undefined,
	},
): StringSchema => ({
	parse: value => {
		if (typeof value !== 'string') {
			throw new Error('Value is not a string');
		}

		if (def.min > value.length) {
			throw new Error(`Value is too short, minimum length is ${def.min}`);
		}

		if (def.max !== undefined && def.max < value.length) {
			throw new Error(`Value is too long, maximum length is ${def.max}`);
		}

		// Loose validation, but this is an implementation
		// detail that doesn't matter much for a proof
		// of concept
		if (def.isEmail && !value.includes('@')) {
			throw new Error('Value is not a valid email');
		}

		// Again, more loose validation
		if (def.isURL && !value.startsWith('http')) {
			throw new Error('Value is not a valid URL');
		}

		return value;
	},

	email: () => {
		// Check for invalid state
		// There's probably a better solution for this
		// at scale, but this is fine for the demo
		if (def.isURL) {
			throw new Error('Cannot be both email and URL');
		}

		return string({
			...def,
			isEmail: true,
		});
	},

	url: () => {
		if (def.isEmail) {
			throw new Error('Cannot be both email and URL');
		}

		return string({
			...def,
			isURL: true,
		});
	},

	min: (minimum: number) => {
		return string({
			...def,
			min: minimum,
		});
	},

	max: (maximum: number) => {
		return string({
			...def,
			max: maximum,
		});
	},
});
