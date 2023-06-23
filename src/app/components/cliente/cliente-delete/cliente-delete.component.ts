import { ClienteService } from 'src/app/service/cliente.service';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { Cliente } from 'src/app/models/cliente';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: '',
  }


  constructor(
    private snackBar: SnackbarService,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute) {
    this.findbyId(this.route.snapshot.paramMap.get('id') as string);
  }

  findbyId(id: string): Cliente | void {
    this.clienteService.findById(id).subscribe(resposta => {
      this.cliente = resposta;
      this.cliente.senha = '';
      this.cliente.perfis = [];
      return this.cliente;
    }, (e) => {
      this.router.navigate(['/clientes']);
    })
  }

  delete(): void {
    this.clienteService.delete(this.route.snapshot.paramMap.get('id') as string).subscribe(() => {
      this.snackBar.showMessage("Cliente deletado com sucesso", false);
      this.router.navigate(['/clientes']);
    }, ex => {
      this.snackBar.showMessage(ex.error.message, true, 7000);
    })
  }
}

