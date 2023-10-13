import { Types } from 'mongoose'
import {
  ResponseOkTrueVentas,
  ResponseOkFalseVentas
} from '../../../types/responses.types'
import { TipoVenta } from '../ventas.entity'
import { VentasModelMongo } from '../ventas.model'
import { IVentasService } from '../ventas.service'
import { ProductoModelMongo } from '../../producto/producto.model'
import { Producto } from '../../producto/producto.entity'

export class VentasServiceMongo implements IVentasService {
  private model = VentasModelMongo
  private productosModel = ProductoModelMongo
  async list (): Promise<ResponseOkTrueVentas | ResponseOkFalseVentas> {
    try {
      const allVentas = await this.model
        .find({ isActive: true })
        .populate('productos')
      if (!allVentas.length) {
        return {
          ok: false,
          msg: 'No hay ventas hechas aún',
          statusCode: 404
        }
      }
      return {
        ok: true,
        msg: 'Se encuentran las siguientes ventas hechas',
        statusCode: 200,
        ventas: allVentas
      }
    } catch (error) {
      return {
        ok: false,
        msg: 'Error interno del servidor',
        statusCode: 500
      }
    }
  }

  async find ({
    id
  }: {
    id: string
  }): Promise<ResponseOkTrueVentas | ResponseOkFalseVentas> {
    try {
      const ventaById = await this.model
        .findById(id, { isActive: true })
        .populate('productos')
      if (!ventaById) {
        return {
          ok: false,
          msg: 'No se encuentra esa venta',
          statusCode: 404
        }
      }
      return {
        ok: true,
        msg: 'Se encuentran las siguientes ventas hechas',
        statusCode: 200,
        ventas: [ventaById]
      }
    } catch (error) {
      return {
        ok: false,
        msg: 'Error interno del servidor',
        statusCode: 500
      }
    }
  }

  async create ({
    productos,
    descuento
  }: {
    productos: Array<Types.ObjectId>
    descuento?: number
  }): Promise<ResponseOkTrueVentas | ResponseOkFalseVentas> {
    try {
      const productosEncontrados = []
      for (const producto of productos) {
        const productoID = await this.productosModel.findById(producto._id)
        productosEncontrados.push(productoID)
      }
      const nuevaVenta = await this.model.create({
        productos: productosEncontrados,
        tipoVenta: await this.tipoVenta({ productos }),
        precioTotal: await this.precioVenta({ productos, descuento })
      })
      await nuevaVenta.populate('productos')
      if (!nuevaVenta) {
        return {
          ok: false,
          msg: 'No se pudo guardar el producto',
          statusCode: 401
        }
      }
      return {
        ok: true,
        msg: 'Se encuentran las siguientes ventas hechas',
        statusCode: 201,
        ventas: [nuevaVenta]
      }
    } catch (error) {
      return {
        ok: false,
        msg: `Error interno del servidor: ${error}`,
        statusCode: 500
      }
    }
  }

  async update ({
    id,
    productos,
    descuento
  }: {
    id: string
    productos: Array<Types.ObjectId>
    descuento?: number
  }): Promise<ResponseOkTrueVentas | ResponseOkFalseVentas> {
    try {
      const buscarVenta = await this.model.findById(id)
      if (!buscarVenta) {
        return {
          ok: false,
          msg: 'No se encontró la venta',
          statusCode: 404
        }
      }
      const ventaAcutalizada = await buscarVenta
        .updateOne({
          productos,
          tipoVenta: await this.tipoVenta({ productos }),
          precioTotal: await this.precioVenta({ productos, descuento })
        })
        .populate('productos')
      return {
        ok: true,
        msg: 'Venta actualizada correctamente',
        statusCode: 200,
        ventas: [ventaAcutalizada]
      }
    } catch (error) {
      return {
        ok: false,
        msg: 'Error interno del servidor',
        statusCode: 500
      }
    }
  }

  async delete ({
    id
  }: {
    id: string
  }): Promise<ResponseOkTrueVentas | ResponseOkFalseVentas> {
    try {
      const buscarVenta = await this.model.findById(id)
      if (!buscarVenta) {
        return {
          ok: false,
          msg: 'No se encontró la venta',
          statusCode: 404
        }
      }
      const eliminarVenta = await buscarVenta
        .updateOne({
          isActive: false
        })
        .populate('productos')
      return {
        ok: true,
        msg: 'Venta eliminada correctamente',
        statusCode: 200,
        ventas: [eliminarVenta]
      }
    } catch (error) {
      return {
        ok: false,
        msg: 'Error interno del servidor',
        statusCode: 500
      }
    }
  }

  private async tipoVenta ({
    productos
  }: {
    productos: Array<Types.ObjectId>
  }): Promise<TipoVenta> {
    const productosEncontrados = await this.buscarProductos({ productos })
    const calculoTipo =
      productosEncontrados
        .map(producto => producto?.cantidadStock)
        .reduce((ant, act) => (ant ?? 0) + (act ?? 0)) ?? 0
    return calculoTipo === 1 ? 'unidad' : 'cantidad'
  }

  private async precioVenta ({
    productos,
    descuento
  }: {
    productos: Array<Types.ObjectId>
    descuento?: number
  }): Promise<number> {
    const productosEncontrados = []
    for (const producto of productos) {
      const productoID = await this.productosModel.findById(producto._id)
      productosEncontrados.push(productoID)
    }
    let precioVenta = productosEncontrados
      .map(producto => producto!.precio * producto!.cantidadStock)
      .reduce((precioAnterior, precioActual) => precioActual + precioAnterior)
    if (descuento) {
      precioVenta -= precioVenta * (descuento / 100)
    }
    return precioVenta
  }

  private async buscarProductos ({
    productos
  }: {
    productos: Array<Types.ObjectId>
  }): Promise<Array<Producto | undefined>> {
    const productosEncontrados = []
    for (const producto of productos) {
      const productoID =
        (await this.productosModel.findById(producto._id)) ?? undefined
      productosEncontrados.push(productoID)
    }
    return productosEncontrados
  }
}
