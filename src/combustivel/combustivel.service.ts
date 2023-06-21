/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaCombustivelDTO } from './dto/listaCombustivel.dto';
import { CombustivelEntity } from './combustivel.entity';
import { Repository } from 'typeorm';
import { AtualizaCombustivelDTO } from './dto/atualizaCombustivel.dto';

@Injectable()
export class CombustivelService {
  constructor(
    @InjectRepository(CombustivelEntity)
    private readonly combustivelRepository: Repository<CombustivelEntity>,
  ) {}
  private combustivel: CombustivelEntity[] = []

  async criaRegistro(combustivelEntity: CombustivelEntity) {
    await this.combustivelRepository.save(combustivelEntity);
  }

  async listaCombustivel() {
    const combustivelSalvos = await this.combustivelRepository.find();
    const combustivelLista = combustivelSalvos.map(
      (combustivel) => new ListaCombustivelDTO(
        combustivel.id, 
        combustivel.data, 
        combustivel.km, 
        combustivel.litros
        ),
    );
    return combustivelLista;
  }

  async buscaPorData(data: string) {
    const checkData = await this.combustivelRepository.findOne({
      where: { data },
    });
    return checkData;
  }
    private buscaPorId(id:string){
        const possivelCombustivel = this.combustivel.find(
          combustivelSalvo => combustivelSalvo.id === id
        );
        if(!possivelCombustivel){
            throw new Error('Este registro de consumo não existe');
        }
        return possivelCombustivel;
    }

  async atualizaCombustivel(id: string, novosDados: AtualizaCombustivelDTO) {
    await this.combustivelRepository.update(id, novosDados);
  }

  async deletaCombustivel(id: string) {
    await this.combustivelRepository.delete(id);
  }
}
