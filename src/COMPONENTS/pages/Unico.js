import React, {Fragment, useState} from 'react';
import { useForm } from 'react-hook-form';
import Lista from './Lista.js'
import '../Botones.css';
import '../Letras.css';
import '../../App.css';


const Unico = () => {
  const {register, errors, handleSubmit, setError, clearError} = useForm();
  const [Entrada, SetEntrada] = useState([]) 

  const usuario = {
    CODIGO:'',
    Rut:'',
    ApellidoPaterno:'',
    ApellidoMaterno:'',
    Nombre:'',
    Sede:'',
    NombreCompleto:'',
    Sexo:'',
    Funcion:'',
    RutEspecial:'',
    LargoRut:'',
  };
  var Region = 'LIBERTADOR BERNARDO OHIGGINS'
  var Var_1 = '19891007'
  var Var_2 = 'S997997'
  var Var_3 = '0000000611'
  var Var_4 ='00335000033506290300000007168'
  var Var_5 ='0693'
  var Fecha = new Date();
  var Año = Fecha.getFullYear(); 


  const onSubmit = (Data,e) => { 

    const Transformacion = (limite,largo,Persona) =>{
        let Corte = limite - largo
        for (let index = 0; index < Corte; index++) {
            Persona = Persona + ' '   
        }    
        return Persona.toUpperCase()
    }



    if (Data.Funcion === 'ESTUDIANTE') {
        usuario.LargoRut = Data.Rut.toString().length
        if (usuario.LargoRut === 7) { 
            usuario.Rut = '10000'+Data.Rut.toString()
            usuario.RutEspecial ='000'+Data.Rut.toString()
        }else if (usuario.LargoRut  === 8) {
            usuario.Rut = '1000'+Data.Rut.toString()
            usuario.RutEspecial ='00'+Data.Rut.toString()
        }else{
            usuario.Rut =  '100'+Data.Rut.toString()
            usuario.RutEspecial = '0'+Data.Rut.toString()
        }
    }else{
        usuario.LargoRut = Data.Rut.toString().length
        if (usuario.LargoRut === 7) {
          usuario.Rut = '20000'+Data.Rut.toString()
          usuario.RutEspecial = '000'+Data.Rut.toString()
        }else if (usuario.LargoRut === 8) {
          usuario.Rut = '2000'+Data.Rut.toString()
          usuario.RutEspecial = '00'+Data.Rut.toString()
        }else{
          usuario.Rut = '200'+Data.Rut.toString()
          usuario.RutEspecial = '0'+Data.Rut.toString()
        }
    }

    usuario.NombreCompleto = Data.Nombre+" "+Data.ApellidoPaterno+" "+Data.ApellidoMaterno
    var NombreCompletoLargo = usuario.NombreCompleto.length 
    usuario.NombreCompleto = Transformacion(50,NombreCompletoLargo,usuario.NombreCompleto)

    usuario.ApellidoPaterno = Data.ApellidoPaterno
    var ApellidoPaternoLargo = usuario.ApellidoPaterno.length 
    usuario.ApellidoPaterno = Transformacion(20,ApellidoPaternoLargo,usuario.ApellidoPaterno)

    usuario.ApellidoMaterno = Data.ApellidoMaterno
    var ApellidoMaternoLargo = usuario.ApellidoMaterno.length 
    usuario.ApellidoMaterno = Transformacion(20,ApellidoMaternoLargo,usuario.ApellidoMaterno)

    usuario.Nombre = Data.Nombre
    var NombreLargo = usuario.Nombre.length 
    usuario.Nombre = Transformacion(40,NombreLargo,usuario.Nombre)

    var RegionLargo = Region.length 
    Region = Transformacion(50,RegionLargo,Region)

    usuario.Sede = Data.Sede
    var SedeLargo = usuario.Sede.length 
    usuario.Sede = Transformacion(50,SedeLargo,usuario.Sede)

    usuario.Funcion = Data.Funcion
    var FuncionLargo = usuario.Funcion.length 
    usuario.Funcion = Transformacion(152,FuncionLargo,usuario.Funcion)

    var Var_3Largo = Var_3.length 
    Var_3 = Transformacion(60,Var_3Largo,Var_3)
    
    var RutEspecialLargo = usuario.RutEspecial.length 
    usuario.RutEspecial = Transformacion(63,RutEspecialLargo,usuario.RutEspecial)
    
    usuario.Sexo = Data.Sexo

    usuario.CODIGO = usuario.Rut+
    usuario.ApellidoPaterno+
    usuario.ApellidoMaterno+
    usuario.Nombre+Var_1+
    usuario.Sexo+Var_2+
    Region+Var_3+Var_4+Año+
    usuario.NombreCompleto+
    usuario.Sede+
    usuario.Sede+
    Var_5+
    usuario.Funcion+
    usuario.RutEspecial


    
    Data.rut = usuario.CODIGO

    SetEntrada([
        ...Entrada,
        Data
    ])   

    // limpiar campos      
    e.target.reset();
}

  return (
    <Fragment> 
        <div className='contenedorGeneral'>
            <div className='contenedor'> 
            <p className='tituloUnico'>Sistema de Registro unico de Usuarios TUI</p>
                <form  className='form' onSubmit={handleSubmit(onSubmit)}>
                    <select name="Sede" className='selectUnicoSede' ref={register({required: true})}>
                        <option value="SEDE RANCAGUA">RANCAGUA</option>
                        <option value="SEDE COLCHAGUA">COLCHAGUA</option>
                        <option value="SEDE RENGO">RENGO</option>
                    </select>
                    <select name="Funcion" className='selectUnicoFuncion' ref={register({required: true})}>
                        <option value="FUNCIONARIO">FUNCIONARIO</option>
                        <option value="ACADEMICO">ACADEMICO</option>
                        <option value="ESTUDIANTE">ESTUDIANTE</option>
                    </select>
                    <div className='radiUnicoSexo'>                                    
                        <li><input name="Sexo" className='Sexo' type="radio" value="H" ref={register({required:{value: true, message: 'Sexo Obligatorio'} ,})}/>{" "} MASCULINO <i class="fas fa-mars"></i></li>
                        <li><input name="Sexo" className='Sexo' type="radio" value="M" ref={register({required:{value: true, message: 'Sexo Obligatorio'} ,})}/>{" "} FEMENINO <i class="fas fa-venus"></i></li>
                    </div>                      
                    {errors.Sexo && 
                        <div className="alert alert-dismissible alert-danger">  
                            <strong>{errors.Sexo.message}</strong>   
                        </div>
                    }

                    <input name="Rut" className="inputUnicoRut" placeholder="Ingrese Rut"ref={register({
                        minLength: {value: 7, message: 'Mínimo 7 Carácteres'},
                        required:{value: true, message: 'Rut Obligatorio'} ,
                        maxLength: {value: 9, message: 'No más de 9 carácteres sin guion!'}})}>
                    </input>
                    {errors.Rut && 
                        <div className="alert alert-dismissible alert-danger">  
                            <strong>{errors.Rut.message}</strong>   
                        </div>
                    }

                    <input name="Nombre" className="inputUnicoNombre"  placeholder="Ingrese Nombre" ref={register({required:{value: true, message: 'Nombre Obligatorio'}})}></input>
                    {errors.Nombre && 
                        <div className="alert alert-dismissible alert-danger">  
                            <strong>{errors.Nombre.message}</strong>   
                        </div>
                    }

                    <input name="ApellidoPaterno" className="inputUnicoApellidoPaterno" placeholder="Ingrese apellido Paterno" ref={register({required:{value: true, message: 'Apellido Paterno Obligatorio'}})}></input>
                    {errors.ApellidoPaterno && 
                        <div className="alert alert-dismissible alert-danger">
                            <strong>{errors.ApellidoPaterno.message}</strong>      
                        </div>
                    }
                    <input name="ApellidoMaterno" className="inputUnicoApellidoMaterno" placeholder="Ingrese apellido Materno" ref={register({required:{value: true, message: 'Apellido Materno Obligatorio'}})}></input>
                    {errors.ApellidoMaterno && 
                        <div className="alert alert-dismissible alert-danger">
                            <strong> {errors.ApellidoMaterno.message}</strong>       
                        </div>
                    }       
                    <button className='btnUnicoCargar'>CARGAR</button>
                </form>
                <Lista Registro={Entrada}/> 
            </div>
        </div>

    </Fragment>
  );
}
 
export default Unico;