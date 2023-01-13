export interface Schema<Out> {
	parse(value: unknown): Out;
}

export type Infer<T> = T extends Schema<infer Out> ? Out : T;
