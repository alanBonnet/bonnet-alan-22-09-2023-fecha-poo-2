import { Producto } from '../modules/producto/producto.entity'
import { Ventas } from '../modules/ventas/ventas.entity'

// ----------------------------------------------------------------
// ----------------------------Ventas------------------------------
export type ResponseOkTrueVentas = {
  ok: boolean
  msg: string
  statusCode: number
  ventas: Array<Ventas>
}

export type ResponseOkFalseVentas = {
  ok: boolean
  msg: string
  statusCode: number
}

// ----------------------------------------------------------------
// ----------------------------Productos---------------------------
export type ResponseOkTrueProductos = {
  ok: boolean
  msg: string
  statusCode: number
  productos: Array<Producto>
}

export type ResponseOkFalseProductos = {
  ok: boolean
  msg: string
  statusCode: number
}
