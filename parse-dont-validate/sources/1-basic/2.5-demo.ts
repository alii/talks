import {string, number, boolean} from './2-primitives';

const username = string();
const age = number();
const isAdmin = boolean();

console.log({
	username: username.parse('alistair'),
	isAdmin: isAdmin.parse(true),
	age: age.parse(18),
});
