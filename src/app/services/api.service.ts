import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected apiUrl: string;

  constructor() {
    this.apiUrl = 'http://localhost:8080'; 
  }
}
