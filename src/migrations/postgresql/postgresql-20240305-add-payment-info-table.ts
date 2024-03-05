import { Migration } from '@mikro-orm/migrations';

export class Postgresql20240305AddPaymentInfoTable extends Migration {
  async up(): Promise<void> {
    try {
      this.addSql(
        `create table "payment_info"
         (
             "id"                 serial primary key,
             "created_at"         timestamptz                             not null default now(),
             "updated_at"         timestamptz                             null,
             "payment_info_token" varchar(255)                            not null,
             "type"               text check ("type" in ('CARD', 'BANK')) not null,
             "card_no"            varchar(255)                            null,
             "account_no"         varchar(255)                            null,
             "user_id"            int                                     not null
         );`,
      );

      this.addSql(
        `create index "payment_info_idx_01" on "payment_info" ("payment_info_token");`,
      );
    } catch (error) {
      console.error(error);
    }
  }
}
