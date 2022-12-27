export type PathComponent = string | number;
export type Path = [PathComponent, ...PathComponent[]] | [];

export interface ParseParams {
	path: Path;
}

export function defaultParseParams(): ParseParams {
	return {
		path: [],
	};
}
