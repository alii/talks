import type {Parser} from './1-parser';

// Infer the result of a schema (basically z.infer<typeof schema>)
export type Infer<P> = P extends Parser<infer Output> ? Output : never;
