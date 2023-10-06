import { Migration } from '@mikro-orm/migrations';

export class Migration20231006150327 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "stock_board" ("id" varchar(255) not null default gen_random_uuid (), "name" varchar(255) not null, "count" int not null default 0, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) not null, constraint "stock_board_pkey" primary key ("id"));');
    this.addSql('alter table "stock_board" add constraint "stock_board_name_unique" unique ("name");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "stock_board" cascade;');
  }

}
