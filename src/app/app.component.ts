import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APIConnService } from './apiconn.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [APIConnService],
})
export class AppComponent implements OnInit {
  title = 'Manuel';
  data: any;
  info: any;
  resultados: any[] = [];
  users: any[] = []; 
  name: any;
  lastName: any;
  titleName: any;
  gender: any;
  email: any;
  phone: any;
  cell: any;
  picture: any;
  age: any;
  birthday: Date = new Date();
  qty: number = 5;

  constructor(private apiService: APIConnService) { }

  ngOnInit(): void {
    this.getData();
    this.getMultipleUsers();
  }


  async getData() {
    this.data = await this.apiService.getCustomer().then((response) => {
      if (response != 'error') {
        this.resultados = response.results;
        console.log(this.resultados);
      }
    })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log('finally');
      });
  }
  async getMultipleUsers() {
    this.data = await this.apiService.getMultipleCustomers(this.qty).then((response) => {
      if (response != 'error') {
        this.resultados = response.results;
        console.log(this.resultados);
        this.userInfo(this.resultados);  // Procesar la información de los usuarios
      }
    })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log('finally');
      });
  }

  userInfo(data: any) {
    if (data != undefined) {
      // Limpiar el array de usuarios para que no se acumulen resultados previos
      this.users = [];

      for (let i = 0; i < data.length; i++) {
        // Crear un objeto con la información del usuario actual
        const user = {
          name: data[i].name.first,
          lastName: data[i].name.last,
          titleName: data[i].name.title,
          gender: data[i].gender,
          email: data[i].email,
          phone: data[i].phone,
          cell: data[i].cell,
          picture: data[i].picture.large,
          age: data[i].dob.age,
          birthday: new Date(data[i].dob.date).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }).replace(/\//g, '-')
        };

        // Agregar el usuario al array de usuarios
        this.users.push(user);
      }
    }
  }


}
