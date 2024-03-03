import { HttpClient, THttpHeader, THttpOptions } from './http-client';
import { Injectable } from '@nestjs/common';
import { Url } from './url';
import got from 'got';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GotHttpClient implements HttpClient {
  private _method: 'get' | 'post';

  readonly url: Url;
  readonly header: THttpHeader;
  readonly options: THttpOptions;

  baseUrl(url: Url): this {
    (this.url as Url) = url;
    return this;
  }

  baseHeader(header: THttpHeader): this {
    (this.header as THttpHeader) = header;
    return this;
  }

  baseOptions(options: THttpOptions): this {
    (this.options as THttpOptions) = options;
    return this;
  }

  get(): this {
    this._method = 'get';
    return this;
  }

  post(): this {
    this._method = 'post';
    return this;
  }

  async execute(): Promise<Record<any, any>> {
    if (this._method === 'get') {
      try {
        const response = await got.get(this.url.get(), {
          headers: { ...this.header },
          ...this.options,
        });

        return JSON.parse(response.body);
      } catch (error) {
        throw new Error(error.response.statusMessage);
      }
    } else if (this._method === 'post') {
    }
  }

  async executeTo<T>(clazz: { new (): T }): Promise<T> {
    if (this._method === 'get') {
      try {
        const response = await got.get(this.url.get(), {
          headers: { ...this.header },
          ...this.options,
        });

        const parse = JSON.parse(response.body);
        return plainToInstance(clazz, parse as Record<string, any>);
      } catch (error) {
        throw new Error(error.response.statusMessage);
      }
    } else if (this._method === 'post') {
    }
  }
}
