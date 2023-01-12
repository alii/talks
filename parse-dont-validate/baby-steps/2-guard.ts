import {expect} from './utils';

const expectNumber = expect<number>;

export function isNumber(value: unknown): value is number {
	return typeof value === 'number';
}

declare const something: unknown;

if (isNumber(something)) {
	expectNumber(something);
} else {
	expectNumber(something);
}
