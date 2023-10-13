import {
  ResponseOkFalseProductos,
  ResponseOkTrueProductos
} from '../../types/responses.types'
import { Producto } from './producto.entity'

export interface ProductoService {
  list(): Promise<ResponseOkTrueProductos | ResponseOkFalseProductos>
  // find(id: string): Promise<Producto | null>
  findByName(
    name: string
  ): Promise<ResponseOkTrueProductos | ResponseOkFalseProductos>
  create({
    nombre,
    precio,
    descripcion,
    cantidadStock,
    imagen
  }: Producto): Promise<ResponseOkTrueProductos | ResponseOkFalseProductos>
  update(
    id: string,
    { nombre, precio, descripcion, cantidadStock, imagen }: Producto
  ): Promise<ResponseOkTrueProductos | ResponseOkFalseProductos>
  delete(
    id: string
  ): Promise<ResponseOkTrueProductos | ResponseOkFalseProductos>
}
