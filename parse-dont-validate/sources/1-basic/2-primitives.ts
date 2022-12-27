import type {Parser} from './1-parser';

export function string(): Parser<string> {
	return {
		parse: value => {
			if (typeof value !== 'string') {
				// piss ourselves
				throw new Error('Expected string');
			}

			return value;
		},
	};
}

export function number(): Parser<number> {
	return {
		parse: value => {
			if (typeof value !== 'number') {
				throw new Error('Expected number');
			}

			return value;
		},
	};
}

export function boolean(): Parser<boolean> {
	return {
		parse: value => {
			if (typeof value !== 'boolean') {
				throw new Error('Expected boolean');
			}

			return value;
		},
	};
}
