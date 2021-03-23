
import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxButtonModule } from 'devextreme-angular/ui/button';

import { Router } from '@angular/router';
import { DxDataGridModule, DxFormModule, DxPopupModule, DxSelectBoxModule, DxTemplateModule } from 'devextreme-angular';
import { Producto } from 'src/app/interface/producto';
import { HttpService } from '../../services/http.service';
import { Cliente } from 'src/app/interface/cliente';
import { Compra } from 'src/app/interface/compra';


@Component({
  selector: 'app-agregar-compra',
  templateUrl: 'crear-compra.component.html'
})

export class AgregarCompraComponent implements OnInit {
  popUpPersona: boolean;
  clientes: Cliente[];
  selectBoxOptions = {};
  msg: string;
  isLoading: boolean;
  nuevaFactura: boolean;
  compra = {
    ClienteId: 0
  } as Compra;

  constructor(private service: HttpService) {
    this.popUpPersona = false;
    this.nuevaFactura = true;
    this.obtenerClientes();

  }

  ngOnInit() {}

  form_fieldDataChanged(e) {
    this.compra = e.component.option("formData");
    // ...
  }
  obtenerClientes() {
    const model = {
      controlador: 'Cliente',
      accion: 'ObtenerClientes',
      parametros: {}
    } as any;

    this.service.post(model).subscribe(
      data => {
        this.clientes = data.Cliente as Cliente[];  // ok
        this.selectBoxOptions = { dataSource: this.clientes, displayExpr: 'Nombre', valueExpr: 'Id' };
      },
      error => (this.msg = (error as any)), // error
      () => (this.isLoading = false)        // onCompleted
    );
  }
  crearCompra() {

    const model = {
      controlador: 'Compra',
      accion: 'CrearCompra',
      parametros: this.compra

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
  exports: [AgregarCompraComponent],
  declarations: [AgregarCompraComponent],
  providers: [],
})

export class AgregarCompraModule {
}
