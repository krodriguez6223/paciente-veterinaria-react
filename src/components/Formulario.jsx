//rfce 
import {useState, useEffect} from 'react'
import Error from './Error';


function formulario( {pacientes, setPacientes, paciente, setPaciente} ) {
      const [nombre, setNombre] = useState('');
      const [propietario, setPropietario] = useState('');
      const [email, setEmail] = useState('');
      const [contacto, setContacto] = useState('');
      const [alta, setFecha] = useState('');
      const [sintomas, setSintomas] = useState('');

      const [error, setError] = useState(false);

      useEffect(()=> {
           if(Object.keys(paciente).length > 0){

            const {nombre, propietario, email, contacto, alta, sintomas} = paciente;
                  setNombre(nombre);
                  setPropietario(propietario);
                  setEmail(email);
                  setContacto(contacto);
                  setFecha(alta);
                  setSintomas(sintomas);
           }
      }, [paciente])

      const generarId = () => {
            const random = Math.random().toString(36).substr(2);
            const fecha = Date.now().toString(36)

            return random + fecha;
      }

      const handleSubmit = (e) => {
            e.preventDefault();
         
            //validacion formulario
            if ([nombre, propietario, email, alta, sintomas, contacto].includes('')) {
                  
                 setError(true); 
                 
                 setTimeout(() => {
                   setError(false) 
                 }, 3000);
                 return;
            }else{
                  //Objeto del paciente
                  const objetoPaciente = {
                        nombre,
                        propietario,
                        email,
                        alta,
                        sintomas,
                        contacto,
                        }     
                  if(paciente.id){
                      
                        //Editando registro
                        objetoPaciente.id = paciente.id

                        const pacientesActulizado = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
                        
                        setPacientes(pacientesActulizado)
                        setPaciente({})

                  }else{
                       //Nuevo registro
                       objetoPaciente.id = generarId();
                       setPacientes([...pacientes, objetoPaciente]);       
                  }
                        //reiniciar el formualrio
                        setNombre('')
                        setPropietario('');
                        setEmail('');
                        setFecha('');
                        setSintomas('');
                        setContacto('');
                  }   


      }

  return (
    <div className="md:w-1/2 m-5 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className='mt-5 text-center'>Añade Paciente y <span className="text-indigo-600 font-bold">Administralos</span></p>
     
      <form 
            onSubmit={handleSubmit}
            className='bg-white rounded shadow-md py-10 px-5 mt-5 mb-10'>
           
          <div>
            <label 
                  htmlFor="mascota" 
                  className='font-black text-gray-700 uppercase'>
                    Nombre Mascota 
            </label>
            <input 
                  id='mascota'
                  type="text" 
                  placeholder='Nombre de la mascota'
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                  value={nombre}
                  onChange={ (e) => setNombre(e.target.value) }
                  />
          </div>

          <div className='mt-5'>
            <label 
                  htmlFor="propietario" 
                  className='font-black text-gray-700 uppercase'>
                  Nombre Propietario</label>
            <input 
                  id='propietario'
                  type="text" 
                  placeholder='Nombre del propietario'
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                  value={propietario}
                  onChange={ (e) => setPropietario(e.target.value) }/>
          </div>

          <div className='mt-5'>
            <label 
                  htmlFor="email" 
                  className='font-black text-gray-700 uppercase'>
                  Email</label>
            <input 
                  id='email'
                  type="email" 
                  placeholder='Correo electronico'
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                  value={email}
                  onChange={ (e) => setEmail(e.target.value) }/>
          </div>
          <div className='mt-5'>
            <label 
                  htmlFor="contacto" 
                  className='font-black text-gray-700 uppercase'>
                  contacto</label>
            <input 
                  id='contacto'
                  type="text" 
                  placeholder='Correo electronico'
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                  value={contacto}
                  onChange={ (e) => setContacto(e.target.value) }/>
          </div>
          <div className='mt-5'>
            <label 
                  htmlFor="Alta" 
                  className='font-black text-gray-700 uppercase'>
                  alta</label>
            <input 
                  id='alta'
                  type="date" 
                  placeholder='Correo electronico'
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                  value={alta}
                  onChange={ (e) => setFecha(e.target.value) }/>
          </div>
          <div className='mt-5'>
            <label 
                  htmlFor="sintomas" 
                  className='font-black text-gray-700 uppercase'>
                  alta</label>
           <textarea 
                 id="sintomas"
                  cols="30"
                  rows="2"
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                  placeholder='Describe los sintomas'
                  value={sintomas}
                  onChange={ (e) => setSintomas(e.target.value) }></textarea>
          </div>
          
          { error && <Error>Todos los campos son obligatorios</Error> }

          <input type="submit" 
                  value={paciente.id ? 'Actualizar Paciente' : 'Agregar paciente'}
                  className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors mt-2"/>

      </form>
    </div>
  )
}

export default formulario