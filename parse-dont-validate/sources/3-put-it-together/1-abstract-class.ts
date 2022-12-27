export type PathComponent = string | number;
export type Path = [PathComponent, ...PathComponent[]] | [];

export type Issue = {
	path: Path;
	message: string;
};

// TODO: Remove this and type where it is used
export type TODO = any;

export type SafeParseResult<T> =
	| {
			success: true;
			value: T;
	  }
	| {
			success: false;
			error: TODO;
	  };

export type OK<T> = {type: 'valid'; value: T};
export type Dirty<T> = {type: 'dirty'; value: T};
export type Invalid = {type: 'invalid'};

export type ParseResult<T> = OK<T> | Dirty<T> | Invalid;
export type SchemaParseResultState<T> = ParseResult<T> | {type: 'unparsed'};

export interface Context<T> {
	addIssue: (issue: Issue) => void;
	dirty: (value: T) => void;
	path: Path;
}

export abstract class MyZodSchema<Output> {
	private static readonly DEFAULT_PATH: Path = [];

	protected abstract _parse(value: unknown, context: Context<Output>): ParseResult<Output>;

	parse(value: unknown, path: Path = MyZodSchema.DEFAULT_PATH): Output {
		const issues = new Set<Issue>();
		let state: SchemaParseResultState<Output> = {type: 'unparsed'};

		const result = this._parse(value, {
			path,
			addIssue: issue => void issues.add(issue),
			dirty: value => {
				state = {
					type: 'dirty',
					value,
				};
			},
		});

		if (result.type === 'invalid') {
			// TODO: Correctly type this
			throw new Error('todo');
		}

		return result.value;
	}

	safeParse(value: unknown, path?: Path) {
		try {
			return {
				success: true as const,
				value: this.parse(value, path),
			};
		} catch (e: unknown) {
			return {
				success: false as const,
				error: e,
			};
		}
	}
}
