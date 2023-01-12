import {json} from './json';

const unsafe = JSON.parse(json);

// Typo uncaught
// Leads to a runtime error
unsafe.nmae;

// Properties we don't need/want
// Unecessary data polluting DTOs etc (data transfer object)
unsafe.success;

// No guarantee of email format
unsafe.email.includes('@'); // => Possibly false;
