import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/service/chamado.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { TecnicoService } from 'src/app/service/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent {

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
  ) {
    this.findAllTecnicos();
    this.findAllClientes();
  }

  create(): void {
    if (this.validarCompos()){
      this.chamadoService.create(this.chamado).subscribe(resposta => {
        this.snackBar.showMessage('Chamado criado com sucesso', false);
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
}
