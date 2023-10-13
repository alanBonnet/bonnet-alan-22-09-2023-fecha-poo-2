import { Schema, model } from 'mongoose'
import { Producto } from './producto.entity'
import {
  numberRequired,
  stringRequired,
  booleanDefaultTrue
} from '../../types/mongo.types'

const ProductoSchemaMongo = new Schema<Producto>(
  {
    nombre: stringRequired,
    descripcion: stringRequired,
    precio: numberRequired,
    cantidadStock: {
      ...numberRequired,
      min: 0
    },
    imagen: {
      type: String
    },
    activeProducto: booleanDefaultTrue
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const ProductoModelMongo = model<Producto>(
  'Producto',
  ProductoSchemaMongo
)
