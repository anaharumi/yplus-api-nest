/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

/* eslint-disable prettier/prettier */
export class AtualizaCombustivelDTO{

    id:string;

    @IsNotEmpty({message:'A data não pode estar vazia'})
    @IsOptional()
    data: string;

    @IsNotEmpty({message:'A Quilometragem não pode estar vazia'})
    @IsOptional()
    km: number;
    
    @IsNotEmpty({message:'A quantidade de Litros não pode estar vazia'})
    @IsOptional()
    litros: number;

}