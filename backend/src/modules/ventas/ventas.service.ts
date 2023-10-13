import { Types } from 'mongoose'
import {
  ResponseOkFalseVentas,
  ResponseOkTrueVentas
} from '../../types/responses.types'

/*   tipoVenta: 'unidad' | 'bolsa' | 'cantidad'
  precioTotal: number
 */

export interface IVentasService {
  list(): Promise<ResponseOkTrueVentas | ResponseOkFalseVentas>
  find({
    id
  }: {
    id: string
  }): Promise<ResponseOkTrueVentas | ResponseOkFalseVentas>
  create({
    productos,
    descuento
  }: {
    productos: Array<Types.ObjectId>
    descuento?: number
  }): Promise<ResponseOkTrueVentas | ResponseOkFalseVentas>
  update({
    id,
    productos,
    descuento
  }: {
    id: string
    productos: Array<Types.ObjectId>
    descuento?: number
  }): Promise<ResponseOkTrueVentas | ResponseOkFalseVentas>
  delete({
    id
  }: {
    id: string
  }): Promise<ResponseOkTrueVentas | ResponseOkFalseVentas>
}
