const json = '{"name":"alistair","email":"hi@alistair.sh","password":"hopdotio123","success":true}';

const unsafe = JSON.parse(json);

// Typo uncaught
unsafe.nmae;

// Properties we don't need/want
unsafe.success;

// No guarantee of email format
unsafe.email.includes('@'); // => Possibly false;

import {z} from 'zod';

const userSchema = z.object({
	name: z.string(),
	email: z.string().email(),
});

const user = userSchema.parse(JSON.parse(json));

// Typos caught
user.nmae;

// Properties we don't need/want
user.success;

// Email format guaranteed
user.email.includes('@'); // => true
