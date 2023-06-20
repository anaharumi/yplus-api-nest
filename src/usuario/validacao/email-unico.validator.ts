/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */

import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario.service';

@Injectable()
@ValidatorConstraint({async:true})
export class EmailUnicoValidator implements ValidatorConstraintInterface {


    constructor (private usuarioService: UsuarioService) {}

    async validate(
        value: any,
        _validationArguments?: ValidationArguments
        ): Promise<boolean>{
        const usuarioComEmailExiste = await this.usuarioService.buscaPorEmail(
            value
            );
        return !usuarioComEmailExiste;
    }
}

export const EmailUnico = (opcoesDeValidacao: ValidationOptions) =>{
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName:propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailUnicoValidator
        });
    };
};
