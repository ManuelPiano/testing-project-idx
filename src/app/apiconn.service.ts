import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})

export class APIConnService {
  public url = 'https://randomuser.me/api/';
  private urlMultipleUsers = 'https://randomuser.me/api/?results=';
  constructor(private http: HttpClient) { }

  getCustomer(): Promise <any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(this.url).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salio mal y no se puede mostrar la inforamción!'
          })
          reject(error);
        },
        complete: () => {
          console.log('complete');
        }
      })
    })
  }

  getMultipleCustomers(qty: number): Promise <any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(this.urlMultipleUsers+qty).subscribe({
        next: (response) => {
          resolve(response);
          console.log(response);
        },
        error: (error) => {
          reject(error);
        },
        complete: () => {
          console.log('complete');
        }
      })
    })
  }

}
