import { ProductoModelMongo } from '../producto.model'
import { ProductoService } from '../producto.service'
import { Producto } from '../producto.entity'

export class ProductoServiceMongo implements ProductoService {
  private model = ProductoModelMongo

  async list (): Promise<Array<Producto>> {
    const productos = await this.model.find({ activeProducto: true })
    return productos
  }

  // async find (id: string): Promise<Producto | null> {
  //   const producto = await this.model.findById(id)
  //   return producto
  // }

  async findByName (name: string): Promise<Array<Producto> | null> {
    const productos = await this.model.find({ nombre: name, activeProducto: true })
    return productos
  }

  async create (producto: Producto): Promise<Producto> {
    const { nombre, descripcion, precio, cantidadStock, categoriaId, imagen, proveedorId } = producto

    const nuevoProducto = await this.model.create({
      nombre: nombre.toLowerCase(),
      descripcion: descripcion.toLowerCase(),
      imagen,
      precio,
      cantidadStock,
      categoriaId,
      proveedorId
    })
    return nuevoProducto
  }

  async update (id: string, producto: Producto): Promise<Producto | null> {
    try {
      const actualizacionProducto = await this.model.findById(id)
      await actualizacionProducto?.updateOne(producto)
      return actualizacionProducto
    } catch (error) {
      return null
    }
  }

  async delete (id: string): Promise<Producto | null> {
    try {
      const eliminarProducto = await this.model.findOne({ _id: id, activeProducto: true })
      await eliminarProducto?.updateOne({ activeProducto: false })
      return eliminarProducto
    } catch (error) {
      return null
    }
  }
}
