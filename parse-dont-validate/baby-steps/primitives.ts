export interface Schema<T> {
	parse(value: unknown): T;
}

// TODO: Write a schema for strings,
// a literal string, booleans and numbers
