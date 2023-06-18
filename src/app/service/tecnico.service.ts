import { Tecnicos } from 'src/app/models/tecnicos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Tecnicos[]> {
    return this.http.get<Tecnicos[]>(`${API_CONFIG.baseUrl}/tecnicos`);
  }
}
