import { Migration } from '@mikro-orm/migrations';

export class Postgresql20240304AddUserTable extends Migration {
  async up(): Promise<void> {
    try {
      super.addSql(`
          create table "user"
          (
              "id"         serial primary key,
              "user_token" varchar(255) not null,
              "email"      varchar(255) not null,
              "password"   varchar(255) not null,
              "created_at" timestamptz  not null default now(),
              "updated_at" timestamptz null
          );
      `);

      super.addSql(`create index "user_idx_01" on "user" ("user_token");`);
    } catch (error) {
      console.error('[Mikro-ORM Migration Error]', error);
    }
  }
}
