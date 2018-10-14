import { CepService } from './services/cep.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Pessoa } from './models/pessoa';
import { Endereco } from './models/endereco';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public formulario: FormGroup;
    public mensagensValidacao: any;


    public constructor(
        private formBuilder: FormBuilder,
        private cepSerice: CepService
    ) { }

    public ngOnInit(): void {
        this.criarFormulario(new Pessoa());
        this.criarMensagemValidacao();
    }

    public get form(): any {
        return this.formulario.controls;
    }

    public get enderecoForm(): AbstractControl {
        return this.form.endereco;
    }

    private criarMensagemValidacao(): void {
        this.mensagensValidacao = {
            nome: {
                required: 'O nome é obrigatório.',
                minlength: 'O Nome deve conter no minímo 3 caracteres.'
            },
            sobrenome: {
                required: 'O sobrenome é obrigatório.'
            },
            dataNascimento: {
                required: 'A data de nascimento é obrigatória'
            },
            email: {
                required: 'O email é obrigatório.',
                email:'Por favor, informe um email válido.'
            },
            cep: {
                required: 'O cep é obrigatório.'
            },
            numero: {
                required: 'O número é obrigatório.'
            }
        }
    }

    private criarFormulario(pessoa: Pessoa): void {
        this.formulario = this.formBuilder.group({
            nome: [pessoa.nome, [Validators.required, Validators.minLength(3)]],
            sobrenome: [pessoa.sobrenome, Validators.required],
            dataNascimento: [pessoa.dataNascimento, Validators.required],
            email: [pessoa.email, [Validators.required, Validators.email]],
            endereco: this.formBuilder.group({
                cep: [pessoa.endereco.cep, [Validators.required]],
                logradouro: [{ value: pessoa.endereco.logradouro, disabled: true }, Validators.required],
                bairro: [{ value: pessoa.endereco.bairro, disabled: true }, Validators.required],
                numero: [pessoa.endereco.numero, Validators.required],
                localidade: [{ value: pessoa.endereco.localidade, disabled: true }, Validators.required],
                uf: [{ value: pessoa.endereco.uf, disabled: true }, Validators.required]
            })
        })
    }

    private preencherCamposEndereco(endereco: Endereco): void {
        this.formulario.patchValue({
            endereco: {
                logradouro: endereco.logradouro,
                bairro: endereco.bairro,
                localidade: endereco.localidade,
                uf: endereco.uf
            }
        });
    }

    public buscarCep(): void {
        let cep: string = this.enderecoForm.get('cep').value;
        if (cep.length == 8 || cep.length == 9) {
            this.cepSerice.consultarCep(cep).subscribe(
                (endereco: Endereco) => {
                    this.preencherCamposEndereco(endereco);
                },
                (error) => {
                    alert('Ops, endereço não encontrado!');
                }
            )
        }
    }

    public limparFormulario(): void {
        this.formulario.reset();
    }

    public salvar(): void {
        let pessoa: Pessoa = this.formulario.value;
        pessoa.endereco.bairro = this.enderecoForm.get('bairro').value;
        pessoa.endereco.logradouro = this.enderecoForm.get('logradouro').value;
        pessoa.endereco.localidade = this.enderecoForm.get('localidade').value;
        pessoa.endereco.uf = this.enderecoForm.get('uf').value;
        console.log(pessoa);
    }
}
