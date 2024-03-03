import { head, isEmpty, last, toPairs } from 'lodash';

export class Url {
  readonly host: string;
  readonly path: Array<string> = new Array<string>();
  readonly query: Map<string, string> = new Map<string, string>();

  private constructor() {}

  static builder() {
    const url = new Url();

    class UrlBuilder {
      host(host: string) {
        (url.host as string) = host;
        return this;
      }

      path(path: string) {
        url.path.push(`${path}`);
        return this;
      }

      query(query: Map<string, string>) {
        toPairs(query).forEach((e) => {
          const key = head(e);
          const value = last(e);

          url.query.set(key, value);
        });
      }

      build() {
        return url;
      }
    }

    return new UrlBuilder();
  }

  get() {
    const paths = this.path.join('');
    const url = new URL(`${this.host}${paths}`);

    this.query.forEach((value, key) => {
      url.searchParams.append(key, value);
    });

    if (isEmpty(paths)) {
      return `${url.origin}${url.search}`;
    }

    return url.href;
  }
}
