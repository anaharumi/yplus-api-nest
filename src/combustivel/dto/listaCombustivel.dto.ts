/* eslint-disable prettier/prettier */
export class ListaCombustivelDTO{
    constructor(
        readonly id: string,
        readonly data: string,
        readonly km: number,
        readonly litros:number,
    ){}
}