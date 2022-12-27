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

export function assert<T extends TypeOfs>(value: unknown, type: T, path: Path): asserts value is TypeOfsMap[T] {
	if (typeof value !== type) {
		throw new Error(`Expected a ${type} at \`.${path.length === 0 ? '' : path.join('.')}\`. Received \`${value}\``);
	}
}

export type Infer<P> = P extends Parser<infer Output> ? Output : never;

export const isKey = <T extends object, K extends string | number | symbol>(
	key: K,
	object: T,
): object is T & Record<K, unknown> => key in object;
