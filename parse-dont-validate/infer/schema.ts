export interface Schema<Out> {
	parse(value: unknown): Out;
}

export type Infer<T> = T extends Schema<infer Out> ? Out : T;

// TODO: Declare a schema, show the output works

declare const stringSchema: any;
export type Output = any;
