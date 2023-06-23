import { ClienteService } from 'src/app/service/cliente.service';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { Cliente } from 'src/app/models/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent {

  hide = true;

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: '',
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(private snackBar: SnackbarService, private clienteService: ClienteService, private router: Router) {

  }


  create(): void {
    if (this.validarCampos()){
      this.formatarCpf(this.cliente.cpf);
      this.clienteService.create(this.cliente).subscribe(() => {
        this.snackBar.showMessage("Cliente salvo com sucesso", false);
        this.router.navigate(['/clientes']);
      }, ex => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element: { message: any; }) => {
            this.snackBar.showMessage(element.message, true, 7000);
          });;
        } else {
          this.snackBar.showMessage(ex.error.message, true, 7000);
        };

      })
    }
  }

  addPerfil(perfil: any): void {
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }
  }

  validarCampos(): boolean {
    if (this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid) {
      return true;
    } else {
      this.snackBar.showMessage("Digite dados válidos antes de salvar", true);
      return false;
    }
  }

  formatarCpf (cpf: string): void {
    if(this.cliente.cpf.length < 14){
      this.cliente.cpf =
      cpf.substring(0, 3)
      + '.'
      + cpf.substring(3, 6)
      + '.'
      + cpf.substring(6, 9)
      + '-'
      + cpf.substring(9);
    }
  }
}
