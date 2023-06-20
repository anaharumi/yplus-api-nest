/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";

/* eslint-disable prettier/prettier */
export class CriaUsuarioDTO{

    @IsNotEmpty({message:'O Nome não pode estar vazio'})
    nome: string;

    @IsEmail(undefined,{message:'O e-mail informado é inválido'})
    @EmailUnico({message:'Já existe um usuário com este e-mail'})
    email:string;
    
    @MinLength(6,{message:'A senha deve ter pelo menos 6 caracteres'})
    password:string;
}