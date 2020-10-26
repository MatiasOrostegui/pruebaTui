import React,{useState, Fragment} from 'react';
import '../Botones.css';
import '../Letras.css';
import '../../App.css';
import * as XLSX from 'xlsx';

const todo = []
var file 
var vacio
var cargado
var Vista = ''
var Region = 'LIBERTADOR BERNARDO OHIGGINS'
var Var_1 = '19891007'
var Var_2 = 'S997997'
var Var_3 = '0000000611'
var Var_4 ='00335000033506290300000007168'
var Var_5 ='0693'
var Fecha = new Date();
var Año = Fecha.getFullYear(); 
var Dia = Fecha.getDay();
var Mes = Fecha.getMonth();
const fileReader = new FileReader();
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
  Funcion2:''
};

const Cargado = () =>{
  cargado = document.getElementById('btn_seleccionar');
  cargado.className = 'cargado';
}

const Vacio = () =>{
  vacio = document.getElementById('btn_seleccionar');
  vacio.className = 'btn_seleccionar';
}

const Reload = () =>{
  file = "";
  while(todo.length) {
    todo.pop();
  }   
  const fileReader2 = new FileReader();
  const fileReader = fileReader2;

  delete usuario.Rut;
  delete usuario.CODIGO;
  delete usuario.Rut;
  delete usuario.ApellidoPaterno;
  delete usuario.ApellidoMaterno;
  delete usuario.Nombre;
  delete usuario.Sede;
  delete usuario.NombreCompleto;
  delete usuario.Sexo;
  delete usuario.Funcion;
  delete usuario.RutEspecial;
  delete usuario.LargoRut;
  delete usuario.Funcion2;
}

const Transformacion = (limite,largo,Persona) =>{
  let Corte = limite - largo
  for (let index = 0; index < Corte; index++) {
      Persona = Persona + ' '   
  }    
  return Persona.toUpperCase()
}

function Reemplazar( text, busca, reemplaza ){
  while (text.toString().indexOf(busca) !== -1)
      text = text.toString().replace(busca,reemplaza);
  return text;
}

