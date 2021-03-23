
import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxButtonModule } from 'devextreme-angular/ui/button';

import { Router } from '@angular/router';
import { DxDataGridModule, DxFormModule, DxPopupModule, DxSelectBoxModule, DxTemplateModule } from 'devextreme-angular';
import { Producto } from 'src/app/interface/producto';
import { HttpService } from '../../services/http.service';
import { Compra } from 'src/app/interface/compra';


@Component({
  selector: 'app-agregar-factura',
  templateUrl: 'crear-factura.component.html'
})

export class AgregarfacturaComponent implements OnInit {
  popUpPersona: boolean;
  msg: string;
  isLoading: boolean;
  nuevaFactura: boolean;

  compra = {
    Id: 0,
    ClienteId: 0
  } as Compra;
  compras: Compra[];
  comprasFiltradas: Compra[];

  constructor(private service: HttpService) {
    this.popUpPersona = false;
    this.nuevaFactura = true;

  }
  ngOnInit() {}

  form_fieldDataChanged(e) {
    this.compra = e.component.option("formData");
    // ...
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
        this.comprasFiltradas = this.compras.filter(x => x.Id == this.compra.Id);
        
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
  exports: [AgregarfacturaComponent],
  declarations: [AgregarfacturaComponent],
  providers: [],
})

export class AgregarfacturaModule {
}
