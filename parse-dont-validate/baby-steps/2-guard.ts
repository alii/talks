import {expect} from './utils';

export function isNumber(value: unknown): value is number {
	return typeof value === 'number';
}

declare const something: unknown;

if (isNumber(something)) {
	expect<number>(something);
} else {
	expect<number>(something);
}
