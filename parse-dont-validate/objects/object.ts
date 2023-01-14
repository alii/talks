import { number } from './number';
import {Infer, Schema} from './schema';
import { string } from './string';

export interface ObjectSchema<T> extends Schema<T> {}
export type AnyObjectShape = Record<string, Schema<any>>;

export type ObjectDefinition<T> = {
	shape: T;
};

export const object = <T extends AnyObjectShape>(
	shape: T,
): ObjectSchema<{
	[Key in keyof T]: Infer<T[Key]>;
}> => ({
	parse: value => {
		if (typeof value !== 'object' || value === null) {
			throw new Error('Value is not an object');
		}

		const result: Record<string, unknown> = {};

		for (const key in shape) {
			if (!(key in value)) {
				throw new Error(`Value is missing key ${key}`);
			}

			result[key] = shape[key].parse(value[key as keyof typeof value]);
		}

		return result as {
			[Key in keyof T]: T[Key] extends Schema<infer Out> ? Out : never;
		};
	},
});

const user = object({
	username: string().min(2),
	age: number().min(18),
});

user.parse({
	username: '',
	age: 19,
}).username;