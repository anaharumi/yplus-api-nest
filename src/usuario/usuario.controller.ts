/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/criaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from "uuid";
import { ListaUsuarioDTO } from "./dto/listaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/atualizaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository){}

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO){
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.password = dadosDoUsuario.password;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.id = uuid();


        this.usuarioRepository.salvar(usuarioEntity);
        return { 
            usuario: new ListaUsuarioDTO( usuarioEntity.id, usuarioEntity.nome, usuarioEntity.email),
            messagem: 'Usuário criado com sucesso!'
        };
    }

    @Get()
    async listaUsuarios(){
        const usuariosSalvos = await this.usuarioRepository.listar();
        const usuariosLista =  usuariosSalvos.map(
            usuario => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome,
                usuario.email
            )
        );
        return usuariosLista;
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id:string, @Body() novosDados: AtualizaUsuarioDTO){
        const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);
        const usuarioExibido = new ListaUsuarioDTO(                
            usuarioAtualizado.id,
            usuarioAtualizado.nome,
            usuarioAtualizado.email)

        return{
            usuario: usuarioExibido,
            messagem: 'Usuário atualizado com sucesso!'
        }
   }

   @Delete('/:id')
   async removeUsuario(@Param('id') id:string) {
        const usuarioRemovido = await this.usuarioRepository.deletaUsuario(id);
        return {
            usuario: usuarioRemovido,
            messagem: 'Usuário removido com sucesso'
        }
   }
}