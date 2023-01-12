import {expect} from './utils';

export function assert(value: unknown): asserts value {
	if (!value) {
		throw new Error('Value is not truthy');
	}
}

declare const something: string | null | undefined | false | 0 | undefined;

assert(something);

expect<string>(something);
