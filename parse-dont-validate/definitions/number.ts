export interface Schema<Out> {
	parse(value: unknown): Out;
}

export interface NumberSchema extends Schema<number> {
	min(minimum: number): NumberSchema;
	max(maximum: number): NumberSchema;
	integer(): NumberSchema;
	positive(): NumberSchema;
	negative(): NumberSchema;
}

// TODO: Implement definition for number
