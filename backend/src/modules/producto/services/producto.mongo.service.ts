import { Producto } from './../producto.entity'
import { ProductoModelMongo } from '../producto.model'
import { ProductoService } from '../producto.service'
import {
  ResponseOkTrueProductos,
  ResponseOkFalseProductos
} from '../../../types/responses.types'

export class ProductoServiceMongo implements ProductoService {
  private model = ProductoModelMongo

  async list (): Promise<ResponseOkTrueProductos | ResponseOkFalseProductos> {
    const productos = await this.model
      .find({ activeProducto: true })
      .select('_id nombre descripcion precio cantidadStock')
    if (!productos.length) {
      return {
        ok: false,
        msg: 'No se encuentran productos',
        statusCode: 404
      }
    }
    return {
      ok: true,
      msg: 'Productos encontrados exitosamente.',
      statusCode: 200,
      productos
    }
  }

  async findByName (
    name: string
  ): Promise<ResponseOkTrueProductos | ResponseOkFalseProductos> {
    try {
      const productos = await this.model
        .find({ nombre: name, activeProducto: true })
        .select('_id nombre descripcion precio cantidadStock')

      if (!productos.length) {
        return {
          ok: false,
          msg: 'No se encuentran productos',
          statusCode: 404
        }
      }
      return {
        ok: true,
        msg: 'Productos encontrados exitosamente.',
        statusCode: 200,
        productos
      }
    } catch (error) {
      return {
        ok: false,
        msg: 'Error interno del servidor',
        statusCode: 500
      }
    }
  }

  async create (
    producto: Producto
  ): Promise<ResponseOkTrueProductos | ResponseOkFalseProductos> {
    try {
      const { nombre, descripcion, precio, cantidadStock, imagen } = producto

      const nuevoProducto = await this.model.create({
        nombre: nombre.toLowerCase(),
        descripcion: descripcion.toLowerCase(),
        imagen,
        precio,
        cantidadStock
      })
      if (!nuevoProducto) {
        return {
          ok: false,
          msg: 'No se pudo guardar el producto',
          statusCode: 401
        }
      }
      return {
        ok: true,
        msg: 'Producto creado exitosamente',
        statusCode: 201,
        productos: [nuevoProducto]
      }
    } catch (error) {
      return {
        ok: false,
        msg: 'Error interno del servidor',
        statusCode: 500
      }
    }
  }

  async update (
    id: string,
    { nombre, precio, descripcion, cantidadStock, imagen }: Producto
  ): Promise<ResponseOkTrueProductos | ResponseOkFalseProductos> {
    try {
      const actualizacionProducto = await this.model.findById(id)
      const productoActualizado = await actualizacionProducto?.updateOne({
        nombre,
        precio,
        descripcion,
        cantidadStock,
        imagen
      })
      if (!productoActualizado) {
        return {
          ok: false,
          msg: 'No se pudo actualizar el producto',
          statusCode: 400
        }
      }
      return {
        ok: true,
        msg: 'Producto actualizado correctamente',
        statusCode: 200,
        productos: [productoActualizado]
      }
    } catch (error) {
      return {
        ok: false,
        msg: 'Error interno del servidor',
        statusCode: 500
      }
    }
  }

  async delete (
    id: string
  ): Promise<ResponseOkTrueProductos | ResponseOkFalseProductos> {
    try {
      const eliminarProducto = await this.model.findOne({
        _id: id,
        activeProducto: true
      })
      await eliminarProducto?.updateOne({ activeProducto: false })
      return {
        ok: true,
        msg: 'Producto eliminado correctamente',
        statusCode: 200
      }
    } catch (error) {
      return {
        ok: false,
        msg: 'Error interno del servidor',
        statusCode: 500
      }
    }
  }
}
