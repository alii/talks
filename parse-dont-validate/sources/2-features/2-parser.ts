import {ParseParams, defaultParseParams} from './1-params';
import {Infer, assertType, isKey} from './3-utils';

export interface Parser<Output> {
	parse: (value: unknown, params?: ParseParams) => Output;
}

export function string(): Parser<string> {
	return {
		parse: (value, params = defaultParseParams()) => {
			assertType(value, 'string', params.path);
			return value;
		},
	};
}

export function object<Shape extends Record<string, Parser<unknown>>>(
	shape: Shape,
): Parser<{
	[Key in keyof Shape]: Infer<Shape[Key]>;
}> {
	return {
		parse(value, params = defaultParseParams()) {
			if (typeof value !== 'object' || value === null) {
				throw new Error('Expected object');
			}

			const result = {} as {
				[Key in keyof Shape]: Infer<Shape[Key]>;
			};

			for (const key in shape) {
				if (!isKey(key, value)) {
					throw new Error(`Missing key: ${key}`);
				}

				result[key] = (shape[key] as Parser<Infer<Shape[keyof Shape]>>).parse(value[key], {
					// Spread new path in, now child schemas know
					// where they are.
					path: [...params.path, key],
				});
			}

			return result;
		},
	};
}
