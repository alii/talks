import {Schema} from './schema';

export interface NumberSchema extends Schema<number> {
	min(minimum: number): NumberSchema;
	max(maximum: number): NumberSchema;
	integer(): NumberSchema;
	positive(): NumberSchema;
	negative(): NumberSchema;
}

export type NumberDefinition = {
	readonly positivity: 'positive' | 'negative' | 'any';
	readonly isInteger: boolean;
	readonly min: number | undefined;
	readonly max: number | undefined;
};

export const defaultNumberDefinition: NumberDefinition = {
	isInteger: false,
	positivity: 'any',
	min: undefined,
	max: undefined,
};

export const number = (def: NumberDefinition = defaultNumberDefinition): NumberSchema => ({
	parse: value => {
		if (typeof value !== 'number') {
			throw new Error('Value is not a number');
		}

		if (def.min !== undefined && def.min > value) {
			throw new Error(`Value is too small, minimum is ${def.min}`);
		}

		if (def.max !== undefined && def.max < value) {
			throw new Error(`Value is too large, maximum is ${def.max}`);
		}

		if (def.isInteger && !Number.isInteger(value)) {
			throw new Error('Value is not an integer');
		}

		if (def.positivity === 'positive' && value < 0) {
			throw new Error('Value is not positive');
		}

		if (def.positivity === 'negative' && value > 0) {
			throw new Error('Value is not negative');
		}

		return value;
	},

	min: minimum => {
		return number({
			...def,
			min: minimum,
		});
	},

	max: maximum => {
		return number({
			...def,
			max: maximum,
		});
	},

	integer: () => {
		return number({
			...def,
			isInteger: true,
		});
	},

	positive: () => {
		return number({
			...def,
			positivity: 'positive',
		});
	},

	negative: () => {
		return number({
			...def,
			positivity: 'negative',
		});
	},
});
