import { Router } from 'express'
import { ProductoService } from './producto.service'

export function startProductoRouter (productoService: ProductoService) {
  const productoRouter = Router()

  // rutas
  productoRouter.get('/', async (_req, res) => {
    try {
      const allProductos = await productoService.list()
      return res.status(allProductos.statusCode).json(allProductos)
    } catch (error) {
      return res.status(500).json({
        message: 'Error interno del servidor'
      })
    }
  })

  productoRouter.get('/:nombreProducto', async (req, res) => {
    try {
      const { nombreProducto } = req.params
      const allProductosByName = await productoService.findByName(
        nombreProducto
      )
      return res.status(allProductosByName.statusCode).json(allProductosByName)
    } catch (error) {
      return res.status(500).json({
        message: 'Error interno del servidor'
      })
    }
  })

  productoRouter.post('/', async (req, res) => {
    try {
      const { nombre, precio, descripcion, imagen, cantidadStock } = req.body
      const newProducto = await productoService.create({
        nombre,
        precio,
        descripcion,
        imagen,
        cantidadStock
      })
      return res.status(newProducto.statusCode).json(newProducto)
    } catch (error) {
      return res.status(500).json({
        message: 'Error interno del servidor'
      })
    }
  })

  productoRouter.patch('/:idProducto', async (req, res) => {
    try {
      const { idProducto } = req.params
      const { nombre, precio, descripcion, imagen, cantidadStock } = req.body
      const updateProducto = await productoService.update(idProducto, {
        nombre,
        descripcion,
        precio,
        cantidadStock,
        imagen
      })
      return res.status(updateProducto.statusCode).json(updateProducto)
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
      return res.status(deleteProducto.statusCode).json(deleteProducto)
    } catch (error) {
      return res.status(500).json({
        message: 'Error interno del servidor'
      })
    }
  })

  return productoRouter
}
