
import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxButtonModule } from 'devextreme-angular/ui/button';

import { Router } from '@angular/router';
import { DxDataGridModule, DxFormModule, DxPopupModule, DxSelectBoxModule, DxTemplateModule } from 'devextreme-angular';
import { Cliente } from 'src/app/interface/cliente';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-agregar-cliente',
  templateUrl: 'crear-persona.component.html'
})

export class AgregarClienteComponent implements OnInit {
  popUpPersona: boolean;
  msg: string;
  isLoading: boolean;
  clientes: Cliente[];
  nuevaFactura: boolean;

  cliente = {
    Nombre: '',
    Edad: 0
  } as Cliente;

  constructor(private service: HttpService) {
    this.popUpPersona = false;
    this.nuevaFactura = true;

  }

  ngOnInit() {}

  form_fieldDataChanged(e) {
    this.cliente = e.component.option("formData");
    // ...
  }
  crearPersona() {

    const model = {
      controlador: 'Cliente',
      accion: 'CrearCliente',
      parametros: this.cliente

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
  exports: [AgregarClienteComponent],
  declarations: [AgregarClienteComponent],
  providers: [],
})

export class AgregarClienteModule {
}
