import { TecnicoService } from 'src/app/service/tecnico.service';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { Tecnico } from 'src/app/models/tecnico';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent {

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

  constructor(
    private snackBar: SnackbarService, 
    private tecnicoService: TecnicoService, 
    private router: Router, 
    private route: ActivatedRoute) {
    this.findbyId(this.route.snapshot.paramMap.get('id') as string);
  }

  findbyId(id: string): Tecnico | void {
    this.tecnicoService.findById(id).subscribe(resposta => {
      this.tecnico = resposta;
      this.tecnico.senha = '';
      this.tecnico.perfis = [];
      return this.tecnico;
    }, (e) => {
      this.router.navigate(['/tecnicos']);
    }) 
  }

  update(): void {
    if (this.validarCampos()){
      this.formatarCpf(this.tecnico.cpf);
      this.tecnicoService.update(this.tecnico.id, this.tecnico).subscribe(() => {
        this.snackBar.showMessage("Técnico atualizado com sucesso", false);
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
