import { Schema } from 'mongoose'
export interface Producto {
  nombre: string
  descripcion: string
  precio: number
  cantidadStock: number
  imagen?: string
  categoriaId?: Schema.Types.ObjectId
  proveedorId?: Schema.Types.ObjectId
  activeProducto?: boolean
}
