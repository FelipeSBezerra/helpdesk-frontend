import { TecnicoService } from 'src/app/service/tecnico.service';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { Tecnico } from 'src/app/models/tecnico';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent {

  tecnico: Tecnico = {
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

  delete(): void {
    this.tecnicoService.delete(this.route.snapshot.paramMap.get('id') as string).subscribe(() => {
      this.snackBar.showMessage("Técnico deletado com sucesso", false);
      this.router.navigate(['/tecnicos']);
    }, ex => {
      this.snackBar.showMessage(ex.error.message, true, 7000);
    })
  }
}

