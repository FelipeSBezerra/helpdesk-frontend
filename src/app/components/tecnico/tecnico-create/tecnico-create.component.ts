import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent {

  hide = true;

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(private snackBar: SnackbarService) {

  }

  salvar(): void {
    if (this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid) {
      this.snackBar.showMessage("Salvo com sucesso", false);
    } else {
      this.snackBar.showMessage("Digite dados válidos antes de salvar", true);
    }
  }

}
