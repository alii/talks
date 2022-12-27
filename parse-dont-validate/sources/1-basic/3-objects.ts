import type {Parser} from './1-parser';
import type {Infer} from './1.5-infer';

const isKey = <T extends object, K extends string | number | symbol>(
	key: K,
	object: T,
): object is T & Record<K, unknown> => key in object;

export function object<Shape extends Record<string, Parser<unknown>>>(
	shape: Shape,
): Parser<{
	[Key in keyof Shape]: Infer<Shape[Key]>;
}> {
	return {
		parse(value) {
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

				result[key] = (shape[key] as Parser<Infer<Shape[keyof Shape]>>).parse(value[key]);
			}

			return result;
		},
	};
}
