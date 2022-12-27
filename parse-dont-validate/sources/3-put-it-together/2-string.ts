import {Context, MyZodSchema, ParseResult} from './1-abstract-class';

export class MyZodString<T extends string = string> extends MyZodSchema<T> {
	protected _parse(value: unknown, context: Context<T>): ParseResult<T> {
		if (typeof value !== 'string') {
			context.addIssue({
				message: `Expected a string, received \`${value}\``,
				path: context.path,
			});
		}

		return context;
	}
}
