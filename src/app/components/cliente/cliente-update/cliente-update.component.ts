import { ClienteService } from 'src/app/service/cliente.service';
import { Component } from '@angular/core';
import { CheckboxControlValueAccessor, FormControl, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { Cliente } from 'src/app/models/cliente';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent {

  /** se verdadeiro, o type do campo senha se torna "text", caso contrário, "password" */
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

  constructor(
    private snackBar: SnackbarService,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute) {
    this.findbyId(this.route.snapshot.paramMap.get('id') as string);
  }

  /** Buscar os dados atuais do Cliente selecionado para atualizacao */
  findbyId(id: string): Cliente | void {
    this.clienteService.findById(id).subscribe(resposta => {
      this.cliente = resposta;
      this.cliente.senha = '';
      this.checarPerfis(this.cliente.perfis)
      return this.cliente;
    }, (e) => {
      this.router.navigate(['/clientes']);
    })
  }

  /** Envia a requisicao de atualizacao dos dados do cliente */
  update(): void {
    if (this.validarCampos()){
      this.formatarCpf(this.cliente.cpf);
      this.clienteService.update(this.cliente.id, this.cliente).subscribe(() => {
        this.snackBar.showMessage("Cliente atualizado com sucesso", false);
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

  /** Adiciona o perfil na lista de perfis quando marcada a checkbox*/
  addPerfil(perfil: any): void {
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
      this.selecionarPerfil(perfil, false);
    } else {
      this.cliente.perfis.push(perfil);
      this.selecionarPerfil(perfil, true);
    }
  }

  /** Converte o nome das ROLES recebidas na resposta da api para o codigo equivalente */
  private checarPerfis(perfis: string[]): string[] {
    if(perfis.includes('ADMIN')){
      perfis.splice(perfis.indexOf('ADMIN'), 1);
      perfis.push('0');
      this.selecionarPerfil('0', true)
    }
    if(perfis.includes('CLIENTE')){
      perfis.splice(perfis.indexOf('CLIENTE'), 1);
      perfis.push('1');
      this.selecionarPerfil('1', true)
    }
    if(perfis.includes('TECNICO')){
      perfis.splice(perfis.indexOf('TECNICO'), 1);
      perfis.push('2');
      this.selecionarPerfil('2', true)
    }
    return perfis;
  }

  /** Marca a checkbox referente ao perfil recebido:
   * @param perfil Informe '0' para Admin, '1' para Cliente ou '2' para Cliente
   * @param status Se true, marca a checkbox como checked
   */
  private selecionarPerfil(perfil: string, status: boolean) {
    let elementName: string = 'checkbox';

    switch (perfil) {
      case '0': elementName = 'checkbox-admin'; break;
      case '1': elementName = 'checkbox-cliente'; break;
      case '2': elementName = 'checkbox-cliente'; break;
    }
    const checkbox = (document.getElementsByName(elementName).item(1) as HTMLInputElement);
    checkbox.checked = status;


  }

  /** Valida os campos do formulario */
  private validarCampos(): boolean {
    if (this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid) {
      return true;
    } else {
      this.snackBar.showMessage("Digite dados válidos antes de salvar", true);
      return false;
    }
  }

  /** Adiciona os caracteres especiais no CPF para envio na requisicao */
  private formatarCpf (cpf: string): void {
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
