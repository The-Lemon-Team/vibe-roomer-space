import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '../generated/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  public isConnected = false;

  async onModuleInit() {
    try {
      await this.$connect();
      this.isConnected = true;
      this.logger.log('✅ Successfully connected to PostgreSQL database');
    } catch (error) {
      this.isConnected = false;
      this.logger.warn(
        '⚠️ Could not connect to PostgreSQL database. ' +
        'Please start PostgreSQL using `docker compose up postgres` or start local PostgreSQL service. ' +
        'Error details: ' + (error?.message || error),
      );
    }
  }

  async onModuleDestroy() {
    if (this.isConnected) {
      await this.$disconnect();
    }
  }
}
