import { Router } from 'express'
import { IVentasService } from './ventas.service'

export function startVentasRouter (ventasService: IVentasService) {
  const ventasRouter = Router()

  // rutas
  ventasRouter.get('/', async (_req, res) => {
    try {
      const allProductos = await ventasService.list()
      return res.status(allProductos.statusCode).json(allProductos)
    } catch (error) {
      return res.status(500).json({
        message: 'Error interno del servidor'
      })
    }
  })

  ventasRouter.post('/', async (req, res) => {
    try {
      const { descuento, productos } = req.body
      const newProducto = await ventasService.create({
        descuento,
        productos
      })
      return res.status(newProducto.statusCode).json(newProducto)
    } catch (error) {
      return res.status(500).json({
        message: 'Error interno del servidor'
      })
    }
  })

  ventasRouter.patch('/:idVenta', async (req, res) => {
    try {
      const { idVenta } = req.params
      const { productos, descuento } = req.body
      const updateProducto = await ventasService.update({
        id: idVenta,
        productos,
        descuento
      })
      return res.status(updateProducto.statusCode).json(updateProducto)
    } catch (error) {
      return res.status(500).json({
        error,
        message: 'Error interno del servidor'
      })
    }
  })

  ventasRouter.delete('/:idVenta', async (req, res) => {
    try {
      const { idVenta } = req.params
      const deleteProducto = await ventasService.delete({ id: idVenta })
      return res.status(deleteProducto.statusCode).json(deleteProducto)
    } catch (error) {
      return res.status(500).json({
        message: 'Error interno del servidor'
      })
    }
  })

  return ventasRouter
}
