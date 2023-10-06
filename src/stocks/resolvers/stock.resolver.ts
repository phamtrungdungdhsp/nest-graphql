import { StockService } from '../services/stock.service';
import { Args, ArgsType, Query, Resolver } from '@nestjs/graphql';
import { StockPrice } from '../models/stock-price.model';
import { GetStockPriceArgs } from '../args/get-stock-price.arg';
import { StockBoardEntity } from '../entities/stock-board.entity';

@Resolver(() => StockPrice)
export class StockResolver {
  constructor(private stockService: StockService) {}

  @Query(() => StockPrice)
  async getStockPrice(@Args() args: GetStockPriceArgs) {
    return this.stockService.getStockPrice(
      args.name,
      args.resolution,
      args.interval,
      args.option,
    );
  }

  @Query(() => [StockBoardEntity])
  async getSearchBoard() {
    return this.stockService.getSearchBoard();
  }
}
