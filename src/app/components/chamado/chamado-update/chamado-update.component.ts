import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/service/chamado.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { TecnicoService } from 'src/app/service/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent {

  
  tecnicos: Tecnico[] = [];
  clientes: Cliente[] = [];

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

  titulo: FormControl = new FormControl(null, [Validators.required]);
  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  tecnico: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);
  observacoes: FormControl = new FormControl(null, [Validators.required]);

  constructor (
    private tecnicoService: TecnicoService, 
    private clienteService: ClienteService,
    private chamadoService: ChamadoService,
    private snackBar: SnackbarService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.findChamadoById(route.snapshot.paramMap.get('id') as string);
    this.findAllTecnicos();
    this.findAllClientes();
  }

  update(): void {
    if (this.validarCompos()){
      this.chamadoService.update(this.route.snapshot.paramMap.get('id') as string, this.chamado).subscribe(resposta => {
        this.snackBar.showMessage('Chamado atualizado com sucesso', false);
        this.router.navigate(['/chamados']);
      }, ex => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element: { message: string; }) => {
            this.snackBar.showMessage(element.message, true, 5000)
          });
        } else {
          this.snackBar.showMessage(ex.error.message, true, 5000);
        }
      })
    } else {
      this.snackBar.showMessage('Digite dados válidos antes de salvar', true, 5000);
    }
  }

  findChamadoById(id: string): void {
    this.chamadoService.findById(id).subscribe(resposta => {
      this.chamado = resposta;
    })
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  validarCompos(): boolean {
    return this.titulo.valid 
      && this.prioridade.valid
      && this.status.valid
      && this.tecnico.valid
      && this.cliente.valid
      && this.observacoes.valid
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
