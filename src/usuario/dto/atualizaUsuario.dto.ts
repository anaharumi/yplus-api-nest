/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";

/* eslint-disable prettier/prettier */
export class AtualizaUsuarioDTO{

    id:string;

    @IsNotEmpty({message:'O Nome não pode estar vazio'})
    @IsOptional()
    nome: string;

    @IsEmail(undefined,{message:'O Email informado é inválido'})
    @EmailUnico({message:'Já existe um usuário com este e-mail'})
    @IsOptional()
    email:string;
    
    @MinLength(6,{message:'A senha deve ter pelo menos 6 caracteres'})
    @IsOptional()
    password:string;
}