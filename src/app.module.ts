/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { DbConfigService } from './config/db.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CombustivelModule } from './combustivel/combustivel.module';


@Module({
  imports: [
    UsuarioModule,
    CombustivelModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
    useClass: DbConfigService,
    inject:[DbConfigService]
  })],
})
export class AppModule {}
