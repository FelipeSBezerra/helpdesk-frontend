import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chamado } from 'src/app/models/chamado';

import { ChamadoService } from 'src/app/service/chamado.service';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent {

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  constructor (
    private chamadoService: ChamadoService,
    private route: ActivatedRoute,
  ) {
    this.findChamadoById(this.route.snapshot.paramMap.get('id') as string);
  }


  findChamadoById(id: string): void {
    this.chamadoService.findById(id).subscribe(resposta => {
      this.chamado = resposta;
    })
  }

  retornaStatus(statusCod: any): string {
    switch(statusCod) {
      case '0': return 'ABERTO';
      case 0: return 'ABERTO';
      case '1': return 'EM ANDAMENTO';
      case 1: return 'EM ANDAMENTO';
      case '2': return 'FECHADO';
      case 2: return 'FECHADO';
    }
    return statusCod;
  }

  retornaPrioridade(prioridadeCod: any): string {
    switch(prioridadeCod) {
      case '0': return 'BAIXA';
      case 0: return 'BAIXA';
      case '1': return 'MÉDIA';
      case 1: return 'MÉDIA';
      case '2': return 'ALTA';
      case 2: return 'ALTA';
    }
    return prioridadeCod
  }

  isNumber(variavel: any): boolean {
    if(typeof(variavel) == 'number') {
      return true;
    }
    return false;
  }
}
