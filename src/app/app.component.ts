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

  title = 'reactive-forms';

  public formulario: FormGroup;

  public constructor(
    private formBuilder: FormBuilder,
    private cepSerice: CepService
  ) { }

  public ngOnInit(): void {
    this.criarFormulario(new Pessoa());
  }

  private criarFormulario(pessoa: Pessoa): void {
    this.formulario = this.formBuilder.group({
      nome: [pessoa.nome, Validators.required],
      sobrenome: [pessoa.sobrenome, Validators.required],
      dataNascimento: [pessoa.dataNascimento, Validators.required],
      endereco: this.formBuilder.group({
        cep: [pessoa.endereco.cep, Validators.required],
        logradouro: [{ value: pessoa.endereco.logradouro, disabled: true }, Validators.required],
        bairro: [{ value: pessoa.endereco.bairro, disabled: true }, Validators.required],
        numero: [pessoa.endereco.numero, Validators.required],
        cidade: [{ value: pessoa.endereco.localidade, disabled: true }, Validators.required],
        uf: [{ value: pessoa.endereco.uf, disabled: true }, Validators.required]
      })
    })
  }

  private preencherCamposEndereco(endereco: Endereco): void {
    let enderecoForm: AbstractControl = this.formulario.get("endereco");
    enderecoForm.get("logradouro").setValue(endereco.logradouro);
    enderecoForm.get("bairro").setValue(endereco.bairro);
    enderecoForm.get("cidade").setValue(endereco.localidade);
    enderecoForm.get("uf").setValue(endereco.uf);
    enderecoForm.updateValueAndValidity();
  }

  public buscarCep() {
    let cep: string = this.formulario.get("endereco").get("cep").value;
    if (cep.length == 8 || cep.length == 9) {
      this.cepSerice.consultarCep(cep).subscribe(
        (endereco: Endereco) => {
          this.preencherCamposEndereco(endereco);
        },
        (error) => {
          alert("Ops, endereço não encontrado!");
        }
      )
    }
  }

  public salvar(): void {
    let pessoa: Pessoa = this.formulario.value;
    console.log(pessoa);
  }


}
