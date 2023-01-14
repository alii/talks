export interface Schema<T> {
	parse(value: unknown): T;
}

// TODO: Write a schema for strings,
// a literal string, booleans and numbers

const stringSchema: Schema<string> = {
	parse: value => {
		if (typeof value !== 'string') {
			throw new Error('NO!');
		}

		return value;
	},
};
