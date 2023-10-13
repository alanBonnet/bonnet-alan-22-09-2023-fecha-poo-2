import { FormEvent, useEffect, useState } from 'react'
interface Producto {
  _id: string
  nombre: string
  descripcion: string
  precio: number
  cantidadStock: number
}
function App() {
  const [productos, setProductos] = useState<Array<Producto>>([])
  const [md, setMd] = useState(false)
  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then((response) => response.json())
      .then(jsoneado => {
        if (jsoneado?.productos) {
          setProductos(jsoneado.productos)
          return;
        }
        setProductos([{
          _id: '0',
          nombre: 'No se',
          descripcion: 'encuentran productos',
          precio: 0,
          cantidadStock: 0
        }])
      })
  }, [md])
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const nombre = (formData.get('nombre'))!.toString()
    const descripcion = (formData.get('descripcion'))!.toString()
    const precio = parseFloat(formData.get('precio')!.toString())
    const cantidadStock = parseFloat(formData.get('cantidadStock')!.toString())
    console.log({ nombre, descripcion, cantidadStock, precio })
    if (isNaN(precio) || isNaN(cantidadStock) || !nombre.trim() || !descripcion.trim()) {
      return
    }
    fetch('http://localhost:3000/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, descripcion, cantidadStock, precio })
    }).then(response => response.json())
      .then(() => { setMd(!md) })

  }
  return (
    <div className='grid lg:grid-cols-4'>
      <div className='m-2 p-2 border-gray-500 border-2 rounded-lg text-center' >
        <h2 className='text-3xl'>Agregar productos</h2>
        <form action="" onSubmit={handleFormSubmit} >
          <label className='text-lg capitalize' htmlFor="nombre">nombre</label>
          <input className='border-2 my-2 mx-2 p-1 rounded-lg' type="text" name="nombre" id="" /><br />
          <label className='text-lg capitalize' htmlFor="descripcion">descripción</label>
          <input className='border-2 my-2 mx-2 p-1 rounded-lg' type="text" name="descripcion" id="" /><br />
          <label className='text-lg capitalize' htmlFor="precio">precio</label>
          <input className='border-2 my-2 mx-2 p-1 rounded-lg' type="number" name="precio" placeholder='1000 $' min={0} step={'any'} id="" /><br />
          <label className='text-lg capitalize' htmlFor="cantidadStock">stock</label>
          <input className='border-2 my-2 mx-2 p-1 rounded-lg' type="number" name="cantidadStock" min={0} id="" /><br />
          <button type="submit" className='p-2 m-3 rounded-lg bg-lime-800 hover:bg-lime-500 text-white text-2xl'>Agregar</button>
        </form>
      </div>

      <div className='m-2 p-2 border-2 border-gray-500 rounded-lg lg:col-span-3'>
        <h3 className='text-2xl text-center underline'>Lista de productos</h3>
        <table className='w-full text-center my-2'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Cantidad Stock</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(producto => (
              <tr key={producto._id}>
                <td> {producto.nombre} </td>
                <td> {producto.descripcion} </td>
                <td> {producto.precio} </td>
                <td> {producto.cantidadStock} </td>
                <td>
                  <button className={` rounded-lg p-2 text-xl text-white ${producto.cantidadStock ? 'bg-rose-800 hover:bg-rose-600 hover:text-2xl transition-all ease-in-out' : 'bg-rose-400 pointer-events-none'} `}>Vender</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
