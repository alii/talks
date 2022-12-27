import {boolean, number, string} from './2-primitives';
import {object} from './3-objects';

const user = object({
	username: string(),
	age: number(),
	isAdmin: boolean(),
});

console.log(
	user.parse({
		username: 'alistair',
		isAdmin: true,
		age: 18,
	}),
);
