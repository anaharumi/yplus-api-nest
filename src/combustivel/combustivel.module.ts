import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CombustivelController } from './combustivel.controller';
import { CombustivelService } from './combustivel.service';
import { CombustivelEntity } from './combustivel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CombustivelEntity])],
  controllers: [CombustivelController],
  providers: [CombustivelService],
})
export class CombustivelModule {}
