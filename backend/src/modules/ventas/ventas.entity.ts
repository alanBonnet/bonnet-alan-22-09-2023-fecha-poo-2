import { Types } from 'mongoose'

export type TipoVenta = 'unidad' | 'bolsa' | 'cantidad'

export interface Ventas {
  tipoVenta: TipoVenta
  productos: Array<Types.ObjectId>
  precioTotal: number
  fecha: Date
  isActive: boolean
}
