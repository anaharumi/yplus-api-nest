/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
 import { AtualizaCombustivelDTO } from './dto/atualizaCombustivel.dto';
 import { CriaCombustivelDTO } from './dto/criaCombustivel.dto';
 import { ListaCombustivelDTO } from './dto/listaCombustivel.dto';
import { CombustivelEntity } from './combustivel.entity';
import { CombustivelService } from './combustivel.service';

@Controller('/combustivel')
export class CombustivelController {
  constructor(private combustivelService: CombustivelService) {}

  @Post()
  async criaRegistro(@Body() dadosDoRegistro: CriaCombustivelDTO) {
    const combustivelEntity = new CombustivelEntity();
    combustivelEntity.litros = dadosDoRegistro.litros;
    combustivelEntity.data = dadosDoRegistro.data;
    combustivelEntity.km = dadosDoRegistro.km;
    combustivelEntity.id = uuid();

    this.combustivelService.criaRegistro(combustivelEntity);

    return {
      registro: new ListaCombustivelDTO(
        combustivelEntity.id,
        combustivelEntity.data,
        combustivelEntity.litros,
        combustivelEntity.km
        ),
      messagem: 'Novo registro de consumo cadastrado com sucesso',
    };
  }

  @Get()
  async listaCombustivel() {
    const combustivelSalvo = await this.combustivelService.listaCombustivel();

    return combustivelSalvo;
  }

  @Put('/:id')
  async atualizaCombustivel(
    @Param('id') id: string,
    @Body() novosDados: AtualizaCombustivelDTO,
  ) {
    const combustivelAtualizado = await this.combustivelService.atualizaCombustivel(
      id,
      novosDados,
    );

    return{
        usuario: combustivelAtualizado,
        messagem: 'Registro de consumo atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async deletaCombustivel(@Param('id') id: string) {
    const combustivelRemovido = await this.combustivelService.deletaCombustivel(id);

    return {
      registro: combustivelRemovido,
      messagem: 'Registro de consumo removido com suceso',
    };
  }
}
