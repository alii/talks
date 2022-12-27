import {object, string} from './2-parser';

const user = object({
	user: object({
		meta: object({
			name: string(),
		}),
	}),
});

console.log(
	user.parse({
		user: {
			meta: {
				name: 'alistair',
			},
		},
	}),
);

console.log(
	user.parse({
		user: {
			meta: {
				name: true,
			},
		},
	}),
);
