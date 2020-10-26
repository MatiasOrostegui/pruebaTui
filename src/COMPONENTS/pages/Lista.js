//Variables importadas
import React, {Fragment} from 'react';
import '../Botones.css';
import '../Letras.css';
import '../../App.css';
const file2 = Blob 

//Variable de tipo texto (String) "Entrada" encargada de almacenar el "rut" del objeto "Registro"
var Entrada = String
const Descargar = () => {
    const element = document.createElement("a");
    const file = new Blob([Entrada],{type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file,file2);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
}
//Constante "Lista" esta se encarga de recivir un Objet "Registro" y Recorrerlo
//asignado a la Variable "Entrada" el "rut" del Objeto "Registros"
const Lista = ({Registro}) =>{
    //Las Variables Items e index se encargan de setear los datos del Objeto
    Registro.map((Item, index) => 
    //Asignamos en la Variable "Entrada" el "rut" de la Variable "item" equivalente al "rut
    //del Objeto "Registro".
        Entrada = Item.rut
    )

    //Retornamos un "textarea" llamado "Datos" el cual se encarga de mostrar los datos 
    //almacenados en la Variable "Entrada" mediante la Propiedad "value={Entrada}" 
    return(
        <Fragment>
            <button className='btnUnicoDescargar' onClick={Descargar}>Descargar</button>
            <textarea 
                name="Datos"
                className='textareaDatosUnico'
                rows ='3' 
                cols='150'
                value={Entrada} 
                placeholder='AREA DE CODIGO'>
            </textarea>
        </Fragment> 
    );
}

export default Lista;