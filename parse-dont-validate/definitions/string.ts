export interface Schema<Out> {
	parse(value: unknown): Out;
}

export interface StringSchema extends Schema<string> {
	min(minimum: number): StringSchema;
	max(maximum: number): StringSchema;
}

type StringDefinition = {
	readonly isEmail: boolean;
	readonly isURL: boolean;
	readonly min: number;
	readonly max: number | undefined;
};

const string = (
	def: StringDefinition = {
		isEmail: false,
		isURL: false,
		min: 0,
		max: undefined,
	},
): StringSchema => {
	return {
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

			return value;
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
	};
};

const name = string().min(10).max(12);

name.parse('aaaaaaaaaaaa');
