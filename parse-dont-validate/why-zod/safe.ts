import {z} from 'zod';
import {json} from './json';

const userSchema = z.object({
	name: z.string(),
	email: z.string().email(),
});

// As previous, still use JSON.parse
const unsafe = JSON.parse(json);
const user = userSchema.parse(unsafe);

// Typos caught
user.nmae;

// Properties we don't need/want
user.success;

// Email format guaranteed
user.email.includes('@'); // => true
