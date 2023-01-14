export interface Schema<Out> {
	parse(value: unknown): Out;
}

export interface NumberSchema extends Schema<number> {
	min(minimum: number): NumberSchema;
	max(maximum: number): NumberSchema;
}

// TODO: Implement definition for number

type NumberDefinition = {
	min: number | undefined;
	max: number | undefined;
};

const number = (
	def: NumberDefinition = {
		min: undefined,
		max: undefined,
	},
): NumberSchema => {
	return {
		parse(value) {
			if (typeof value !== 'number') {
				throw new Error('NO!');
			}

			if (def.max) {
				if (value > def.max) {
					throw new Error('NO!');
				}
			}

			return value;
		},

		min(minimum: number) {
			return number({
				...def,
				min: minimum,
			});
		},

		max(maximum: number) {
			return number({
				...def,
				max: maximum,
			});
		},
	};
};
