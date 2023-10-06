import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MetaData {
  @Field(() => String)
  information: string;

  @Field(() => String)
  symbol: string;

  @Field(() => String)
  timeZone: string;

  @Field(() => String)
  lastRefresh?: string;

  @Field(() => String, { nullable: true })
  interval?: string;

  @Field(() => String)
  outputSise?: string;
}

@ObjectType()
export class StockDataList {
  @Field(() => String)
  time: string;

  @Field(() => String)
  open: string;

  @Field(() => String)
  high: string;

  @Field(() => String)
  low: string;

  @Field(() => String)
  close: string;

  @Field(() => String)
  volume: string;
}

@ObjectType()
export class StockData {
  @Field(() => String)
  resolution: string;

  @Field(() => [StockDataList])
  data: StockDataList[];
}

@ObjectType()
export class StockPrice {
  @Field(() => MetaData)
  metaData?: MetaData;

  @Field(() => StockData)
  data?: StockData;
}
