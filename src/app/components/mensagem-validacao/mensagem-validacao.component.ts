import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mensagem-validacao',
  templateUrl: './mensagem-validacao.component.html',
  styleUrls: ['./mensagem-validacao.component.css']
})
export class MensagemValidacaoComponent implements OnInit {

  @Input('control') form: any;
  @Input('mensagens') mensagens: any;
  @Input('erros') erros: any;


  constructor() { }

  ngOnInit() {

  }

  public get messagensValues(): any {
    if (this.mensagens) {
      return Object.values(this.mensagens);
    }
  }

  public get messagensKeys(): any {
    if (this.mensagens) {
      return Object.keys(this.mensagens);
    }
  }

  public get erroKey(): any {
    if (this.erros) {
      return Object.keys(this.erros);
    }
  }

}
