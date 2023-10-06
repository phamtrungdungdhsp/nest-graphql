import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ tableName: 'stock_board' })
export class StockBoardEntity {
  @Field(() => String)
  @PrimaryKey({ defaultRaw: 'gen_random_uuid ()' })
  id!: string;

  @Field(() => String)
  @Property({ unique: true, nullable: false })
  name!: string;

  @Field(() => Number)
  @Property({ default: 0 })
  count: number;

  @Field(() => Date)
  @Property({ defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt: Date = new Date();

  @Field(() => Date)
  @Property({ onUpdate: () => new Date(), defaultRaw: 'CURRENT_TIMESTAMP' })
  updatedAt: Date = new Date();
}
