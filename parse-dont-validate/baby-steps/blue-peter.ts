import {Schema} from './primitives';

// Here's one I made earlier
export const string = (): Schema<string> => ({
	parse: value => {
		if (typeof value === 'string') {
			return value;
		}

		throw new Error('Expected string');
	},
});
