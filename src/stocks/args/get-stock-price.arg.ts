import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { StockIntervalEnum, StockOutputSizeEnum, StockResolutionEnum } from '../enums/stock.enum';
import { IsEnum, IsOptional, ValidateIf } from "class-validator";

@InputType()
export class QueryOption {
  @Field(() => Boolean, { nullable: true, description: 'By default, extended_hours=true and the output time series will include both the regular trading hours and the extended trading hours (4:00am to 8:00pm Eastern Time for the US market). Set extended_hours=false to query regular trading hours (9:30am to 4:00pm US Eastern Time) only.' })
  extendedHours?: boolean;

  @Field(() => String, { nullable: true, description: 'You can use the month parameter (in YYYY-MM format) to query a specific month in history. For example, 2009-01. Any month in the last 20+ years since 2000-01 (January 2000) is supported.' })
  month?: string; // shoulde be in YYYY-MM format

  @Field(() => StockOutputSizeEnum, { nullable: true, description: `Determine the output size. ${StockOutputSizeEnum.COMPACT} returns only the latest 100 data points in the intraday time series. ${StockOutputSizeEnum.FULL} returns trailing 30 days of the most recent intraday data if the month parameter is not specified, or the full intraday data for a specific month in history if the month parameter is specified.` })
  outputSize?: StockOutputSizeEnum;

  @Field(() => Boolean, { nullable: true, description: 'By default, adjusted=true and the output time series is adjusted by historical split and dividend events. Set adjusted=false to query raw (as-traded) intraday values.' })
  adjusted?: boolean;
}
@ArgsType()
export class GetStockPriceArgs {
  @Field(() => String, { description: 'The name of the equity of your choice.'})
  name: string;

  @Field(() => StockResolutionEnum, { description: `The resolution, the valid values are ${Object.values(StockResolutionEnum).join(',')}`})
  resolution: StockResolutionEnum;

  @ValidateIf(obj => obj.resolution === StockResolutionEnum.TIME_SERIES_INTRADAY)
  @Field(() => String, { nullable: true, description: `Time interval between two consecutive data points in the time series. The following values are supported: ${Object.values(StockIntervalEnum).join(',')}. Required if resolution is ${StockResolutionEnum.TIME_SERIES_INTRADAY}` })
  @IsEnum(StockIntervalEnum)
  interval?: StockIntervalEnum

  @Field(() => QueryOption, { nullable: true })
  option?: QueryOption;
}
