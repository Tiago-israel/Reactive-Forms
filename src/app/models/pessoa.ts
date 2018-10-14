import { Endereco } from './endereco';
export class Pessoa {
    public id: number;
    public nome: string;
    public email: string;
    public sobrenome: string;
    public dataNascimento: Date;
    public endereco: Endereco = new Endereco();
}