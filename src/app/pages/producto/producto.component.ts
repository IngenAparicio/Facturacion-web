import { Producto } from './../../interface/producto';
import { Component } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import DataSource from 'devextreme/data/data_source';

@Component({
  templateUrl: 'producto.component.html',
  styleUrls: [ './producto.component.scss' ]
})
export class ProductoComponent {

  productos: Producto[];
  producto={} as Producto;
  msg: string;
  isLoading: boolean;
  selectBoxDataSource: DataSource;
  popupVisible: boolean;
  constructor(private service: HttpService) {
    this.obtenerProductos();

  }
  crearProducto(){
    this.producto ={} as Producto;
    this.popupVisible = true;
  }
  crearProductoAfterClose(){
    this.obtenerProductos();
    this.popupVisible = false;
  }

  obtenerProductos(){
    const model = {
      controlador: 'Producto',
      accion: 'ObtenerProductos',
      parametros: {}
    } as any;

    this.service.post(model).subscribe(
      data => {
        this.productos = data.Producto as Producto[];  // ok
      },
      error => (this.msg = (error as any)), // error
      () => (this.isLoading = false)        // onCompleted
    );
  }

}
