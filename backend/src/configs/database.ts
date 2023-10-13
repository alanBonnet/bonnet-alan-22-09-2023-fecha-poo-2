import { connect } from 'mongoose'
export async function connectToMongo (mongoUri?: string) {
  connect(mongoUri || 'mongodb://127.0.0.1:27017/tienda')
    .then(db =>
      console.log('MongoDB is connected to', db.connection.db.databaseName)
    )
    .catch(err => console.log(err))
}
