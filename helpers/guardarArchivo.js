// Se importan paquetes de Node.

// 'fs'(file system) se utiliza para crear archivos en el sistema.
import fs from 'fs';

// Ubicación donde se encuentra o donde se guardará el archivo. En este caso es un .JSON
const archivo = './database/data.json';

// Función para guardar el archivo simulando ser una base de datos. Recibe como parámetro los datos.
const guardarDB = ( data ) => {

    /* Con la función 'writeFileSync()' se escribe el archivo y recibe dos parámetros.
    El primero es la ubicación del archivo y el segundo es la data. Como se está guardando en un .JSON
    con la función 'JSON.stringify()' transformarmos la data a un formato .JSON */
    fs.writeFileSync(archivo, JSON.stringify(data));
    
}

// Esta función es utilizada para leer el archivo que donde se encuentra la data.
const leerDB = () => {

    // Se evalua si no existe el archivo, si no existe retorna un 'null'.
    if(!fs.existsSync(archivo)) {
        return null;
    }

    /* Con la función 'readFileSync()' se lee el archivo. Primero se pasa como parámetro la ubicación y 
    segundo se el formato de codificación. Lo que devuelva la función será almacenado en 'info'. */
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});

    /* Con la data almacenada en info. Se utiliza la función 'JSON.parse()' para pasar de JSON a un objeto.
    El resultante se almacena en 'data'. */
    const data = JSON.parse(info);

    // Se retorna la data.
    return data;

}

// Se exportan las funciones.
export {
    guardarDB,
    leerDB
}