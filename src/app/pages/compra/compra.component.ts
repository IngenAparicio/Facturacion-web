import { Compra } from './../../interface/compra';
import { Component } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import DataSource from 'devextreme/data/data_source';
import { CompraProducto } from 'src/app/interface/compra-producto';

@Component({
  templateUrl: 'compra.component.html',
  styleUrls: [ './compra.component.scss' ]
})
export class CompraComponent {

  compras: Compra[];
  msg: string;
  isLoading: boolean;
  selectBoxDataSource: DataSource;
  compra={} as Compra;
  popupVisible: boolean;
  popupVisible2: boolean;
  compraactiva:boolean;
  compraProducto={} as CompraProducto;
  popupVisible3: boolean;
  constructor(private service: HttpService) {
    this.obtenerCompras();
  }

  crearCompra(){
    this.compra ={} as Compra;
    this.popupVisible = true;
  }
  crearCompraAfterClose(){
    this.obtenerCompras();
    this.popupVisible = false;
  }

  crearCompraProducto(){
    this.compraProducto ={} as CompraProducto;
    this.popupVisible2 = true;
  }
  crearCompraProductoAfterClose(){
    this.obtenerCompras();
    this.popupVisible2 = false;
  }
  crearFactura(){
    this.compra ={} as Compra;
    this.popupVisible3 = true;
  }
  crearFacturaAfterClose(){
    this.obtenerCompras();
    this.popupVisible3 = false;
  }

  obtenerCompras(){
    const model = {
      controlador: 'Compra',
      accion: 'ObtenerComprasSP',
      parametros: {}
    } as any;

    this.service.post(model).subscribe(
      data => {
        this.compras = data.Compra as Compra[];  // ok
      },
      error => (this.msg = (error as any)), // error
      () => (this.isLoading = false)        // onCompleted
    );
  }

  abrirCliente(){
    
  }
}
