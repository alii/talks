import {number} from './number';
import {object} from './object';
import {string} from './string';

const schema = object({
	name: string().min(3),
	email: string().email(),
	age: number(),
});

const user = schema.parse({
	name: 'alistair',
	email: 'hi@alistair.sh',
	age: 18,
	success: true,
});

// Can't access typos
user.nmae;

// Can't access keys we didn't define
user.success;

// Definitions allow to store even more information
user.name.length > 3; // => true

// Text formatting works
user.email.includes('@'); // => true
