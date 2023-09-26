import { Router } from 'express'
import { ProductoService } from './producto.service'

export function startProductoRouter (productoService: ProductoService) {
  const productoRouter = Router()

  // rutas
  productoRouter.get('/', async (req, res) => {
    try {
      const allProductos = await productoService.list()
      if (!allProductos.length) {
        return res.status(404).json({
          message: 'No se encuentran los productos'
        })
      }
      return res.status(200).json(allProductos)
    } catch (error) {
      return res.status(500).json({
        message: 'Error interno del servidor'
      })
    }
  })

  productoRouter.get('/:nombreProducto', async (req, res) => {
    try {
      const { nombreProducto } = req.params
      const allProductos = await productoService.findByName(nombreProducto)
      if (!allProductos?.length) {
        return res.status(404).json({
          message: 'No se encuentran los productos'
        })
      }
      return res.status(200).json(allProductos)
    } catch (error) {
      return res.status(500).json({
        message: 'Error interno del servidor'
      })
    }
  })

  productoRouter.post('/', async (req, res) => {
    try {
      const { nombre, precio, descripcion, imagen, cantidadStock, categoriaId, proveedorId } = req.body
      const newProducto = await productoService.create({
        nombre,
        precio,
        descripcion,
        imagen,
        cantidadStock,
        categoriaId,
        proveedorId
      })
      return res.status(200).json(newProducto)
    } catch (error) {
      return res.status(500).json({
        message: 'Error interno del servidor'
      })
    }
  })

  productoRouter.patch('/:idProducto', async (req, res) => {
    try {
      const { idProducto } = req.params
      const { nombre, precio, descripcion, imagen, cantidadStock, categoriaId, proveedorId } = req.body
      const updateProducto = await productoService.update(idProducto, {
        nombre,
        descripcion,
        precio,
        cantidadStock,
        imagen,
        categoriaId,
        proveedorId
      })
      if (!updateProducto) {
        return res.status(404).json({
          message: 'No se encontró el producto a modificar'
        })
      }
      return res.status(200).json({
        message: 'Producto modificado correctamente'
      })
    } catch (error) {
      return res.status(500).json({
        error,
        message: 'Error interno del servidor'
      })
    }
  })

  productoRouter.delete('/:idProducto', async (req, res) => {
    try {
      const { idProducto } = req.params
      const deleteProducto = await productoService.delete(idProducto)
      if (!deleteProducto) {
        return res.status(404).json({
          message: 'No se encontró el producto a eliminar'
        })
      }
      return res.status(200).json({ message: 'Producto eliminado correctamente' })
    } catch (error) {
      return res.status(500).json({
        message: 'Error interno del servidor'
      })
    }
  })

  return productoRouter
}
