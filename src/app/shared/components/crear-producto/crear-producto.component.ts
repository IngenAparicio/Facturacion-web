
import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxButtonModule } from 'devextreme-angular/ui/button';

import { Router } from '@angular/router';
import { DxDataGridModule, DxFormModule, DxPopupModule, DxSelectBoxModule, DxTemplateModule } from 'devextreme-angular';
import { Producto } from 'src/app/interface/producto';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-agregar-producto',
  templateUrl: 'crear-producto.component.html'
})

export class AgregarProductoComponent implements OnInit {
  popUpPersona: boolean;
  msg: string;
  isLoading: boolean;
  nuevaFactura: boolean;

  producto = {
    NombreProducto: '',
    Precio: 0,
    Inventario: 0
  } as Producto;

  constructor(private service: HttpService) {
    this.popUpPersona = false;
    this.nuevaFactura = true;

  }

  ngOnInit() {}

  form_fieldDataChanged(e) {
    this.producto = e.component.option("formData");
    // ...
  }
  crearProducto() {

    const model = {
      controlador: 'Producto',
      accion: 'CrearProducto',
      parametros: this.producto

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
  exports: [AgregarProductoComponent],
  declarations: [AgregarProductoComponent],
  providers: [],
})

export class AgregarProductoModule {
}
