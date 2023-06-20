import { TecnicoService } from 'src/app/service/tecnico.service';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { Tecnico } from 'src/app/models/tecnico';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent {

  hide = true;

  tecnico: Tecnico = {
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

  constructor(private snackBar: SnackbarService, private tecnicoService: TecnicoService, private router: Router) {

  }

  
  create(): void {
    if (this.validarCampos()){
      this.formatarCpf(this.tecnico.cpf);
      this.tecnicoService.create(this.tecnico).subscribe(() => {
        this.snackBar.showMessage("Técnico salvo com sucesso", false);
        this.router.navigate(['/tecnicos']);
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
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
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
    if(this.tecnico.cpf.length < 14){
      this.tecnico.cpf = 
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
