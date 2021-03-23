import { Cliente } from './../../interface/cliente';
import { Component } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import DataSource from 'devextreme/data/data_source';

@Component({
  templateUrl: 'cliente.component.html',
  styleUrls: [ './cliente.component.scss' ]
})
export class ClienteComponent {

  clientes: Cliente[];
  msg: string;
  isLoading: boolean;
  popupVisible: boolean;
  cliente={} as Cliente;
  selectBoxDataSource: DataSource;
  constructor(private service: HttpService) {
    this.obtenerClientes();
  }

  crearCliente(){
    this.cliente ={} as Cliente;
    this.popupVisible = true;
  }
  crearClienteAfterClose(){
    this.obtenerClientes();
    this.popupVisible = false;
  }

  obtenerClientes(){
    const model = {
      controlador: 'Cliente',
      accion: 'ObtenerClientes',
      parametros: {}
    } as any;

    this.service.post(model).subscribe(
      data => {
        this.clientes = data.Cliente as Cliente[];  // ok
      },
      error => (this.msg = (error as any)), // error
      () => (this.isLoading = false)        // onCompleted
    );
  }

  abrirCliente(){
    
  }
}
