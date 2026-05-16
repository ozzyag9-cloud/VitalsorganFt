declare module 'cors' {
  import type { RequestHandler } from 'express';
  export default function cors(): RequestHandler;
}

declare module 'helmet' {
  import type { RequestHandler } from 'express';
  export default function helmet(): RequestHandler;
}

declare module 'morgan' {
  import type { RequestHandler } from 'express';
  export default function morgan(format: string, options?: { stream?: { write(message: string): void } }): RequestHandler;
}

declare module 'pino' {
  export interface Logger {
    info(message: string): void;
    info(object: Record<string, unknown>, message: string): void;
  }
  export default function pino(options?: Record<string, unknown>): Logger;
}

declare module 'pg' {
  export interface QueryResult<T> { rows: T[] }
  export class Pool {
    constructor(options: Record<string, unknown>);
    query<T = unknown>(sql: string): Promise<QueryResult<T>>;
  }
  const pg: { Pool: typeof Pool };
  export default pg;
}

declare module 'ioredis' {
  export default class Redis {
    status: string;
    constructor(url: string, options?: Record<string, unknown>);
    connect(): Promise<void>;
    ping(): Promise<string>;
  }
}

declare module 'zod' {
  export type ZodSchema<T> = { parse(input: unknown): T };
  type ZodString = {
    url(): ZodString;
    min(length: number): ZodString;
    regex(pattern: RegExp): ZodString;
    optional(): ZodString;
    default(value: string): ZodString;
  };
  type ZodNumber = {
    int(): ZodNumber;
    positive(): ZodNumber;
    default(value: number): ZodNumber;
  };
  export const z: {
    object<T extends Record<string, unknown>>(shape: T): { parse(input: unknown): any };
    enum<T extends readonly [string, ...string[]]>(values: T): { default(value: T[number]): unknown } & unknown;
    string(): ZodString;
    coerce: { number(): ZodNumber };
  };
}
