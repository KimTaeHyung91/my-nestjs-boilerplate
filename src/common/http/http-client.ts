import { Url } from './url';

export const HttpClient = Symbol('HttpClient');

export type THttpHeader = {};

export type THttpOptions = {};

export interface HttpClient {
  baseUrl(url: Url): this;

  baseHeader(header: THttpHeader): this;

  baseOptions(options: THttpOptions): this;

  get(): this;

  post(): this;

  execute(): Promise<Record<any, any>>;

  executeTo<T>(clazz: { new (): T }): Promise<T>;
}
