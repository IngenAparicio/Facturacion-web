
import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxButtonModule } from 'devextreme-angular/ui/button';

import { Router } from '@angular/router';
import { DxDataGridModule, DxFormModule, DxPopupModule, DxSelectBoxModule, DxTemplateModule } from 'devextreme-angular';
import { Producto } from 'src/app/interface/producto';
import { HttpService } from '../../services/http.service';
import { Cliente } from 'src/app/interface/cliente';
import { Compra } from 'src/app/interface/compra';
import { CompraProducto } from 'src/app/interface/compra-producto';


@Component({
  selector: 'app-agregar-c-producto',
  templateUrl: 'crear-compra-producto.component.html'
})

export class AgregarCompraProductoComponent implements OnInit {
  popUpPersona: boolean;
  clientes: Cliente[];
  selectBoxOptions = {};
  msg: string;
  isLoading: boolean;
  nuevaFactura: boolean;
  lastId: number;
  compraProducto = {
    CompraId: 0, 
    ProductoId: 0,
    Cantidad: 0,
    ValorProducto: 0,    
    FechaCompra: new Date()
  } as CompraProducto;
  compras: Compra[];
  productos: Producto[];

  constructor(private service: HttpService) {
    this.popUpPersona = false;
    this.nuevaFactura = true;
    this.obtenerCompras();
    this.obtenerProductos();

  }

  ngOnInit() {}

  form_fieldDataChanged(e) {
    this.compraProducto = e.component.option("formData");
    this.compraProducto.CompraId = this.lastId;
    // ...
  }
  obtenerCompras() {
    const model = {
      controlador: 'Compra',
      accion: 'ObtenerCompras',
      parametros: {}
    } as any;

    this.service.post(model).subscribe(
      data => {
        this.compras = data.Compra as Compra[];  // ok

        let max = 0;
        this.compras.forEach(x => {
          if (x.Id > max) {
            max = x.Id;
          }
        });
        this.lastId = max;
      },
      error => (this.msg = (error as any)), // error
      () => (this.isLoading = false)        // onCompleted
    );
  }

  
  obtenerProductos() {
    const model = {
      controlador: 'Producto',
      accion: 'ObtenerProductos',
      parametros: {}
    } as any;

    this.service.post(model).subscribe(
      data => {
        this.productos = data.Producto as Producto[];  // ok
        this.selectBoxOptions = { dataSource: this.productos, displayExpr: 'NombreProducto', valueExpr: 'Id' };

      },
      error => (this.msg = (error as any)), // error
      () => (this.isLoading = false)        // onCompleted
    );
  }
  crearCompraProducto() {

    const model = {
      controlador: 'CompraProducto',
      accion: 'CrearCompraProducto',
      parametros: this.compraProducto

    } as any;

    this.service.post(model).subscribe(
      data => {
        console.log(data)  // ok
        
      },
      error => (this.msg = (error as any)), // error
      () => (this.isLoading = false)        // onCompleted
    );
  }



}

@NgModule({
  imports: [DxFormModule,
    DxSelectBoxModule,
    DxTemplateModule,
    DxDataGridModule,
    DxButtonModule,
    CommonModule,
    DxPopupModule],
  exports: [AgregarCompraProductoComponent],
  declarations: [AgregarCompraProductoComponent],
  providers: [],
})

export class AgregarCompraProductoModule {
}
