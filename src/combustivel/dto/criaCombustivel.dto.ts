/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";


/* eslint-disable prettier/prettier */
export class CriaCombustivelDTO{

    id:string;

    @IsNotEmpty({message:'A data não pode estar vazia'})
    data: string;

    @IsNotEmpty({message:'A Quilometragem não pode estar vazia'})
    km: number;
    
    @IsNotEmpty({message:'A quantidade de Litros não pode estar vazia'})
    litros: number;
}