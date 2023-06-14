import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnicos } from 'src/app/models/tecnicos';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent {

  ELEMENT_DATA: Tecnicos[] = [
    {
      id: 1,
      nome: 'Felipe S Bezerra',
      cpf: '206.237.900-50',
      email: 'felipe@mail.com',
      senha: '12345678',
      perfis: ['0'],
      dataCriacao: '14/06/2023'
    }
  ]

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Tecnicos>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
