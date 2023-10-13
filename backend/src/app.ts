import express, { Application } from 'express'
import cors from 'cors'
import { connectToMongo } from './configs/database'
import { startProductoRouter } from './modules/producto/producto.routes'
import { ProductoServiceMongo } from './modules/producto/services/producto.mongo.service'
import { configDotenv } from 'dotenv'
import { VentasServiceMongo } from './modules/ventas/services/ventas.mongo.service'
import { startVentasRouter } from './modules/ventas/ventas.routes'

// función de inicio del servidor

export function startServer () {
  // instancia de express
  const app: Application = express()
  configDotenv()
  // middlewares
  app.use(express.json())
  app.use(cors())
  // rutas
  app.use('/api/productos', startProductoRouter(new ProductoServiceMongo()))
  app.use('/api/ventas', startVentasRouter(new VentasServiceMongo()))
  // levantar el servidor
  app.listen(3000, () => {
    // Conectarse a la base de datos

    // * MongoDB
    connectToMongo(process.env.MONGO_URI)

    // mensaje de éxito
    console.log('Server is running on port 3000')
  })

  return app
}