const Masivo = () => {

  const [Entrada, SetEntrada] = useState([]) 
  const [Condicion, SetCondicion] = useState(false) 
  const [File, SetFile] = useState(false) 

  React.useEffect(() => {
    if (Condicion === false) {
      SetFile(false)
      document.getElementById('textareaDatosMasivo').value = "";
      document.getElementById('btn_seleccionar').value = "";
      Reload();
      Vacio()
    }
  });

  const ReadExcel = (file) =>{
     if (Condicion === false) {
      if (!file) {
        SetFile(false)
        SetCondicion(false)
        Vacio()
        Reload()
      }else{
        if(File === false){
          const promise = new Promise((resolve, reject)=>{
            fileReader.readAsArrayBuffer(file);
  
            fileReader.onload=(e)=>{
              let bufferArrray = e.target.result;
              const wb=XLSX.read(bufferArrray,{type:"buffer"});
              const wsname=wb.SheetNames[0];
              const ws=wb.Sheets[wsname];
              const data = XLSX.utils.sheet_to_json(ws);
      
              resolve(data);
              SetCondicion(true)
            };
      
            fileReader.onerror = (error)=>{
              reject(error);
              SetCondicion(false)
            };
          });
  
          promise.then((d) => {
            d.forEach(Data => {
  
              if (Data.FUNCION === 'ESTUDIANTE') {
                  usuario.LargoRut = Data.RUT.toString().length
                  if (usuario.LargoRut === 7) { 
                      usuario.Rut = '10000'+Data.RUT.toString()
                      usuario.RutEspecial ='000'+Data.RUT.toString()
                  }else if (usuario.LargoRut  === 8) {
                      usuario.Rut = '1000'+Data.RUT.toString()
                      usuario.RutEspecial ='00'+Data.RUT.toString()
                  }else{
                      usuario.Rut =  '100'+Data.RUT.toString()
                      usuario.RutEspecial = '0'+Data.RUT.toString()
                  }
              }else{
                  usuario.LargoRut = Data.RUT.toString().length
                  if (usuario.LargoRut === 7) {
                    usuario.Rut = '20000'+Data.RUT.toString()
                    usuario.RutEspecial = '000'+Data.RUT.toString()
                  }else if (usuario.LargoRut === 8) {
                    usuario.Rut = '2000'+Data.RUT.toString()
                    usuario.RutEspecial = '00'+Data.RUT.toString()
                  }else{
                    usuario.Rut = '200'+Data.RUT.toString()
                    usuario.RutEspecial = '0'+Data.RUT.toString()
                  }
              }
      
              usuario.NombreCompleto = Data.NOMBRE+" "+Data.APELLIDO_PATERNO+" "+Data.APELLIDO_MATERNO
              var NombreCompletoLargo = usuario.NombreCompleto.length 
              usuario.NombreCompleto = Transformacion(50,NombreCompletoLargo,usuario.NombreCompleto)
      
              usuario.ApellidoPaterno = Data.APELLIDO_PATERNO
              var ApellidoPaternoLargo = usuario.ApellidoPaterno.length 
              usuario.ApellidoPaterno = Transformacion(20,ApellidoPaternoLargo,usuario.ApellidoPaterno)
      
              usuario.ApellidoMaterno = Data.APELLIDO_MATERNO
              var ApellidoMaternoLargo = usuario.ApellidoMaterno.length 
              usuario.ApellidoMaterno = Transformacion(20,ApellidoMaternoLargo,usuario.ApellidoMaterno)
      
              usuario.Nombre = Data.NOMBRE
              var NombreLargo = usuario.Nombre.length 
              usuario.Nombre = Transformacion(40,NombreLargo,usuario.Nombre)
      
              var RegionLargo = Region.length 
              Region = Transformacion(50,RegionLargo,Region)
      
              usuario.Sede = 'SEDE '+Data.SEDE
              var SedeLargo = usuario.Sede.length 
              usuario.Sede = Transformacion(50,SedeLargo,usuario.Sede)
      
              usuario.Funcion = Data.FUNCION
              usuario.Funcion2 = Data.FUNCION
              var FuncionLargo = usuario.Funcion.length 
              usuario.Funcion = Transformacion(152,FuncionLargo,usuario.Funcion)
      
              var Var_3Largo = Var_3.length 
              Var_3 = Transformacion(60,Var_3Largo,Var_3)
          
              var RutEspecialLargo = usuario.RutEspecial.length 
              usuario.RutEspecial = Transformacion(63,RutEspecialLargo,usuario.RutEspecial)
          
              usuario.Sexo = Data.SEXO
      
              usuario.CODIGO =  usuario.Rut+
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
  
              Data.CODIGO = usuario.CODIGO      
              todo.push(Data.CODIGO)
              Vista = todo
              Vista = Reemplazar(Vista,',','\n')
             
              SetEntrada([
                  ...Entrada,
                  Data
              ])   
            });  
            
            SetEntrada(d);
          });
          SetFile(true)
          SetCondicion(true)
          Cargado()
        }else{
          SetFile(true)
          SetCondicion(false)
          Vacio()
          Reload()
        }
      }
    }else{
      if (!file) {
        SetFile(false)
        SetCondicion(false)
        Vacio()
        Reload()
      }else{   
        if(File === false){
          const promise = new Promise((resolve, reject)=>{
            fileReader.readAsArrayBuffer(file);
  
            fileReader.onload=(e)=>{
              let bufferArrray = e.target.result;
              const wb=XLSX.read(bufferArrray,{type:"buffer"});
              const wsname=wb.SheetNames[0];
              const ws=wb.Sheets[wsname];
              const data = XLSX.utils.sheet_to_json(ws);
      
              resolve(data);
              SetCondicion(true)
            };
      
            fileReader.onerror = (error)=>{
              reject(error);
              SetCondicion(false)
            };
          });
  
          promise.then((d) => {
            d.forEach(Data => {
  
              if (Data.FUNCION === 'ESTUDIANTE') {
                  usuario.LargoRut = Data.RUT.toString().length
                  if (usuario.LargoRut === 7) { 
                      usuario.Rut = '10000'+Data.RUT.toString()
                      usuario.RutEspecial ='000'+Data.RUT.toString()
                  }else if (usuario.LargoRut  === 8) {
                      usuario.Rut = '1000'+Data.RUT.toString()
                      usuario.RutEspecial ='00'+Data.RUT.toString()
                  }else{
                      usuario.Rut =  '100'+Data.RUT.toString()
                      usuario.RutEspecial = '0'+Data.RUT.toString()
                  }
              }else{
                  usuario.LargoRut = Data.RUT.toString().length
                  if (usuario.LargoRut === 7) {
                    usuario.Rut = '20000'+Data.RUT.toString()
                    usuario.RutEspecial = '000'+Data.RUT.toString()
                  }else if (usuario.LargoRut === 8) {
                    usuario.Rut = '2000'+Data.RUT.toString()
                    usuario.RutEspecial = '00'+Data.RUT.toString()
                  }else{
                    usuario.Rut = '200'+Data.RUT.toString()
                    usuario.RutEspecial = '0'+Data.RUT.toString()
                  }
              }
      
              usuario.NombreCompleto = Data.NOMBRE+" "+Data.APELLIDO_PATERNO+" "+Data.APELLIDO_MATERNO
              var NombreCompletoLargo = usuario.NombreCompleto.length 
              usuario.NombreCompleto = Transformacion(50,NombreCompletoLargo,usuario.NombreCompleto)
      
              usuario.ApellidoPaterno = Data.APELLIDO_PATERNO
              var ApellidoPaternoLargo = usuario.ApellidoPaterno.length 
              usuario.ApellidoPaterno = Transformacion(20,ApellidoPaternoLargo,usuario.ApellidoPaterno)
      
              usuario.ApellidoMaterno = Data.APELLIDO_MATERNO
              var ApellidoMaternoLargo = usuario.ApellidoMaterno.length 
              usuario.ApellidoMaterno = Transformacion(20,ApellidoMaternoLargo,usuario.ApellidoMaterno)
      
              usuario.Nombre = Data.NOMBRE
              var NombreLargo = usuario.Nombre.length 
              usuario.Nombre = Transformacion(40,NombreLargo,usuario.Nombre)
      
              var RegionLargo = Region.length 
              Region = Transformacion(50,RegionLargo,Region)
      
              usuario.Sede = 'SEDE '+Data.SEDE
              var SedeLargo = usuario.Sede.length 
              usuario.Sede = Transformacion(50,SedeLargo,usuario.Sede)
      
              usuario.Funcion = Data.FUNCION
              usuario.Funcion2 = Data.FUNCION
              var FuncionLargo = usuario.Funcion.length 
              usuario.Funcion = Transformacion(152,FuncionLargo,usuario.Funcion)
      
              var Var_3Largo = Var_3.length 
              Var_3 = Transformacion(60,Var_3Largo,Var_3)
          
              var RutEspecialLargo = usuario.RutEspecial.length 
              usuario.RutEspecial = Transformacion(63,RutEspecialLargo,usuario.RutEspecial)
          
              usuario.Sexo = Data.SEXO
      
              usuario.CODIGO =  usuario.Rut+
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
  
              Data.CODIGO = usuario.CODIGO      
              todo.push(Data.CODIGO)
              Vista = todo
              Vista = Reemplazar(Vista,',','\n')
             
              SetEntrada([
                  ...Entrada,
                  Data
              ])   
            });  
            
            SetEntrada(d);
          });
          SetFile(true)
          SetCondicion(true)
          Cargado()
        }else{
          SetFile(false)
          SetCondicion(false)
          Vacio()
          Reload()
        }
      }
    }
  }

  const Descargar = () =>{ 

    if (Condicion === false) {
      SetFile(false)
      SetCondicion(false)
      Vacio()
      Reload()
    } else {
      const element = document.createElement("a");
      
      console.log(usuario.Funcion2)
      if (usuario.Funcion2 === "ESTUDIANTE") {
        element.download = "UOH_EST_"+Dia+"_"+Mes+"_"+Año+".txt";
        file = new Blob([Vista],{type: 'text/plain;charset=utf-8'});      
      }else{
        element.download = "UOH_FUN_"+Dia+"_"+Mes+"_"+Año+".txt";             
        file = new Blob([Vista],{type: 'text/plain;charset=utf-8'});
      }
  
      element.href = URL.createObjectURL(file);
      document.body.appendChild(element);
      element.click();
      SetCondicion(false)
      Vacio()
      Reload()
      SetFile(false)
    }
  }

  return (   
   
    <Fragment>
      <div className='contenedorGeneral'>
        <div className='contenedor'> 
          <div>
            <input className='btn_seleccionar' id='btn_seleccionar' type="file" onChange={(e) =>{const file = e.target.files[0];ReadExcel(file);}}/>        
          </div>
          <button className='btn_descargar' onClick={Descargar}></button>
        
          <div className='textarea_contenedor'>
            <textarea className='textareaDatosMasivo' id='textareaDatosMasivo' name="Datos" rows ='20' cols='100' value={Vista} placeholder='AREA DE CODIGO'/>  
          </div>
        </div>
      </div>
    </Fragment>
  );
}
 
export default Masivo;