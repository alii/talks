export interface Parser<Output> {
	parse: (value: unknown) => Output;
}
