export interface Compra {
    Id: number;
    ClienteId: number; 
    //extendidas
    NombreCliente: string;
    NombreProducto: string;
    CantidadVenta: number;
    ValorCompra: number;
    Fecha: Date;

  }