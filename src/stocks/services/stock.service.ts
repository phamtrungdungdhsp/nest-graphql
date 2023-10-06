import { Injectable } from '@nestjs/common';
import { StockPrice } from '../models/stock-price.model';
import { StockIntervalEnum, StockResolutionEnum } from '../enums/stock.enum';
import { IStockService } from '../interfaces/index.interface';
import { AlphaVanTageProvider } from './providers/alpha-vantage.provider';
import { QueryOption } from '../args/get-stock-price.arg';
import { StockBoardEntity } from '../entities/stock-board.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class StockService {
  private stockProvider: IStockService;
  constructor(
    private alphaVantageProvider: AlphaVanTageProvider,
    @InjectRepository(StockBoardEntity)
    private readonly stockBoardRepository: EntityRepository<StockBoardEntity>,
    private readonly em: EntityManager,
  ) {
    this.stockProvider = this.stockProviderFactory();
  }
  async getStockPrice(
    name: string,
    resolution: StockResolutionEnum,
    interval?: StockIntervalEnum,
    options?: QueryOption,
  ): Promise<StockPrice> {
    await this.increaseSearchCount(name);
    return this.stockProvider.getStockPrice(
      name,
      resolution,
      interval,
      options,
    );
  }

  async getSearchBoard(): Promise<StockBoardEntity[]> {
    return this.stockBoardRepository.findAll({
      orderBy: { count: 'DESC' },
    });
  }

  private async increaseSearchCount(name: string): Promise<void> {
    const record = await this.stockBoardRepository.findOne({ name });
    if (!record) {
      await this.stockBoardRepository.nativeInsert({
        name,
        count: 1,
      });
    } else {
      const qb = this.em.createQueryBuilder(StockBoardEntity);
      await qb.update({ count: qb.raw('count + 1') }).where({ name });
    }
  }

  private stockProviderFactory(): IStockService {
    return this.alphaVantageProvider;
  }
}
