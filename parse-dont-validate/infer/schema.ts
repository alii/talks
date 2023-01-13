export interface Schema<Out> {
	parse(value: unknown): Out;
}

// TODO: Implement Infer<T> which will extract
// the output of a schema.

export type Infer<T> = any;

// TODO: Demonstrate usage

declare const myObscureSchema: Schema<1 | 'world' | string[]>;
export type Output = Infer<typeof myObscureSchema>;
//          ^?
