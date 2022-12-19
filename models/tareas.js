import 'colors';

// Importamos clases propias.

import { Tarea } from './tarea.js'

// Se crea la clase 'Tareas' que se encargará de almacenar cada 'tarea' creada.
class Tareas {

    /* Se declara la propidad '_listado' que será utilizada para almacenar 
    cada 'tarea' dentro de un objeto. */
    _listado = {};

    // Se crea un método getter para transformar las tareas que están en un objeto a un arreglo.
    get listadoArr() {
        /* Se declara un arreglo vacío que será el que retornara el método getter.
        La idea es retornar un unico arreglo que posea múltiples objetos donde cada
        objeto es una tarea. */
        const listado = [];

        /* Con la función 'Object.keys' separamos por sus llaves cada tarea de '_listado'.
        Luego, para cada tarea 'forEach' que se representará con el 'key' va a ejecutar el siguiente
        código. */
        Object.keys(this._listado).forEach((key) => {
            /* Guarda en 'tarea' lo que esté en '_listado' con el valor del 'key'. 
            Lo que estará será un objeto de una tarea de la siguiente manera {id, desc, completadoEn} */
            const tarea = this._listado[key];

            // Se agrega cada tarea en el arreglo 'listado' con el método '.push'.
            listado.push(tarea);
        });
        
        // Se retorna la lista de tareas.
        return listado;
    }

    // El constructor inicializa la propidad '_listado' como un arreglo vacio.
    constructor() {
        this._listado = {};
    }

    // Método para borrar una tarea. Recibe como parámetro un 'id'.
    borrarTarea(id = '') {

        // Se comprueba que el 'id' esté en el listado de tareas.
        if(this._listado[id]) {
            // Se borra la tarea que tenga el id correspondiente.
            delete this._listado[id];
        }

    }

    // Método para cargar las tareas que estén en el archivo. Recibe un arreglo de tareas.
    cargarTareaFromArray(tareas = []) {
        // Recorre cada una de las 'tareas' con un 'forEach'.
        tareas.forEach(tarea => {
            // Para mantener el formato se la 'tarea' en el '_listado'.
            this._listado[tarea.id] = tarea;
        });

    }

    // Se crea un método 'crearTarea' que utiliraza una 'desc' (descripción) otorgada por el usuario.
    crearTarea(desc = '') {

        /* Se utiliza el constructor de la clase 'tarea' para crear una nueva 'tarea' pasandole el parámetro
        'desc' (descripción). */
        const tarea = new Tarea(desc);
        /* Se asigna la 'tarea' a la propidad '_listado' que se encargará de almacenar cada 'tarea'.
        Lo que hace el siguiente código es asignar primero el 'id' de la 'tarea' y el valor de ese 'id'
        almacenará toda la információn de la tarea: 'id', 'desc' y 'completadoEn'.
        Como se está guardando las tareas es parecido a trabajar con Firebase o MongoDB.
        */
        this._listado[tarea.id] = tarea;

    }

    // Método para mostrar toda la lista de tareas.
    listadoCompleto() {

        console.log('');

        /* Se utiliza el listado que esté en un array y se recorre cada tarea con un 'forEach'.
        Se recibe como parámetro la tarea y un identificador para agregar un número al inicio */
        this.listadoArr.forEach( (tarea, i) => {
            // Se crea el número que irá al inicio de la descripción de la tarea.
            const idx = `${i+1}.`.blue;
            // Se recibe de la tarea la descripción y la fecha de cuando fué completada.
            const {desc, completadoEn} = tarea;
            // Se crea el estado evaluando si la tarea fue completada o  no.
            const estado = (completadoEn)?'Completada'.green : 'pendiente'.red;
            /* El elemento es cada tarea que será mostrada. Es un String del número de tarea, 
            la descipción y su estado. */
            const elemento = `${idx} ${desc} :: ${estado}`;
            // Se muestra la tarea en consola.
            console.log(elemento);
        });

    }

    /* Metodo para mostrar las tareas completadas o pendientes, dependiendo el valor que reciba.
    recibe como parámetro un booleano */
    listarPendientesCompletadas(completadas = true) {

        console.log('');
        // Se crea un contador para agregar un número al inicio de la descripción de la tarea.
        let contador = 0;

        // Se recorre cada tarea del array 'listadoArr' con un 'forEach'.
        this.listadoArr.forEach(tarea => {
            // Se recibe de la tarea la descripción y la fecha de cuando fué completada.
            const {desc, completadoEn} = tarea;

            // Se crea el estado evaluando si la tarea fue completada o  no.
            const estado = (completadoEn)?'Completada'.green : 'pendiente'.red;
            
            // Si se piden completadas ejecuta el bloque del 'if'. Si no, ejecuta el bloque del 'else'. 
            if(completadas){
                /* Evalua si la tarea fue completada */
                if(completadoEn) {
                    /* Se crea el contador de la tarea, se crea el elemento que será la tarea completada y
                    lo muestra en consola */ 
                    contador += 1;
                    const elemento = `${(contador + '.').blue} ${desc} :: ${completadoEn.yellow}`;
                    console.log(elemento);
                }
            }else{
                /* Evalua si la tarea está incompleta */
                if(completadoEn == null) {
                    /* Se crea el contador de la tarea, se crea el elemento que será la tarea incompleta y
                    lo muestra en consola */ 
                    contador += 1;
                    const elemento = `${(contador + '.').blue} ${desc} :: ${estado}`;
                    console.log(elemento);
                }
            }
        });
    }

    // Método para cambiar el estado de la tarea de incompleta a completa y viceversa.
    toggleCompletadas(ids = []) {

        /* Se recorre cada uno de los 'ids' con un 'forEach'. Recibe un 'id' 
        para marcar tarea como completada. */
        ids.forEach(id => {
            // Se almacena en 'tarea' la tarea que tenga el 'id' correspondiente.
            const tarea = this._listado[id];
            /* Se evalua si no está completa. Si no lo está, agregará la fecha de cuando se completó en 
            'completadoEN' con el método 'Date().toISOString()' */
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

         /* Se recorre cada una de las tareas en 'listadoArr' con un 'forEach'. Recibe una 'tarea' 
        para marcar tarea como no completada. */
        this.listadoArr.forEach(tarea => {
            /* Se evalua si el la 'tarea.id' está incluida en los 'ids' pasados como parámetros del método. 
            Si se encuentra, cambiará el valor de 'completadoEn' a 'null. */
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

}

// Exportamos la clase
export {
    Tareas,
}