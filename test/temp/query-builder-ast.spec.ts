import { describe, it } from 'vitest';
import { QBFilterQuery } from '@mikro-orm/core';
import { set } from 'lodash';

interface StringExprBuilder {
  equals(s: string | StringExprBuilder): BoolExprBuilder;

  includes(s: string | StringExprBuilder): BoolExprBuilder;

  getExpr(): Expr;
}

interface BoolExprBuilder {
  equals(s: boolean | BoolExprBuilder): BoolExprBuilder;

  and(e: BoolExprBuilder): BoolExprBuilder;

  getExpr(): Expr;
}

interface NumberExprBuilder {
  equals(s: number | NumberExprBuilder): QBFilterQuery;
}

type Expr = { column: string; exp: QBFilterQuery };

const createEqExpression = (column: any): Expr => ({
  column,
  exp: {
    $eq: null,
  },
});

type QBEntity<T extends object> = {
  [k in keyof T]: NumberExprBuilder;
};

class ExprBuilder implements NumberExprBuilder {
  constructor(protected ast: Expr) {}

  equals(s: number | NumberExprBuilder): QBFilterQuery {
    const obj = {};
    const key = this.ast.column;
    this.ast.exp.$eq = s;

    set(obj, key, this.ast.exp);
    return obj;
  }
}

class Blog {
  id: NumberExprBuilder;
}

const handler = {
  get: (_, name: string) => new ExprBuilder(createEqExpression(name)),
};

const fakeBlog = new Proxy<Blog>(new Blog(), handler) as QBEntity<Blog>;

describe('test describe', () => {
  it('test', () => {
    const equals = fakeBlog.id.equals(1);
    console.log(equals);
  });
});
