// Import "gen-2" (most recent) parser
import {defaultParseParams} from '../2-features/1-params';
import {Parser, object, string} from '../2-features/2-parser';
import {MyZodError} from '../2-features/3-utils';

export function exact<const T>(expect: T): Parser<T> {
	return {
		parse: (value, params = defaultParseParams()) => {
			if (value !== expect) {
				throw new MyZodError(value, expect, params.path);
			}

			return value as T;
		},
	};
}

const exactUsername = object({
	name: exact('Alistair Smith'),
	email: string(),
});

console.log(
	exactUsername.parse({
		name: 'Alistair Smith',
		email: 'hi@alistair.sh',
	}),
);

console.log(
	exactUsername.parse({
		name: 'Simon Wijckmans',
		email: 'hi@alistair.sh',
	}),
);
