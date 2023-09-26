import express, { Application } from 'express'
import { connectToMongo } from './configs/database'
import { startProductoRouter } from './modules/producto/producto.routes'
import { ProductoServiceMongo } from './modules/producto/services/producto.mongo.service'

// función de inicio del servidor

export function startServer () {
  // instancia de express
  const app: Application = express()

  // middlewares
  app.use(express.json())

  // rutas
  app.use('/api/productos', startProductoRouter(new ProductoServiceMongo()))
  // levantar el servidor
  app.listen(3000, () => {
    // Conectarse a la base de datos

    // * MongoDB
    connectToMongo()

    // mensaje de éxito
    console.log('Server is running on port 3000')
  })

  return app
}
