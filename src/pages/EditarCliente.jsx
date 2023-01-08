import { Form, useNavigate, useActionData, useLoaderData, redirect } from 'react-router-dom'
import { obtenerCliente, actualizarCliente } from "../data/clientes"
import Formulario from '../components/Formulario'

export async function loader({params}){
    const cliente = await obtenerCliente(params.clienteId)
    if(Object.values(cliente).length == 0){
      throw new Response('',{
        status: 404,
        statusText: 'No hay resultados'
      })
    }
    return cliente
}

export async function action({request, params}){
  const formData = await request.formData();
  const datos = Object.fromEntries(formData)

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  const email = formData.get('email')

  //Validacion
  const errores = []
  if(Object.values(datos).includes('')){
    errores.push('Todos los campos son obligatorios')
  }

  //Validar Email
  if(regex.test(email) == false){
    errores.push('El email no es válido')
  }

  //Retornar datos si hay errores
  if(Object.keys(errores).length){
    return errores
  }

  //Ya paso la validación
  //Editar Cliente
  await actualizarCliente(params.clienteId, datos)

  return redirect('/')
}

const EditarCliente = () => {

  const navigate = useNavigate()
  const errores = useActionData()
  const cliente = useLoaderData()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Llena todos los campos para editar al cliente</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={()=> navigate(-1)}
        >Volver</button>
      </div>

      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10'>

        { errores?.length && errores.map( (error, index) => <Error key={index}>{error}</Error> ) }

        <Form method='PUT' noValidate>

          <Formulario
            cliente={cliente}
          />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Guardar cambios"
          />

        </Form>
        
      </div>
    </>
  )
}

export default EditarCliente