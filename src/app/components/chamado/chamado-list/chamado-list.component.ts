import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/service/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent {

  ELEMENT_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = [];

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(private chamadoService: ChamadoService) {
    this.findAll();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findAll(): void {
    this.chamadoService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Chamado>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  retornaStatus(statusCod: any): string {
    switch(statusCod) {
      case 0: return 'ABERTO';
      case 1: return 'EM ANDAMENTO';
      case 2: return 'FECHADO';
    }
    return 'DESCONHECIDO'
  }

  retornaPrioridade(prioridadeCod: any): string {
    switch(prioridadeCod) {
      case 0: return 'BAIXA';
      case 1: return 'MÉDIA';
      case 2: return 'ALTA';
    }
    return 'DESCONHECIDO'
  }

  formatarData(data: string) {
    return new Date(data).toLocaleString()
  }

  OrdenaPorStatus(status: any) {
    let lista: Chamado[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if (element.status == status){
        lista.push(element);
      }
    })
    this.FILTERED_DATA = lista;
    this.dataSource = new MatTableDataSource<Chamado>(lista);
    this.dataSource.paginator = this.paginator;
  }
}
