import type {Path} from './1-params';
import type {Parser} from './2-parser';

type TypeOfs = 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';

type TypeOfsMap = {
	string: string;
	number: number;
	bigint: bigint;
	boolean: boolean;
	symbol: symbol;
	undefined: undefined;
	object: object;
	function: Function;
};

export class MyZodError extends Error {
	constructor(received: unknown, expected: unknown, path: Path) {
		super(`Expected ${expected} at \`.${path.length === 0 ? '' : path.join('.')}\`. Received \`${received}\``);
	}
}

export function assert<T extends TypeOfs>(value: unknown, type: T, path: Path): asserts value is TypeOfsMap[T] {
	if (typeof value !== type) {
		throw new MyZodError(value, type, path);
	}
}

export type Infer<P> = P extends Parser<infer Output> ? Output : never;

export const isKey = <T extends object, K extends string | number | symbol>(
	key: K,
	object: T,
): object is T & Record<K, unknown> => key in object;
