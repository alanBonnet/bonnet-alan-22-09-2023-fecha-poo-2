import { Schema, Types, model } from 'mongoose'
import { Ventas } from './ventas.entity'
import { numberRequired, stringRequired } from '../../types/mongo.types'

const VentasSchemaMongo = new Schema<Ventas>({
  productos: [
    {
      type: Types.ObjectId,
      ref: 'Producto',
      required: true
    }
  ],
  tipoVenta: stringRequired,
  precioTotal: numberRequired,
  fecha: {
    type: Date,
    default: new Date()
  },
  isActive: {
    type: Boolean,
    default: true
  }
})

export const VentasModelMongo = model<Ventas>('Venta', VentasSchemaMongo)
