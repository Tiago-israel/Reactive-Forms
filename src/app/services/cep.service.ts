import { Endereco } from './../models/endereco';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private httpCliente: HttpClient) { }

  public consultarCep(cep: string): Observable<Endereco> {
    return this.httpCliente.get<Endereco>(`https://viacep.com.br/ws/${cep}/json/`);
  }

}
