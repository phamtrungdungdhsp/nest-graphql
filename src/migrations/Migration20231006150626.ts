import { Migration } from '@mikro-orm/migrations';

export class Migration20231006150626 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "stock_board" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "stock_board" alter column "updated_at" set default CURRENT_TIMESTAMP;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "stock_board" alter column "updated_at" drop default;');
    this.addSql('alter table "stock_board" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
  }

}
